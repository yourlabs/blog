+++
date = "2013-09-15T15:17:03+00:00"
draft = false
tags = ["django", "python"]
title = "Django 1.5.4 security release"
+++
[Django 1.5.4 security release](https://www.djangoproject.com/weblog/2013/sep/15/security/) is out. It limits password lengths so that people don't upload 1Mb passwords (limit for nginx default config). Imagine 1000*1Mb to hash ? That could potentially cause a DoS.

Update your django installs.