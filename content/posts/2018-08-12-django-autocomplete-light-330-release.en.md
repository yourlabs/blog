+++
date = "2018-08-12T08:06:35+00:00"
draft = false
tags = ["python", "django-autocomplete-light", "django"]
title = "Django-autocomplete-light 3.3.0 release"
+++
Changes since 3.3.0-rc6:

    - use admin statics
    - #981: create option behaviour
    - #995: automatically generated views for generic foreign key fields
    - Getting placeholder and minimumInputLength from dal select
    - #1017: Initial migrations and database
    - Turkish translation
    - Added support for forwarded fields to Select2GenericForeignKeyModelField

Since 3.2.10:

3.3.0-rc6

    #959: Django 2.0 widgets may load jQuery after dal #959 

3.3.0-rc5

    #895: Self() and JavaScript() forward features

3.3.0-rc4

    #843: Forward logic refactored. Specifications for types of forwarded values.

3.3.0-rc3

    #957 remove reference to deleted script (rebase issue introduced in
    3.3.0-rc1)

3.3.0-rc2

    Revert 5b37f8661, fixes tests.

3.3.0-rc1

This version supports Django 2.0 and Python 3.6, perhaps more but I have not
tested, please submit compatibility patches for older versions if needed.
Please test them with tox -e base-py36-django20-sqlite before pushing.

To install 3.3.0-rc1, use `pip install django-autocomplete-light==3.3.0-rc1`.

New features:

    #953: Select2 update to 3.4.0.6-rc.1 by @jpic
    #917: django-nested-admin support by @loicteixeira
    #815: Simplify customization of autocomplete views by @EvaSDK
    #746: Select2 Language and dynamic Media by @luzfcb
    #883: Allow overwriting the results by @eayin2

Bug fixes:

    #874: Fix Django 1.11.3 error by @ikcam
    #933: Python 3.6 and Django 2.0 support by @jpic
    #930: QuerySetSequence querysets order is not preserved by @melvyn-sopacua
    #909: Prevent initilization of other selects by @loicteixeira
    #904: Fix KeyError when id is not in attrs by @dwheaton
    #885: Prevent rendering of empty option on multi select by @johandc
    #892: Enable different item label for selected item by @maximpetrov
    #926: Atomic create_object by @jpic
    #718: Remove temp hack for select2 by @FuzzAU
    #860: dal: widgets: use the name if we don't have the id by @xrmx
    #849: Don't create a new option if an iexact-matching one already exists by @liwenyip

Also thanks to the many documentation contributors.

    #874: Fix Django 1.11.3 error by @ikcam
    #937: Update tutorial.rst to fix XSS in the example by @hangtwenty
    #919: Better create new object example by @davideghz
    #928: Add note about slim jqueries by @melvyn-sopacua

Test notes:

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

Njoy