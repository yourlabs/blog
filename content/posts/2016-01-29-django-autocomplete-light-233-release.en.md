+++
date = "2016-01-29T01:21:28+00:00"
draft = false
tags = ["python", "django", "django-autocomplete-light"]
title = "django-autocomplete-light 2.3.3 release"
author = "jpic"
+++

This release fixes an important usability but on the manychoice fields, and introduces a minor backward compatibility break:

- [#563](https://github.com/yourlabs/django-autocomplete-light/issues/563) Don't disable multiplechoicewidgets if select is `[multiple]`, [bd9ca0085](https://github.com/yourlabs/jquery-autocomplete-light/commit/bd9ca008530c0206b07e58ecb4775c4ed6532c7a)
- Don't import anything in __init__ anymore if on django 1.9
- test_project fixes, for the above.

### Disabled field bug

Thanks George Tantiras for reporting the bug ! Note that only paliative solutions have been taken for v2:

- [repaired the demo website](https://github.com/yourlabs/django-autocomplete-light/issues/559), should make it easier to spot bugs,
- bug fix in the JS.

As for v3, it is designed to support any number of autocomplete scripts, and the first proposed implementation is with select2, so chances that this kind of bug happen are greatly reduced.

### BC break

If you haven't already, replace your `import autocomplete_light` statements by `from autocomplete_light import shortcuts as autocomplete_light`. This is **required** if using django 1.9+.

Hopefuly for your little fingers, that long statement becomes `from dal import autocomplete` in v3.
