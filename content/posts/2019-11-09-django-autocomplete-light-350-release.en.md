+++
date = "2019-11-22T13:33:37+00:00"
draft = false
tags = ["django-autocomplete-light", "python"]
title = "django-autocomplete-light 3.5.0 jquery moving release"
+++
[Django-autocomplete-light](https://github.com/yourlabs/django-autocomplete-light) 3.5.0 was released, including **backward compatibility breaks**.

<!--more-->

- jquery.js has been **removed** from widget.media, this means that you are
  now responsible for ensuring that jquery is loaded in your page prior to
  displaying the form (form.media).

- trailing dash was replaced by underscore in forward conf, ie.
  `dal-forward-conf-for-id_test` becomes `dal-forward-conf-for_id_test`

Also:

- [#1115](https://github.com/yourlabs/django-autocomplete-light/issues/1115): Compatibility with Django 3.0 by [Alexandr Artemyev @mogost](https://github.com/mogost)
- [#1079](https://github.com/yourlabs/django-autocomplete-light/issues/1079): Fixed access to $.fn.select2 by David [@dwasyl](https://github.com/dwasyl)
- [#1118](https://github.com/yourlabs/django-autocomplete-light/issues/1118): Highlight select field with error to match Django style by [@tchatow](https://github.com/tchatow)
- [#1099](https://github.com/yourlabs/django-autocomplete-light/issues/1099): django-nested-admin forwarded field fix by [@akshenc](https://github.com/akshenc)

Also, tests now run fine on Travis, **big** thanks to [@jorrit-wehelp](https://github.com/yourlabs/django-autocomplete-light).
