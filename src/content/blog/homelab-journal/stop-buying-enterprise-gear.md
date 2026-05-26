---
title: "Stop Buying Enterprise Gear — This £250 Board Runs My Homelab"
category: "Homelab Journal"
date: 2026-05-26
---

# Stop Buying Enterprise Gear — This £250 Board Runs My Homelab

I built my setup wrong. At least according to every homelab forum on the internet.

I have got a closed source OS from a Chinese company. I am running a single board server. I am not running Proxmox. I have got no proper separation of concerns. I am trusting 2.5 inch SSDs over enterprise drives. The list goes on and on.

Yet somehow, the £250 setup I have got sitting on my desk is the most reliable, easiest to manage, and lowest maintenance homelab I have ever run. It just works. I actually use it on a daily basis instead of spending my weekends trying to fix it.

Full disclosure: Ice Whale, the company behind the [ZimaBoard 2](https://shop.zimaboard.com/products/zimaboard2-single-board-server), sent me this as well as the hard drive cage to review. I have got history with them — they have reached out before, and I thought the ZimaBoard was fantastic. [Read the full disclosure here](../meta/disclaimer.md).

![ZimaBoard 2 - front view showing ports](/homelab-journal/images/zimaboard-2/zimaboard-2-board.png)

## The Contradiction Nobody Talks About

Let me show you what I am working with here. This is the ZimaBoard 2. On paper it looks like it should not be good enough for any kind of decent homelab setup.

It has got an Intel N150 CPU. Four cores. Tops out at 3.6 GHz. Not exactly a powerhouse. It comes with 16 GB of LPDDR5X RAM clocked at 6400 MHz, and built-in 64 GB of eMMC storage where ZimaOS is pre-installed.

Ice Whale also sent the [hard drive cage](https://shop.zimaboard.com/products/2-bay-hdd-rack-tray-for-zimaboard-2). The ZimaBoard 2 screws directly on top of it with the included screws. On one end you have got two SATA ports and the power connection, plus a cable that powers both drives simultaneously and passes the data through. On the front you have got dual 2.5 GbE ports, two USB 3 ports, a mini display port, and the power input. Comes with a 60 watt brick.

![ZimaBoard 2 ports - dual 2.5GbE, USB 3, mini DP](/homelab-journal/images/zimaboard-2/zimaboard-2-ports.png)

I have got it configured with two 2.5 inch SSDs inside the drive cage for bulk storage, and a 1 TB NVMe in the PCIe slot via a [PCIe to NVMe adapter](https://shop.zimaboard.com/products/pcie-to-nvme-ngff-ssd-adapter-boost-storage-speed-for-zimaboard-zimablade-and-zimacube). First impressions? I have been running Jellyfin, a few Docker containers, file sharing around the house. It has handled all of it.

Here is where it gets interesting. I used to run a Dell 5810. Fourteen core, twenty-eight thread. Proper enterprise server. That thing idled at 80 watts. This whole setup pulls 10 to 15 watts under normal load. It is completely silent because there are no fans.

Eighty watts versus fifteen. That is the difference between a machine you leave on 24/7 and one you think twice about.

## The Four Rules I Broke

The homelab community has rules. I broke all of them with this build. Here is what happened.

### Rule One: Never Trust Closed Source Software

ZimaOS is closed source. Yeah, I get it. That makes a lot of people nervous.

Here is what actually happened. I took the board out of the box. Plugged it into Ethernet. Plugged it into power. Turned it on. Within five minutes I had Docker containers running.

Here is the thing that nobody actually talks about — I can wipe the eMMC storage. It is an x86 board. I can install Ubuntu, or any other Linux flavour I want. I can even put Proxmox on here. The hardware is completely open. I am choosing convenience right now, but I am not locked in at all.

I am not locked in. That makes all the difference.

### Rule Two: You Need Enterprise Grade Equipment

My electricity bill would like a word.

I have been there. I owned the Dell 5810. Fourteen cores running at 80 watts just sitting there doing nothing. This whole setup — board, drives, everything — pulls 10 to 15 watts under load. I have not even mentioned the noise. The Dell was loud. This is fanless. Completely silent.

I will take quiet and cheap over loud and powerful any day.

### Rule Three: Separate Services Across Machines

Everyone says you need a dedicated PC for storage, one for networking, one for compute.

I have got a PCIe slot on this board. Right now I am running a 1 TB NVMe for fast storage. I could swap that for a dual NIC card if I needed to. I have also got two SATA ports in the drive cage. I could whack in a couple of 8 TB drives if I felt like it. That is four separate storage devices on one little board.

Does it have 64 GB of RAM? No. The 16 GB of LPDDR5X at 6400 MHz is ridiculously fast and plenty for everything I am running.

### Rule Four: You Must Run Proxmox

Do not get me wrong — [Proxmox](/homelab-journal/posts/homelab-journal/proxmox-primary-os/) is brilliant. I have done loads of videos on it and I run it on my ZimaCube. I wrote about why it is [the only OS that makes sense for that machine](/homelab-journal/posts/homelab-journal/proxmox-primary-os/).

I do not need 17 VMs on this board. I just want Docker containers. Jellyfin. Maybe NextCloud. Technitium DNS. Every one of those runs inside Docker. For what this board does, Proxmox adds complexity I do not need.

For this board, Docker containers are enough.

![Hard drive cage - 2-bay SATA for ZimaBoard 2](/homelab-journal/images/zimaboard-2/hard-drive-cage.png)

## What It Can Actually Do

I have been putting it through real work, not just benchmarking.

Jellyfin has been transcoding 1080p content to multiple devices. Two streams running, temperature sat around 75 to 80 degrees. I pushed it with a 4K movie and it crept up to 90, but it handled it. Networking wise, I ran iperf3 and saturated the 2.5 GbE connection easily. The SATA ports work as expected. The NVMe via PCIe adapter gives fast storage for applications that need it.

Will this replace a proper server running fifty VMs and processing 4K video all day? No.

For most of us who want file storage, media streaming, some Docker apps, and a bit of automation, it is more than enough.

## What I Actually Did To Set It Up

The setup was almost boring. That is a compliment.

I mounted the ZimaBoard 2 to the hard drive cage with the included screws. Installed the two 2.5 inch SSDs via the adapters into the cage. Connected the SATA cable. That was it.

The best part? ZimaOS comes pre-installed on the eMMC. I did not need to connect a monitor. I did not need to flash a USB drive. I plugged it into the network, plugged it into power, and turned it on. Five minutes later I had containers running.

No monitor. No keyboard. No USB stick. Just network and power.

## What Is Not So Good

I would be lying if I said this was perfect for everyone.

The closed source OS is a real concern. You are trusting a company you might not know much about with your data. My take: I can always wipe the eMMC. But if that bothers you, this is not your board.

Virtual machines are limited. The N150 can handle some light VMs through ZimaOS, but it is not a virtualization powerhouse. If you need to run Windows Server VMs or build a Proxmox cluster, this is not for you.

The PCIe slot is single use. NVMe now means no dual NIC later. The 60 watt power brick also means no external GPU, even though the slot is PCIe 3.0 x4. You are not doing anything mad with that slot.

If you need 10 gig networking, multiple NVMe in RAID, or ECC memory, buy something beefier.

I do not think that is who this is for.

## My Honest Take

After two weeks of ignoring all the proper advice, I actually use this homelab. Not maintain it. Not troubleshoot it. Use it.

That is the point everyone misses when they are arguing about enterprise gear and proper hypervisors. A homelab is meant to be useful, not a second job. Breaking the rules meant I built something that fits my actual life instead of some theoretical setup that only exists on Reddit.

The physical setup is brilliant. The board mounted to the drive cage means everything is contained in one unit. Two SATA SSDs for bulk storage, NVMe for fast access, and the built-in eMMC means the OS does not even touch my main storage. It is compact. It is quiet. Actually, it is completely silent. It just sits there doing its job.

Is it the most powerful homelab? Absolutely not. Is it the most proper setup? Definitely not.

It is the first one I have built that I have not felt the need to rebuild a month later because it was too complicated or too expensive or too loud. I have been there many, many times.

For £250, I have got a server that just works. That is worth more than any amount of theoretical performance I will never actually use.

---

**Related Posts:**
- [Why Proxmox Is the Only OS That Makes Sense for the ZimaCube](/homelab-journal/posts/homelab-journal/proxmox-primary-os/)
- [ZimaOS: Good at What It Does, Just Not for This](/homelab-journal/posts/homelab-journal/zimaos-review/)
- [Watching the Fleet: What Does a One-Man Homelab Actually Need?](/homelab-journal/posts/homelab-journal/monitoring-the-fleet/)
- [Full Disclosure & Transparency](/homelab-journal/posts/meta/disclaimer/)

*Written: May 2026*
