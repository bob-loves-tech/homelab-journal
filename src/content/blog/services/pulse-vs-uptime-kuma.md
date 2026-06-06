---
title: "Why Pulse Is The Monitoring Tool I Actually Use"
description: "Why Pulse became Bobby's daily Proxmox monitoring dashboard, how it compares with Uptime Kuma, and where each tool still fits."
category: "Services"
date: 2026-05-21
tags:
  - pulse
  - uptime-kuma
  - monitoring
  - proxmox
heroImage: "/homelab-journal/assets/images/pulse/pulse%20dashboard.png"
heroImageAlt: "Pulse dashboard used to monitor Proxmox hosts and services"
---

# Why Pulse Is The Monitoring Tool I Actually Use

There are a dozen monitoring tools for Proxmox. You could wire up Grafana and Prometheus. You could install Uptime Kuma and get a nice status page. You could even just stare at the Proxmox UI and hope for the best.

I chose Pulse. And I didn't choose it because it's the most popular. I chose it because it's the only one that gives me answers without asking me to set up a dozen different exporters.

## The "One Command" Deployment

This is where Pulse wins immediately. Most monitoring tools require you to fiddle with Docker compose files, map ports, configure reverse proxies, and hope your network doesn't get in the way.

Pulse is different.

You literally copy a command, paste it into your Proxmox shell, and walk away.

```bash
bash -c "$(wget -qLO - https://github.com/rcourtman/Pulse/raw/main/install.sh)"
```

Five minutes later, I had a dashboard at `10.0.50.112:7655` that was already pulling data from both my nodes. No configuration files. No API keys. No fighting with Docker networking. It just worked.

## What I Actually See

I don't just want to know if something is up. I want to know if it's healthy.

Pulse gives me a unified dashboard for everything:
- **CPU and Memory per container:** Not just "is it up," but "is it chewing up RAM?"
- **Disk usage and I/O:** Which LXC is writing to disk like crazy?
- **Network throughput:** In and out, per guest.
- **Backup status:** Direct integration with Proxmox Backup Server, showing deduplication stats.

Speaking of backups, Pulse is currently showing a **9.0x deduplication ratio** on my PBS datastore. That's not a stat I could easily get from a simple ping monitor. It's the kind of detail that makes you feel like you're running a real data centre, not just a couple of mini PCs on a desk.

## How It All Links Together

Here's the full architecture of how Pulse monitors my fleet — it's simpler than you'd think:

![Pulse Monitoring Architecture](/homelab-journal/images/pulse/architecture.svg)

*Interactive version: [Open in Excalidraw](https://excalidraw.com/#json=BIiT2GVO_NtO4B03XvokQ,kGMozcqAFwJe7b5iZYFAfQ)*

Pulse runs as **CT 102** on **Proxmox Host 2** (`10.0.50.50`). Once it's installed, here's what happens:

**Step 1 - API Connection:** Pulse connects to the Proxmox API on both nodes (`10.0.50.10` and `10.0.50.50`). No SSH, no agents, no exporters — just the built-in Proxmox REST API over HTTPS. This is the biggest time-saver: every other monitoring tool I tried required installing something on *each* host.

**Step 2 - Guest Discovery:** Through the API, Pulse discovers every container and VM on both hosts automatically. It reads:
- **CPU and RAM** per guest — real-time usage and history
- **Disk I/O** — which CT is hammering the storage
- **Network throughput** — per-guest in/out graphs
- **Backup status** — by talking to Proxmox Backup Server directly

**Step 3 - The Dashboard:** All this data flows into the Pulse dashboard at `10.0.50.112:7655`. It's a single page that shows both hosts side by side, with expandable guest details. No clicking between tabs, no Grafana dashboards to build.

**Step 4 - Pulse Patrol (optional):** The v6 RC adds an AI layer. Pulse Patrol uses Anthropic's Haiku model to scan the metrics and surface what actually matters — like telling you storage is at 62% rather than waiting for a hard threshold to trip.

**The data flow is one-way:** Pulse reads from Proxmox and PBS. It doesn't write back, it doesn't reconfigure anything, and if Pulse goes down, your homelab keeps running. It's purely observability.

| Component | Role | Connection |
|-----------|------|------------|
| Pulse Dashboard (CT 102) | Central monitoring UI | Web browser via `10.0.50.112:7655` |
| Proxmox Host 1 (10.0.50.10) | Hosts DNS + PBS | HTTPS API from Pulse |
| Proxmox Host 2 (10.0.50.50) | Hosts Pulse, PBS, VMs | HTTPS API from Pulse |
| PBS (CT 101) | Backup server | Backup data + dedup stats to Pulse |
| Pulse Patrol AI | Health analysis | Reads metrics from Pulse |

## The UI Is Actually Good

I'll be honest: I like looking at my dashboard.

The graphs are clean. The dark mode is easy on the eyes. The v6 release candidate (which I'm running) looks even better, with a refreshed navigation and smoother animations. It doesn't look like a tool thrown together by a sysadmin who hates CSS. It looks like a product.

And the best part? I don't have to stare at it all day. If something breaks, Pulse tells me. Until then, I can just admire the graphs and move on with my life.

## Pulse Patrol: AI That Actually Does Something

There's a feature in v6 called "Pulse Patrol" that uses Anthropic's Haiku model to run automated health checks. I clicked the button, and it started scanning the system. 

It's still early days, but the idea is solid: instead of me setting up a hundred different alert thresholds, an AI agent looks at the metrics, understands the context, and tells me what actually matters. "Storage on the ZimaCube is at 62 per cent — not urgent, but worth keeping an eye on." That's better than a red bar that turns on at 80% and ignores the fact that I have 400GB free.

## Open Questions

I'm still figuring a few things out.
- **Temperature sensors:** Both nodes show `-` for temperature. I haven't messed with IPMI drivers yet, but I'd love to get those readings in.
- **Docker Support:** My Proxmox nodes don't have the Docker agent installed yet. The dashboard shows Docker as "disabled," but I'm planning to wire it up once I move a few more services into containers.

## My Honest Take

If you just want a status page, stick with the basics.

But if you want insights—if you want to know *why* something is slow, or *which* container is hoarding RAM—Pulse is worth the switch. It's deeper, it's prettier, and it took about five minutes to install.

Sometimes the right tool isn't the most popular one. It's just the one that actually shows you what you need to see.

---

