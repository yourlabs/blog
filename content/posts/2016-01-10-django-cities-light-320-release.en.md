+++
date = "2016-01-10T12:54:31+00:00"
draft = false
tags = ["python", "django", "django-cities-light"]
title = "django-cities-light 3.2.0 release"
author = "jpic"
+++

django-cities-light 3.2.0 was released, supporting Django 1.7 to 1.9 now, even though older versions should still work, they aren't tested anymore.

- [#105](https://github.com/yourlabs/django-cities-light/pull/105): Drop LazyProgressBar, patch was accepted upstream by
  [Max Arnold](https://github.com/max-arnold),
- [#104](https://github.com/yourlabs/django-cities-light/pull/104): Better feature code filtering by [Max Arnold](https://github.com/max-arnold) and [Michael Gulev](https://github.com/greenday2),
- [#100](https://github.com/yourlabs/django-cities-light/issues/100), [#96](https://github.com/yourlabs/django-cities-light/issues/96): The mystery about migrations appearing in some
  environments but not others has been solved: it was due to the
  presence of `b''` in migration files. A new test was added to fail if
  django wants to create new migrations in any environment.
- Phone number was required to create a country, it's not anymore.
- Support Django 1.7 to 1.9, thanks [Georgy Kutsurua](https://github.com/suquant) for helping,
- Support for 1.7 will drop when 1.10 is released, unless someone
  contributes compatibility in cities_light options declaration,
- Bugfix in import: some search names would not be generated in some
  cases due to unpredictability of the iteration order on
  translation_data.items()
- Test with [django-dbdiff](https://github.com/yourlabs/django-dbdiff) are much faster than importing the whole data
- Tox for testing, coverage
