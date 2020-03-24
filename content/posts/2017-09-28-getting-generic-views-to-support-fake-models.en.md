+++
date = "2017-09-28T11:37:57+00:00"
draft = false
tags = ["python", "django", "crudlfap"]
title = "Getting generic views to support “fake” models"
author = "jpic"
+++

Sometimes, we need to make views around objects which are not stored in the database. They may be calculated on the fly in python, or come from some data source that's not the database, or which aggregates several objects in the database.

This is supported out of the box with [CRUDLFA+](https://github.com/yourlabs/crudlfap), the modern web framework for Django. All you need to implement is:

- a Model class with what you want in it, just set `Meta.managed=False`,
- implement `save()` and `delete()` like you want in it, if you want create, update and delete views to work,
- implement `get_queryset()` and `get_object()` like you want in the Router.

This [example model from crudlfap_example](https://github.com/yourlabs/crudlfap/blob/master/src/crudlfap_example/nondb/models.py) uses a class attribute in the manager to store the object list in memory. That's probably not what you want to do in your own project, but that works for the PoC because it demonstrates how to override `save()` and `delete()`.

This [example urls from the same example](https://github.com/yourlabs/crudlfap/blob/master/src/crudlfap_example/nondb/urls.py) demonstrates how `get_object()` and `get_queryset()`.

And then ... well, that's all ya need, welcome in 2017.

With `<3`

Jamesy aka jpic
