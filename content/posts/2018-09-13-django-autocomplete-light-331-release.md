+++
date = "2018-09-13T13:36:36+00:00"
draft = false
tags = ["python", "django", "django-autocomplete-light"]
title = "django-autocomplete-light 3.3.1 release"
+++
Thanks to awesome contributors from all around the world, DAL 3.3.1 is out, one month after 3.3.0, that was the first non-rc release of 3.3.0 which starts to require Django 2.0.

3.3.1

  - Fixed a bug in the way jquery.init.js was being used by @coredumperror
  - Set select2 container CSS class to :all: @hbielenia
  - Added missing renderer parameter to render method for django 2.1 @monim67
  - Fix ImportError with SELECT2_TRANSLATIONS in Django 1.x @hugorodgerbrown
  - Forward argument should always be a tuple @jihoon796
  - Fixed exception thrown from Select2QuerySEtView when paginate_by is set
    @coredumperror
