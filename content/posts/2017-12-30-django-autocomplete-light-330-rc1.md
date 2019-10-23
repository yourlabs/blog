+++
date = "2017-12-30T00:00:52+00:00"
draft = false
tags = ["django-autocomplete-light", "python"]
title = "django-autocomplete-light 3.3.0-rc1"
+++
To install 3.3.0-rc1, use:

    pip install django-autocomplete-light==3.3.0-rc1

New features:

- [@953](https://github.com/yourlabs/django-autocomplete-light/issues/953): Select2 update to 3.4.0.6-rc.1 by [@jpic](https://github.com/jpic)
- [@917](https://github.com/yourlabs/django-autocomplete-light/issues/917): django-nested-admin support by [@loicteixeira](https://github.com/loicteixeira)
- [@815](https://github.com/yourlabs/django-autocomplete-light/issues/815): Simplify customization of autocomplete views by [@EvaSDK](https://github.com/EvaSDK)
- [@746](https://github.com/yourlabs/django-autocomplete-light/issues/746): Select2 Language and dynamic Media by [@luzfcb](https://github.com/luzfcb)
- [@883](https://github.com/yourlabs/django-autocomplete-light/issues/883): Allow overwriting the results by [@eayin2](https://github.com/eayin2)

Bug fixes:

- [@874](https://github.com/yourlabs/django-autocomplete-light/issues/874): Fix Django 1.11.3 error by [@ikcam](https://github.com/ikcam)
- [@933](https://github.com/yourlabs/django-autocomplete-light/issues/933): Python 3.6 and Django 2.0 support by [@jpic](https://github.com/jpic)
- [@930](https://github.com/yourlabs/django-autocomplete-light/issues/930): QuerySetSequence querysets order is not preserved by [@melvyn](https://github.com/melvyn)-sopacua
- [@909](https://github.com/yourlabs/django-autocomplete-light/issues/909): Prevent initilization of other selects by [@loicteixeira](https://github.com/loicteixeira)
- [@904](https://github.com/yourlabs/django-autocomplete-light/issues/904): Fix KeyError when id is not in attrs by [@dwheaton](https://github.com/dwheaton)
- [@885](https://github.com/yourlabs/django-autocomplete-light/issues/885): Prevent rendering of empty option on multi select by [@johandc](https://github.com/johandc)
- [@892](https://github.com/yourlabs/django-autocomplete-light/issues/892): Enable different item label for selected item by [@maximpetrov](https://github.com/maximpetrov)
- [@926](https://github.com/yourlabs/django-autocomplete-light/issues/926): Atomic create_object by [@jpic](https://github.com/jpic)
- [@718](https://github.com/yourlabs/django-autocomplete-light/issues/718): Remove temp hack for select2 by [@FuzzAU](https://github.com/FuzzAU)
- [@860](https://github.com/yourlabs/django-autocomplete-light/issues/860): dal: widgets: use the name if we don't have the id by [@xrmx](https://github.com/xrmx)
- [@849](https://github.com/yourlabs/django-autocomplete-light/issues/849): Don't create a new option if an iexact-matching one already exists by [@liwenyip](https://github.com/liwenyip)

Also thanks to the many documentation contributors.

- [@874](https://github.com/yourlabs/django-autocomplete-light/issues/874): Fix Django 1.11.3 error by [@ikcam](https://github.com/ikcam)
- [@937](https://github.com/yourlabs/django-autocomplete-light/issues/937): Update tutorial.rst to fix XSS in the example by [@hangtwenty](https://github.com/hangtwenty)
- [@919](https://github.com/yourlabs/django-autocomplete-light/issues/919): Better create new object example by [@davideghz](https://github.com/davideghz)
- [@928](https://github.com/yourlabs/django-autocomplete-light/issues/928): Add note about slim jqueries by [@melvyn](https://github.com/melvyn)-sopacua

Test notes:

This version supports Django 2.0 and Python 3.6, perhaps more but I have not tested, please submit compatibility patches for older versions if needed.

Please test them with `tox -e base-py36-django20-sqlite` before pushing.

I have not tested this release with other Python and Django versions,
and also tests don't pass on travis despite the effort. It's working
on all browsers here and i've chased many seleniumish race conditions
but it's not enough for travis.
So, there's no docker image available with python and selenium that 
looks good i'm probably going to make one at some point but it's not
today's priority as far as I'm concerned.
So, tests are run locally which means manual action, but i've left the QA
checks on travis as mandatory because i've fixed so many PEP8 mistakes
during this release ...

Congratulations for this release my friends, because a lot of great work has
been contributed by the community since last release 4 months ago.

