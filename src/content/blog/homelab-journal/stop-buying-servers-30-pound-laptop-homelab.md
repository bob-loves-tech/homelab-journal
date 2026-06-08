---
title: "Stop Buying Servers - This £30 Laptop Runs My Entire Homelab"
description: "Why a £30 2012 laptop running Fedora Server, Cockpit, Docker, Technitium DNS, Tailscale, and Uptime Kuma makes more sense than a big power-hungry tower for a lot of homelabs."
category: "Homelab Journal"
date: 2026-06-08
tags:
  - homelab
  - laptop server
  - fedora server
  - docker
  - self-hosting
  - low power
heroImage: "/homelab-journal/images/30-pound-laptop-homelab/hero-old-laptop-desk.jpg"
heroImageAlt: "Cheap old laptop being used as a homelab server on a desk"
---

# Stop Buying Servers - This £30 Laptop Runs My Entire Homelab

I have got a 14-core server downstairs, and a £30 laptop is making it look a bit stupid.

That sounds like clickbait. It is not.

The big machine looks the part. Full size tower. Fourteen cores. Twenty eight threads. Graphics card. Loads of drives. The sort of box that makes you feel like you are doing homelab properly.

The problem is I am not actually doing that much with it.

## The problem is not power, it is honesty

Most of us are not running enough stuff to justify a proper server.

That is the bit nobody really wants to say out loud. We like the idea of the big machine. We like the photos. We like saying we have got a rack server, or a tower server, or some ex enterprise monster we rescued for next to nothing.

Then you look at what it is actually doing.

In my case, it is the usual stuff:
- Docker containers
- [Technitium DNS](/homelab-journal/posts/services/technitium-dns/)
- Tailscale
- [Uptime Kuma and lightweight monitoring](/homelab-journal/posts/homelab-journal/monitoring-the-fleet/)
- a few useful services I actually touch every week

That is not a heavy workload.

My downstairs server sits there pulling around 75 watts just to exist. Spin up a few VMs and it can climb much higher. That is a lot of power for something that is mostly waiting around for me to open Portainer and pretend I am busy.

That is wasted headroom.

![Large tower server used as contrast against the old laptop homelab setup](/homelab-journal/images/30-pound-laptop-homelab/tower-server-contrast.jpg)

## Old laptops used to have features modern ones forgot

This is the bit that makes the whole idea work.

This laptop is from 2012, which means it comes from that slightly weird era where laptops were still allowed to be useful after you bought them. It has got things modern machines keep throwing away in the name of progress.

I have got:
- replaceable DDR3L RAM
- a built in keyboard
- a built in display
- proper Ethernet
- a replaceable battery
- a replaceable SATA drive
- an optical drive bay I can swap for a caddy and a second 2.5 inch drive
- even an upgradable CPU

![Old laptop ports including Ethernet used for the homelab setup](/homelab-journal/images/30-pound-laptop-homelab/old-laptop-ethernet-ports.jpg)

That is ridiculous by modern standards.

Mine is running 8GB of RAM, which is enough for what I need. The CPU is an old Intel i3-3110M. Two cores. Four threads. Nothing special. The sort of chip nobody gets excited about anymore.

It still does the job.

The storage side is the same story. I can throw in SSDs I already had lying around, mirror the operating system, and not spend a fortune doing it. Try that with a lot of modern thin and light machines and you are finished before you start.

This is not nostalgia. It is practicality.

![Opened old laptop showing upgradeable RAM, storage, and battery](/homelab-journal/images/30-pound-laptop-homelab/opened-laptop-internals.jpg)

## The software stack matters more than the hardware here

The laptop only makes sense because I did not turn it into a science project.

You could install something heavier. You could start building out VMs. You could force this thing into pretending it is a tiny datacentre. I did not do that.

I installed [Fedora Server](/homelab-journal/posts/homelab-journal/fedora-default-small-homelab-boxes/).

Part of that was curiosity. Part of it was because I genuinely think Fedora Server is one of the most overlooked homelab operating systems, especially for smaller boxes like this where you want useful services, not an entire infrastructure hobby bolted on top.

The real win is Cockpit.

Cockpit gives Fedora a proper management layer without making the machine feel bloated. I can get to the box in a browser, check services, look at resource usage, upload files, manage users, and use the terminal without turning every little job into a mini SSH session.

That is exactly what this kind of machine needs.

The stack I am running is pretty simple:
- Tailscale for remote access
- Docker
- Portainer
- Dockge
- Uptime Kuma
- Technitium DNS

That is a real homelab. Not a pretend one.

It is also the same pattern I keep coming back to in [Stop Buying Enterprise Gear](/homelab-journal/posts/homelab-journal/stop-buying-enterprise-gear/). The best setup is usually not the one with the biggest spec sheet. It is the one that removes friction and actually gets used.

That still holds.

![Fedora Server Cockpit dashboard managing the laptop homelab server](/homelab-journal/images/30-pound-laptop-homelab/fedora-cockpit-dashboard.jpg)

## This little thing solves real problems

The old laptop does a few jobs absurdly well.

First, it is silent.

Not quiet. Silent. It sits there next to me and I forget it is even on. That alone changes how a machine feels in a home setup. Big tower servers have a way of reminding you they exist. This does not.

Second, it has its own built in safety net.

A laptop battery is not some magical enterprise grade UPS replacement, but for a small homelab box it is genuinely useful. A quick power cut does not instantly take the machine down. You get a bit of breathing room.

That matters more than people think.

Third, it is self contained.

I do not need a monitor. I do not need a KVM. I do not need to go hunting for adapters because somebody decided Ethernet was too old fashioned to deserve a port. The screen is there. The keyboard is there. The network port is there.

It is all just built in.

That makes setup boring.

Boring is good.

![Self-contained old laptop homelab setup with screen and keyboard built in](/homelab-journal/images/30-pound-laptop-homelab/self-contained-laptop-desk.jpg)

## This still is not a magic box

There is a limit to how clever this setup is.

If you need loads of VMs, this is not the right answer. If you need 10 gig networking, this is not the right answer. If your whole plan depends on expansion cards, more NICs, GPU nonsense, or constantly growing workloads, this is not the right answer.

That is fine.

I am not saying old laptops are better than servers in every case. They are not. I am saying a lot of people are buying server class hardware before they have worked out whether they actually have a server class problem.

Those are two very different things.

This laptop also has obvious limits. The networking is basic. The expandability is limited. The raw performance is nowhere near a modern mini PC, never mind a proper server.

That still does not change the point.

The point is it is enough.

## My Honest Take

I think a lot of people are building the wrong kind of homelab.

They buy for the fantasy version. The version where every box is doing something critical, every watt is justified, every VM has a purpose, and the giant server downstairs is absolutely essential to the operation.

Then real life turns up.

Real life usually looks more like this:
- DNS
- remote access
- a few containers
- maybe a file share
- some monitoring so you know when things break

That is not a criticism. That is normal.

This £30 laptop handles the sort of work a lot of people are actually doing, and it does it without noise, without drama, and without dragging a huge electricity bill behind it. Fedora Server helps. Cockpit helps. The old school upgradeable hardware helps.

The bigger lesson is the useful one.

Stop buying servers before you understand your workload.

You might already have the box you need sitting in a cupboard somewhere, gathering dust, with a dead battery, an old SSD, and a DVD drive nobody has touched in ten years. That might be a better homelab start than the massive tower you keep telling yourself you need.

I am not anti server.

I am anti overkill.

---

**Related Posts:**
- [Stop Buying Enterprise Gear — This £250 Board Runs My Homelab](/homelab-journal/posts/homelab-journal/stop-buying-enterprise-gear/)
- [Fedora Server Is the Sleeper Homelab OS Nobody Talks About](/homelab-journal/posts/homelab-journal/fedora-default-small-homelab-boxes/)
- [Why I Switched to Technitium DNS in a Proxmox LXC](/homelab-journal/posts/services/technitium-dns/)
- [Watching the Fleet: What Does a One-Man Homelab Actually Need?](/homelab-journal/posts/homelab-journal/monitoring-the-fleet/)
- [The Mac Mini M1 Is So Close To The Perfect Homelab Server](/homelab-journal/posts/homelab-journal/mac-mini-m1-perfect-homelab-server/)

*Written: June 2026*
