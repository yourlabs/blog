+++
date = "2019-03-16T14:34:15+00:00"
draft = false
tags = ["devops", "python", "ansible", "best-practice"]
title = "Yourlabs playlabs"
author = "jpic"
+++

https://github.com/yourlabs/playlabs

GitHub release of part of my current production practice to Continuous Integration and Continuous Delivery. It's the main monolyth that combines well in CI with our [Python & PHP distributions](https://yourlabs.io/oss/containers). Actually some parts of the monorepo in the process of being extracted and rewritten to smaller sized units and that's the development track that's issued recent tools such as [cli2](https://yourlabs.io/oss/cli2) that is the library for decorating another CLI in python extracted as a generic engine, base for [djcli](https://yourlabs.io/oss/djcli) (also extracted from injected code from ansible django plugin), [shyml](https://yourlabs.io/oss/shyml), with other parts that are yet to be installed in a production pipeline such as [ansible-apply](https://yourlabs.io/oss/ansible-apply) ansible modern command line wrapper, [compoctl](https://yourlabs.io/oss/compoctl) docker-compose decorator that's shorter to write but also provides experimental commands to improve automated deployments, backups and restores.
