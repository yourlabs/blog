+++
date = "2019-07-20T17:15:23+00:00"
draft = false
tags = ["django-autocomplete-light", "python"]
title = "django-autocomplete-light 3.4.0 release"
author = "jpic"
+++

This release re-enables Python 2 and Django 1.11 support, even though it doesn't pass all tests because tests rely on dicts being ordered by default which came in Python 3

Also, this release exits from using Django's vendored select2, and vendors select2 itself with a submodule again, this is to benefit from upstream bugfixes faster
