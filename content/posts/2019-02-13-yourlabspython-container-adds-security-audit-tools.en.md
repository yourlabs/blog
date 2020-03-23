+++
date = "2019-02-13T19:58:50+00:00"
draft = false
tags = ["gitlab-ci", "security", "python", "gitlab", "best-practice"]
title = "yourlabs/python container adds security audit tools"
author = "jpic"
+++

The new version of yourlabs/python docker image, which bundles npm and pip3 on alpine and a bunch of testing tools, was released with [bandit](https://pypi.org/project/bandit/) and [safety](https://pypi.org/project/safety/) baked in.

You can benefit from it in your Open Source software by adding .gitlab-ci.yml:


{{< highlight yml>}}
py-sec-bandit:
  image: yourlabs/python
  script: bandit -v -x commands,tests {posargs:-r src}

py-sec-safety:
  image: yourlabs/python
  script: safety check
{{< / highlight >}}

