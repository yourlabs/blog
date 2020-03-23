+++
date = "2016-08-17T13:41:29+00:00"
draft = false
tags = ["django", "python", "django-session-security"]
title = "django-session-security 2.4.0 release"
author = "jpic"
+++

This new release enforces SESSION_EXPIRE_AT_BROWSER_CLOSE, because it makes no sense to use django-session-security without it, by design.

However, a vulnerability caused by having SESSION_EXPIRE_AT_BROWSER_CLOSE disabled was fixed, thanks [Clayton Delay](http://www.claytondaley.com) for the report.
