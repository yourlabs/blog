+++
date = "2018-11-10T01:18:48+00:00"
draft = false
tags = ["gitlab", "best-practice"]
title = "building-images-with-kaniko-and-gitlab-cicd"
author = "jpic"
+++

https://docs.gitlab.com/ee/ci/docker/using_kaniko.html

kaniko is a tool to build container images from a Dockerfile, inside a container or Kubernetes cluster. kaniko solves two problems with using the docker-in-docker build method: Docker-in-docker requires privileged mode in order to function, which is a significant security concern. Docker-in-docker generally incurs a performance penalty and can be quite slow Read more at docs.gitlab.com
