+++
date = "2012-12-14T12:55:22+00:00"
draft = false
tags = ["django"]
title = "Django admin probably going bootstrap, maybe completely rewritten ?"
author = "jpic"
+++

It seems that [django admin revamp discussions started again](https://groups.google.com/forum/?fromgroups=#!topic/django-developers/Vozu6U3gz84).

Last year, I sent a letter to santa asking for 12 transformers with super laser powers. I waited nicely and then received a little playmobil.

So, here's my letter to santa this year:

- admin css must be in lesscss too, ie. you could override variables.less,
- widgets that are usable outside the admin should not be in django.contrib.admin, ie. the bootstrap-calendar widget should be usable outside the admin too,
- ChangeList should be decoupled, and even refactored into 2 separate modules: one for table display like django-tables2 and one for queryset filtering,
- for models with lots of fields, tabs are a must in the form,
- views and urls should be "normal", have a fixed name and arguments instead of name generation,
- detail view and "read" permission support,
- per object **and per field** CRUD permissions,
