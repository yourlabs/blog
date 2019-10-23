+++
date = "2013-12-26T00:11:58+00:00"
draft = false
tags = ["django", "python"]
title = "Django 1.7 new feature: AppConfig"
+++
Check out the new [applications documentation](https://docs.djangoproject.com/en/dev/ref/applications/) for Django 1.7 !

It's still quite cryptic what will "holding app metadata" be really able to do. For starters it enables changing the name of an app in the admin without any hack. It will probably make installing and customizing apps easier, ie.:

- provides a default setting system, similar to [django-appconf](http://django-appconf.readthedocs.org/en/latest/),
- automatically include app-specific stuff like middlewares, urls, etc, etc ... ?
- replace an app's model ?

Wait and see, anyway, big thanks to Aymeric Augustin and all participants in this [pull request](https://github.com/django/django/pull/2089).