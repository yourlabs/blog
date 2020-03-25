+++
date = "2015-05-25T16:45:02+00:00"
draft = false
tags = ["django-autocomplete-light", "django", "python"]
title = "django-autocomplete-light 2.2.0rc1 release notes"
author = "jpic"
+++

This article presents the changelog for django-autocomplete-light 2.2.0 release. To upgrade to 2.2.0rc1:

    pip install -U --pre django-autocomplete-light
    
If you find any problem, please report it on [github issues](http://github.com/yourlabs/django-autocomplete-light/issues) and downgrade to last stable (2.1.x series):

    pip install -U django-autocomplete-light

### Pending break warning, Django >= 1.9

The good old `import autocomplete_light` API support will be [dropped with Django 1.9](https://github.com/yourlabs/django-autocomplete-light/blob/2.2.0rc1/autocomplete_light/__init__.py). All imports have moved to `autocomplete_light.shortcuts` and importing `autocomplete_light` will work until the project is used with Django 1.9. 

To be forward compatible with Django >= 1.9 (current master), replace::

    import autocomplete_light

With:

    from autocomplete_light import shortcuts as al

This will also make your scripts a lot shorter.

### CSS might break with absolutely positioning

We've moved back to pre-1.1.10 CSS positioning. This means appending the autocomplete box to an arbitrary DOM element (body by default) and using calculating the `top` and `bottom` attribute in javascript with [`yourlabs.Autocomplete.fixPosition()`](http://django-autocomplete-light.readthedocs.org/en/stable-2.x.x/_static/autocomplete.html#section-62) pretty much like Django admin's calendar widget does. While blunt, this change should help the widget being more compatible across Django admin themes. 

While this positioning system has been used [since around 2005 in Django when Adrian Holovaty open sourced admin media](https://github.com/django/django/commit/dd5320d), it has never been documented that's it's a good system that works well and there's no reason to break backward compatibility in Django admin for that - note to Django admin template customizers [#265](https://github.com/yourlabs/django-autocomplete-light/issues/265). 

### JS Event bind change

Javascript [`yourlabs.Autocomplete` object](http://django-autocomplete-light.readthedocs.org/en/stable-2.x.x/_static/autocomplete.html#section-19) does not bind to the same events as it used too. Event handling has been backported from twitter typeahead and tested on firefox and android ([#411](http://github.com/yourlabs/django-autocomplete-light/issues/411)).

### Python Form Field validation change

The form field [doesn't call `super().validate()` anymore](https://github.com/yourlabs/django-autocomplete-light/commit/fee198b024f799238538320fec4725cd7ca3aa56) and now completely relies on [`AutocompleteInterface.validate_values()`](http://django-autocomplete-light.readthedocs.org/en/stable-2.x.x/api.html#autocomplete_light.autocomplete.base.AutocompleteInterface.validate_values). This was how [django-autocomplete-light was initially designed](https://github.com/yourlabs/django-autocomplete-light/blob/2.2.0rc1/README#L25), kudos to [@zhiyajun11](http://github.com/zhiyajun11) for pointing it out ! This optimises code which was doing validation twice and gives the flexibility it was initially designed for from within the Autocomplete class ([#410](http://github.com/yourlabs/django-autocomplete-light/issues/410)).

### AutocompleteModel now generates custom SQL to preserve order

[`AutocompleteModel.order_choices()`](http://django-autocomplete-light.readthedocs.org/en/stable-2.x.x/api.html#autocomplete_light.autocomplete.model.AutocompleteModel.order_by) now [generate custom SQL](https://github.com/yourlabs/django-autocomplete-light/blob/master/autocomplete_light/autocomplete/model.py#L65) to be enable saving the order in which users have filled an autocomplete field. This actually comes from 2.1.0, but was not PostgreSQL compatible - we're now testing on MySQL, PostgreSQL and SQLite to prevent regressions. Fix contributed by [@sbaum](http://github.com/sbaum) in [#419](http://github.com/yourlabs/django-autocomplete-light/issues/419).

### List of changes

Most users won't notice the break except maybe the CSS ones and of course also for Django 1.9 users. 

- [#419](https://github.com/yourlabs/django-autocomplete-light/issues/419): ANSI SQL compliance (@sbaum)
- [#413](https://github.com/yourlabs/django-autocomplete-light/issues/413): Exception when using models having prima
ry key names different from   id. - #412: Support models with a pk different than "id" and non-numeric.   (@mhuailin
) 
- [#411](https://github.com/yourlabs/django-autocomplete-light/issues/411): Android compatibility (js bind changes).
- [#410](https://github.com/yourlabs/django-autocomplete-light/issues/410): Removed double validation by not calling
 suport of ``Field.validate()``.
- [#408](https://github.com/yourlabs/django-autocomplete-light/issues/408): Support Django 1.8 change-link.
- [#409](https://github.com/yourlabs/django-autocomplete-light/issues/409): Compatibility with non-autocomplete inpu
ts present in the widget by [@SebCorbin](http://github.com/SebCorbin).

### Contribution changes

PIP wheel has been temporarily disabled because django-autoslug broke it, any help here is welcome, I did my best in the various `fix/*wheel*` branches but Travis won xD There's a  mission to extract the JS part and package it as a standalone jQuery library to get more pull requests on the JS / CSS part. It sounds like a pretty good start in the JS / UI testing and packaging world. Any help there is welcome. CI now has tests against MySQL and PostgreSQL since we're generating custom SQL.  
 
### Credits

Again welcome to new contributors @mhuailin and @SebCorbin and thanks all for reporting issues on GitHub with all needed details and forks which make it easy to reproduce. 

And thanks to @blueyed who helped sinking this year's backlog like crazy.
