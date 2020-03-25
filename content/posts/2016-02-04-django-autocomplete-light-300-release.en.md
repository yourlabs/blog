+++
date = "2016-02-04T13:03:37+00:00"
draft = false
tags = ["django-autocomplete-light", "django", "python"]
title = "django-autocomplete-light 3.0.0 release"
author = "jpic"
+++

After 4 years of supporting django-autocomplete-light, I'm beginning to figure what users expect and the common mistakes, like registering the wrong model for autocomplete, or having troubbles figuring how to link suggestions with other form fields, or create choices on the fly, or with the magic modelform.

So at first, I really tried to find other autocompletion apps for with DAL could be just an extension. It turned out that with they had too much security issues, known security vulnerabilities which aren't going to be fixed (which I don't dare to post here). As I have strong feelings about security, I decided to take another road, and took a 2-week code sprint working at night to make version 3.

This is what it looks like now:

- Python 2.7+, Django 1.8+ complete support,
- Django (multiple) choice support,
- Django (multiple) model choice support,
- Django generic foreign key support (through django-querysetsequence),
- Django generic many to many relation support (through django-generic-m2m and
  django-gm2m)
- Multiple widget support: select2.js, easy to add more.
- Creating choices that don't exist in the autocomplete,
- Offering choices that depend on other fields in the form, in an elegant and
  innovant way,
- Dynamic widget creation (ie. inlines), supports YOUR custom scripts too,
- Provides a test API for your awesome autocompletes, to support YOUR custom
  use cases too,
- A documented, automatically tested example for each use case in test_project.

Check it out, the new documentation and demo are build and should be available at the usual URLs:

http://dal-yourlabs.rhcloud.com
http://django-autocomplete-light.rtfd.org

Enjoy !
