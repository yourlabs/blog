+++
date = "2016-06-29T20:18:19+00:00"
draft = false
tags = ["linux", "linuxcontainers", "ubuntu"]
title = "Unattended LXD setup"
author = "jpic"
+++

LXD requires an interactive tty by default. For non-interactive setup, something like this should be executed:

<script src="https://gist.github.com/jpic/7234f71814bed67064f8ca0a0390853e.js"></script>

Then, apt-get install lxd and you'll have a configured lxd just as if you had interactively configured it !
