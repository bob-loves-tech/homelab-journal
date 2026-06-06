---
title: "Why I Switched to Technitium DNS in a Proxmox LXC"
description: "Why Bobby moved DNS into a Technitium LXC on Proxmox, replacing lighter DNS tools with a more complete local DNS setup."
category: "Services"
date: 2026-05-21
tags:
  - technitium
  - dns
  - proxmox
  - lxc
---

# Why I Switched to Technitium DNS in a Proxmox LXC

Most homelab tutorials will tell you to run Pi-hole in Docker. And sure, it works. But I wanted something that felt more native to Proxmox, lighter on resources, and didn't require fighting with Docker networking every time I updated a container template.

Enter Technitium DNS.

## Why Technitium?

I've used Pi-hole, AdGuard Home, and even a bind9 setup that I promptly forgot how to configure. Technitium hits a sweet spot: it's a proper DNS server, not just a blocklist frontend. It supports DHCP, has a clean web UI, and runs in a lightweight LXC container with almost zero overhead.

## The Setup

I used the [Proxmox Helper Scripts](https://community.home-assistant.io/t/proxmox-helper-scripts/467311) to spin up the container. It took about 90 seconds. No Docker, no compose files, no port mapping headaches. Just a clean Ubuntu LXC, a single install script, and I was looking at the dashboard on port `5380`.

The web UI is straightforward. You point your router's DNS at the LXC's IP, and suddenly you have visibility into every query on your network. 

## My Honest Take

I'm sticking with it. It's not as flashy as some of the other options, but it works. And in a homelab, working is the only metric that matters.

---

