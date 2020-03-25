+++
date = "2016-03-27T02:28:55+00:00"
draft = false
tags = ["django", "python", "django-autocomplete-light"]
title = "django-autocomplete-light 3.1.5 release"
author = "jpic"
+++

This release enables [field-forwarding](http://django-autocomplete-light.readthedocs.org/en/master/tutorial.html#filtering-results-based-on-the-value-of-other-fields-in-the-form) in formsets and forms with prefix.

Also note that several things have been made to help users: a new [tutorial section showing placeholder and minimum-input-length select2 options](http://django-autocomplete-light.readthedocs.org/en/master/tutorial.html#passing-options-to-select2) has been added and a system check will raise an error if select2's js is not present - typically for users who have `git clone`'d the repo without `--recursive`, resulting in a wc without select2.

For devs, we've moved from django-sbo-selenium to pytest+splinter and it's pretty cool !

#### Changelog

- [#661](https://github.com/yourlabs/django-autocomplete-light/issues/661): Field forwarding: support form prefix, and formsets at the same time.
- [#628](https://github.com/yourlabs/django-autocomplete-light/issues/628): Improve option rename hook used until the patch is merged upstream in select2.
- [#656](https://github.com/yourlabs/django-autocomplete-light/issues/656): Use http.JsonResponse() to return json by [@guettli](https://github.com/guettli)
- [#638](https://github.com/yourlabs/django-autocomplete-light/issues/638): System check for dal_select2 to raise an error if select2 is not available.
- [#662](https://github.com/yourlabs/django-autocomplete-light/issues/662): Examples for setting placeholder and minimum input length options in select2.
- [#619](https://github.com/yourlabs/django-autocomplete-light/issues/619): From django-sbo-selenium to pytest+splinter.

Enjoy !
