+++
date = "2012-10-24T23:58:00+00:00"
draft = false
tags = []
title = "Upcoming backward compatibility break in django-autocomplete-light v1.1.0"
+++
In the next week(s), django-autocomplete-light v 1.1.0 will succeed to v1.0.26. It will include commit [2c756a](https://github.com/yourlabs/django-autocomplete-light/commit/2c756aff2793ac81c51d8d0d674fb90376d2b376) may be short but it will break your custom Autocomplete classes that generate custom HTML and custom [django-autocomplete_light](http://github.com/yourlabs/django-autocomplete-light) templates.

To upgrade to 1.1.0, please replace all `<div>` by `<span>` with class `div` in your custom Autocomplete classes and autocomplete_light templates. If you have any, examples can be seen in commit [d50fd](https://github.com/yourlabs/django-autocomplete-light/commit/d50fdbfd216b0e56a5b382dd596c2ad41cfa56e6) which fixes some tests (thanks continuous integration provided [travis](http://travis-ci.org/#!/yourlabs/django-autocomplete-light) !).

**Do not upgrade until you are ready to upgrade your custom HTML.**

This commit makes autocomplete-light **standard-compliant** and fixes ``{{ form.as_p }}``. Discussion, investigation, full details can be found in issue [#50](https://github.com/yourlabs/django-autocomplete-light/issues/50#issuecomment-8701022).

I promised to keep backward compatibility breaks rare and to notify you so that's it !

Don't forget to check out the CHANGELOG for version [1.0.26](https://github.com/yourlabs/django-autocomplete-light/blob/1.0.26/CHANGELOG) to see what you might have missed.

There has been more than 4 months and 27 releases in a row without a single BC break.

Thanks to all contributors who reported bugs and enhancement ideas as well as pull requests - you rock !