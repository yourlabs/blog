+++
date = "2014-04-06T16:26:45+00:00"
draft = false
tags = ["django", "python", "django-cities-light"]
title = "django-cities-light 2.3.1 released"
+++
[django-cities-light](http://github.com/yourlabs/django-cities-light) 2.3.1 was [released](https://pypi.python.org/pypi/django-cities-light/2.3.1):

- **[#42](http://github.com/yourlabs/django-cities-light/issues/42)** added FAQ: Some data fail to import or don't import like I want, how to skip them ?
- **[#45](http://github.com/yourlabs/django-cities-light/issues/45)** django-rest-framework support update by @almalki.
- **[#49](http://github.com/yourlabs/django-cities-light/issues/49)** Added country_items_pre_import and region_items_pre_import by **[@mauricioabreu](http://github.com/mauricioabreu)**.
- **[#51](http://github.com/yourlabs/django-cities-light/issues/51)** Slug should be used in unique_together along with name.
- **[#51](http://github.com/yourlabs/django-cities-light/issues/51)** Skip duplicate cities with no regions
- **[#52](http://github.com/yourlabs/django-cities-light/issues/52)** Added FAQ on MySQL and UTF-8
- **[#53](http://github.com/yourlabs/django-cities-light/issues/53)** Country phone prefix support by **[@csarcom](http://github.com/csarcom)**
- Forms update.

It is backward compatible and has migrations: don't forget to run:

    ./manage.py migrate cities_light
    ./manage.py cities_light  # for phone column to fill up