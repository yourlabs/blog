+++
date = "2016-01-19T19:35:17+00:00"
draft = false
tags = ["python", "django", "django-autocomplete-light"]
title = "django-autocomplete-light 2.3.0 release"
+++
- [#555](https://github.com/yourlabs/django-autocomplete-light/issues/555) Django 1.4, 1.5 and 1.6 deprecation
- [#497](https://github.com/yourlabs/django-autocomplete-light/issues/497) Enable registration by model-name by [@luzfcb](https://github.com/luzfcb)
- [#536](https://github.com/yourlabs/django-autocomplete-light/issues/536) [#551](https://github.com/yourlabs/django-autocomplete-light/issues/551) Support proxy models b
y [@onrik](https://github.com/onrik)
- [#553](https://github.com/yourlabs/django-autocomplete-light/issues/553) improved jQuery integration by [@blueyed](https://github.com/blueyed)
- [#516](https://github.com/yourlabs/django-autocomplete-light/issues/516) Corrected french transation by [@apinsard](https://github.com/apinsard)
- [#541](https://github.com/yourlabs/django-autocomplete-light/issues/541) Use error_messages on FieldBase to allow overrides by [@dsanders11](https://github.com/dsanders11)
- [#505](https://github.com/yourlabs/django-autocomplete-light/issues/505) Ordering alias clash fix by [@sandroden](https://github.com/sandroden)
- [#515](https://github.com/yourlabs/django-autocomplete-light/issues/515) Polish translation update by [@mpasternak](https://github.com/mpasternak)
- [#543](https://github.com/yourlabs/django-autocomplete-light/issues/543) ModelChoiceField requires the queryset argument
- [#494](https://github.com/yourlabs/django-autocomplete-light/issues/494) ModelChoiceField Watch changes to 'queryset' by [@jonashaag](https://github.com/jonashaag)
- [#514](https://github.com/yourlabs/django-autocomplete-light/issues/514) Fixed deprecation warning on Django 1.8 by [@spookylukey](https://github.com/spookylukey)
- [#498](https://github.com/yourlabs/django-autocomplete-light/issues/498) [#548](https://github.com/yourlabs/django-autocomplete-light/issues/548) improved i18n support
- [#547](https://github.com/yourlabs/django-autocomplete-light/issues/547) prevents loading genericm2m if not in INSTALLED_APPS
- [JAL#18](https://github.com/yourlabs/jquery-autocomplete-light/issues/18) Fix: Get value.length while value is null by [@hongquan](https://github.com/hongquan)
- [JAL#19](https://github.com/yourlabs/jquery-autocomplete-light/issues/19) Clarify license by [@stevellis](https://github.com/stevellis), all MIT
- [JAL#17](https://github.com/yourlabs/jquery-autocomplete-light/issues/17) Disable the widget input when it is not in use [@dsanders11](https://github.com/dsanders11)
- [JAL#15](https://github.com/yourlabs/jquery-autocomplete-light/issues/15) Support openning results in new tab [@thebao](https://github.com/thebao)
- [JAL#14](https://github.com/yourlabs/jquery-autocomplete-light/issues/14) Don't autohilight first choice by default [@pandabuilder](https://github.com/pandabuilder)
- [JAL#13](https://github.com/yourlabs/jquery-autocomplete-light/issues/13) Add option for box aligning with right edge of input [@dsanders11](https://github.com/dsanders11)

[#536](https://github.com/yourlabs/django-autocomplete-light/issues/536) At this point, proxy model support is untested, this is because I intend
to refactor the test suite and documentation during the 2.3.x serie.

[#494](https://github.com/yourlabs/django-autocomplete-light/issues/494) Updating the queryset from outside the autocomplete class may lead to a
security problem, ie. if you don't replicate filters you apply manually on the
autocomplete object choices into choices_for_request() then a malicious user
could see choices which they shouldn't by querying the autocomplete directly.
3.0.0 will have automatic widget and / or field (in cases like gfk/gm2m)
registration to the view like in django-select2 using queryset.query caching
which would resolve that use-case.

It's a pretty big release and I waited a while because I wanted all
contributors to benefit from it and work on the same codebase instead of
privileging one to another, not sure if it was the best way, let me know !

Note that 2.3.1 was released right away as 2.3.0 was missing static files.