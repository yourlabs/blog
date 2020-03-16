+++
date = "2020-03-16T10:27:00+00:00"
draft = false
tags = []
title = "Arch & Alpine Linux YourLabs Mirrors & Scripts"
+++

This articles describes how to use the
[scripts](https://yourlabs.io/oss/yourlabs.mirror) we use to maintain public
and private mirrors for Arch and Alpine Linux packages (more distros to come):
arch.yourlabs.org and alpine.yourlabs.org.

The whole point of having this is that we also have arch.yourlabs.org and
alpine.yourlabs.org on our local networks, as such upgrades are extremely fast
at the hackerspace.

<!--more-->

All mirrors require an operationnal Traefik instance that you can setup using
[yourlabs.traefik](https://yourlabs.io/oss/yourlabs.traefik) with:

```
bigsudo yourlabs.traefik @your.example.com
```

Example setting up an arch linux mirror::

```
bigsudo yourlabs.mirror home=/home/arch template=arch.sh url=https://arch.example.com @your.example.com
```

Alpine linux::

```
bigsudo yourlabs.mirror home=/home/alpine template=alpine.sh url=https://alpine.example.com @your.example.com
```

An uninstall script is also available, it will require the home argument::

```
bigsudo yourlabs.mirror uninstall home=/home/arch
```
