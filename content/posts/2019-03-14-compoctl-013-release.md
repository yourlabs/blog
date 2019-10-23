+++
date = "2019-03-14T23:08:24+00:00"
draft = false
tags = ["devops", "docker", "compoctl", "docker-compose"]
title = "compoctl 0.1.3 release"
+++
The new ``compoctl apply`` command supports build by default and now chains the following:

- pull
- build
- down
- up -d
- logs
- ps

If you haven't installed yet, my advice is to install with ``pip3 install --user compoctl``, and then add ``export PATH=$PATH:$HOME/.local/bin`` to open a giant sudo and make internet fun again.

Upgrade with ``pip3 upgrade --user compoctl`` if you have installed with ``--user`` otherwise with just ``pip3 upgrade compoctl``.

Have a great day <3