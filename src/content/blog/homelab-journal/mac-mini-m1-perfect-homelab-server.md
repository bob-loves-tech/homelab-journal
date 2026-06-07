---
title: "The Mac Mini M1 Is So Close To The Perfect Homelab Server"
description: "Why the used Mac Mini M1 looks like the perfect low power homelab server, and why Docker on macOS versus Thunderbolt on Fedora breaks the idea."
category: "Homelab Journal"
date: 2026-06-07
tags:
  - mac-mini-m1
  - homelab
  - docker
  - fedora
  - apple-silicon
---

# The Mac Mini M1 Is So Close To The Perfect Homelab Server

I should have loved this thing.

A used Mac Mini M1 for about £220 sounds like a stupidly good homelab deal. Tiny box. Silent. About 8 to 10 watts. Proper performance. Apple build quality. Two Thunderbolt 3 ports. On paper, this looks like the sort of low power homelab server that makes every tired little office mini PC look a bit daft.

It is not that.

That is what annoyed me.

## The hardware is better than it has any right to be

This part is easy.

The machine I tested had 8GB of RAM and a 256GB SSD. Base model stuff. Nothing special. Even then, the actual experience of using it is still a bit ridiculous for the money.

You have got:
- an 8-core Apple M1
- 8GB of unified memory
- a 256GB SSD
- two Thunderbolt 3 ports
- gigabit Ethernet
- a machine that is basically silent

Then you add the power draw.

This thing was sitting around 8 to 10 watts. That is the sort of number that gets your attention straight away if you run a home server all day. A lot of old enterprise hand-me-downs and cheap mini PCs do not even belong in the same conversation on efficiency.

That is why this machine gets under your skin.

## It ran my containers fine, and that still was not enough

I did not just stare at the spec sheet and get carried away.

I ran it for about three weeks on macOS first, and it handled about 8 to 10 Docker containers without any drama. Pure performance was not the issue. The chip is good. The box is good. The machine is absolutely capable.

That still was not the setup I wanted.

I have already written about preferring simple Docker-first setups over overbuilt lab gear in [Stop Buying Enterprise Gear](/homelab-journal/posts/homelab-journal/stop-buying-enterprise-gear/). This looked like it should have fit that same idea, just in a much prettier box.

Running Docker on macOS always feels like you are dragging a server workload through an operating system that does not really want to be a server operating system. Yes, it works. No, I do not enjoy it.

The networking side is the bit that gets old fast.

If you want clean Docker networking, custom IP addresses, MacVLAN style behaviour, and all the boring little things that make containers behave properly on a home network, Linux is just a better place to do it. macOS feels like a workaround. A polished workaround. Still a workaround.

That is the problem.

## macOS had the hardware features I wanted

This was the part that kept pulling me back.

On macOS, the Mac Mini M1 gives you the nice stuff. Thunderbolt works. The machine feels complete. You can actually use the ports that matter.

That matters a lot here because the internal 256GB SSD is soldered and small. Fine for a desktop. Fine for a few containers. Not fine if you are trying to turn this into a more serious home server or a NAS-leaning box.

The obvious answer is external storage.

That is where those Thunderbolt 3 ports stop being a nice extra and start being the entire point. Fast external storage is what makes this Mac Mini M1 homelab idea interesting in the first place. Without that, you are left with a very clever little machine and nowhere sensible to grow.

That is a big limitation.

## Fedora fixed the Docker problem and broke the whole plan

This is the bit that genuinely irritated me.

Fedora Linux was the answer to the container side of the puzzle. Better Docker compatibility. Better networking. Better handling for custom IP addresses. Less of the macOS nonsense. More of the normal Linux behaviour you actually want when you are building a proper home lab.

That was the appeal.

It is the same reason I keep ending up back at Linux-first thinking in pieces like [Why Proxmox Is the Only OS That Makes Sense for the ZimaCube](/homelab-journal/posts/homelab-journal/proxmox-primary-os/). Once you have used a cleaner server OS, it gets harder to pretend the compromise does not matter.

I also wanted ZFS.

If I am putting more important workloads or more important data on a machine, I want a better storage path than crossing my fingers on a soldered internal drive. Fedora opened the door to that. Asahi made the install simple as well. Open the terminal. Paste the command. Follow a few steps. Done.

That part was brilliant.

Then the whole idea fell over.

At the time I tested it, Thunderbolt support on Fedora for this setup was the killer. No proper Thunderbolt support means no proper external storage plan. No proper external storage plan means no sensible NAS path. No sensible NAS path means the whole point of using this particular machine starts falling apart.

That is the catch.

## This left me with two bad choices

Neither option was what I wanted.

Option one was to stay on macOS.

That keeps Thunderbolt. It keeps the hardware features. It keeps the polished desktop experience. It also leaves you doing Docker on macOS, dealing with the networking weirdness, the custom IP address nonsense, and all the other bits that make it feel like the wrong platform for a serious container host.

Option two was to install Fedora Linux.

That gives you the cleaner Docker experience. Better Linux tooling. Better networking. A more natural home server setup. Then you lose the Thunderbolt functionality that made the Mac Mini M1 interesting for external storage in the first place.

That is a rotten trade.

You either get the ports or you get the operating system you actually want.

You do not get both.

## That is why this does not become a proper homelab server for me

Performance was never the issue.

Noise was never the issue.

Power draw was definitely never the issue.

The issue was that the Mac Mini M1 could not line up the two things that mattered most for this use case:
- Linux for Docker and proper server behaviour
- Thunderbolt for storage expansion

If it had both, this would be ridiculous.

At that point, a used Mac Mini M1 would be one of the most compelling low power homelab server options around. Cheap to buy. Cheap to run. Silent. Fast enough for loads of workloads. Easy to scatter around the house if you wanted a tiny Apple Silicon cluster.

That is not the machine I had in front of me.

What I had was a near-perfect idea ruined by one missing piece.

## This is why I still prefer more obvious homelab hardware

I do not need a homelab machine to be clever.

I need it to make sense.

It is the same reason I care more about useful, low-friction infrastructure than theoretical perfection. That came up in [Watching the Fleet](/homelab-journal/posts/homelab-journal/monitoring-the-fleet/), and it is the same theme here.

That is why I still lean toward purpose-built gear or even a plain Intel mini PC for a lot of this stuff. It might use more power. It might be uglier. It might be less exciting. It is usually much easier to shape into the thing you actually need.

You can add storage.

You can swap operating systems.

You can run Docker in the environment you want without losing the ports you bought the machine for.

Simple enough.

## Proxmox is still the fantasy

This is the version of the story I wish was true.

If Proxmox on Apple Silicon was clean, boring, and normal, I would be all over this. Two or three Mac Mini M1 boxes sipping power, staying silent, running VMs and containers, maybe doing clustered jobs around the house. That would be brilliant.

It also is not where things are.

That leaves the Mac Mini M1 in a very annoying category. It is too good to ignore. Too compromised to trust as the all-round home server I wanted.

That is a frustrating place to land.

## My Honest Take

The Mac Mini M1 is a brilliant little computer.

It is also a slightly infuriating homelab server.

That frustration lands in the same bucket as my [ZimaOS review](/homelab-journal/posts/homelab-journal/zimaos-review/). Good hardware or decent software on its own is not enough if the overall setup keeps getting in the way.

At about £220, with 8 to 10 watt power draw and enough performance to run 8 to 10 Docker containers, it looks like a bargain. In some narrow use cases, it is a bargain. If all you want is a quiet little box and you are happy with the compromises, you could absolutely make it work.

I did not want to just make it work.

I wanted it to make sense.

macOS gives you the Thunderbolt support and the complete hardware experience, but Docker on macOS still feels like compromise layered on top of compromise. Fedora Linux gives you the cleaner Docker experience, the better networking, and the more natural server setup, but then you lose the Thunderbolt functionality that makes this machine worth bothering with.

That is the whole story.

The Mac Mini M1 is so close to being the perfect homelab server that it actually becomes more annoying than if it were just bad. If it were worse, I would have moved on faster. Because it is so good in every other way, the missing piece stands out even more.

That is why I came away genuinely gutted.

I love the hardware.

I do not love the compromise.

---

**Related Posts:**
- [Stop Buying Enterprise Gear — This £250 Board Runs My Homelab](/homelab-journal/posts/homelab-journal/stop-buying-enterprise-gear/)
- [Why Proxmox Is the Only OS That Makes Sense for the ZimaCube](/homelab-journal/posts/homelab-journal/proxmox-primary-os/)
- [Watching the Fleet: What Does a One-Man Homelab Actually Need?](/homelab-journal/posts/homelab-journal/monitoring-the-fleet/)
- [ZimaOS: Good at What It Does, Just Not for This](/homelab-journal/posts/homelab-journal/zimaos-review/)

*Written: June 2026*
