+++
date = "2016-03-09T13:50:46+00:00"
draft = false
tags = ["python", "django", "django-autocomplete-light", "xmodelform"]
title = "Porting ModelForm enhancements from django-autocomplete-light v2 to Django"
author = "jpic"
+++

Currently, django-autocomplete-light v2 provides enhancement to default form field generation for model fields, depending on the registered autocompletes, as [shown in the tutorial](http://django-autocomplete-light.readthedocs.org/en/2.3.1/tutorial.html).

For v3, we don't want this feature inside DAL anymore because it has really nothing to do with autocomplete. Instead, I'm trying to contribute a generic way to do that. It would not benefit only django-autocomplete-light anymore, but all Django apps. You could get enhanced default form fields for model fields just by installing and configuring apps in your project.

My previous PoC lives in a [separate app (xmodelform)](https://github.com/jpic/xmodelform), but again it requires to override the ModelForm everywhere. My latest PoC on this is a [3 line change in Django to replace hardcoded defaults with instance attributes](https://github.com/jpic/django/commit/d102f362f3c1ceaf2d5224d71f788c0821a481ae), and allows to change the default "Select" widget for a relation model field either in models.py, either in apps.py:

<script src="https://gist.github.com/jpic/b93ee62a3060dc408b0e.js"></script>

Please [participate to the discussion](https://groups.google.com/forum/#!topic/django-developers/zG-JvS_opi4) and show community involvement to improve Django not only for our apps, but for everybody.
