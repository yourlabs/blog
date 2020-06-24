+++
date = "2018-10-11T18:58:57+00:00"
draft = false
tags = ["python", "django", "best-practice", "devops", "playlabs"]
title = "Extreme devops"
author = "jpic"
+++

![image](/img/2018-10-11-extreme-devops-screenshot-where-you-see/c948f9b6f536a470228ed639986069c5e65786b04dcbff224743739057821bf7.png)

"Extreme DevOps" screenshot, where you see branchname == lastbuildjobname, designed for [dynamic environments](https://docs.gitlab.com/ee/ci/environments.html#dynamic-environments), demonstrates auto-deploy an environment [per push on a subdomain with the branch name](https://yourlabs.io/oss/playlabs/blob/master/.gitlab-ci.yml#L79). From [betagouv/MRS#636](https://github.com/betagouv/mrs/pull/636), with [PlayLabs](https://yourlabs.io/oss/playlabs), currently in Alpha stage.
