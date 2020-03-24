+++
date = "2018-02-04T19:22:05+00:00"
draft = false
tags = ["django", "python"]
title = "Django settings refactoring apps"
author = "jpic"
+++

Found another way cool app shared by [Linus Lewandowski](http://lew21.net/) on django-dev mailing list, here's the excerpt from [django-12factor](http://lew21.net/):

> “[The Twelve-Factor App](https://12factor.net/)” is an awesome methodology for building SaaS apps.
>
> django-12factor makes Django more 12factor-y. Right now, this focuses on the [Config](https://12factor.net/config) - “Store config in the environment”; Heroku users with addons will be particularly familiar with this.
>
> Still not sure of the benefits? Check out “[Twelve-Factor Config: Misunderstandings and Advice](https://blog.doismellburning.co.uk/2014/10/06/twelve-factor-config-misunderstandings-and-advice/)”.
