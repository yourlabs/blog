+++
date = "2015-01-06T09:00:31+00:00"
draft = false
tags = ["travis-ci", "python", "django", "linux"]
title = "Speed up your travis-ci builds with container based infrastructure"
+++
Travis-ci just [released container based infrastructure for open source repository (free users)](http://blog.travis-ci.com/2014-12-17-faster-builds-with-container-based-infrastructure/).

We tried it with our apps, and you can see we had some performance increase, even on database-intensive jobs:

- [django-autocomplete-light normal build](https://travis-ci.org/yourlabs/django-autocomplete-light/builds/45085974) takes around 1 hour and 35 minutes while it takes rather 1 hour and 22 minutes with container based build](https://travis-ci.org/yourlabs/django-autocomplete-light/builds/45086517) so that's around a 10% build speed increase, pretty cool right ? read on ;)
- [django-cities-light normal build](https://travis-ci.org/yourlabs/django-cities-light/builds/41983119) takes around 5 hours and 45 minutes, on [travis-container](https://travis-ci.org/yourlabs/django-cities-light/builds/45086836) it takes around 3 hours and 30 minutes !
- No notable performance increase to note on django-session-security.