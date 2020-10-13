+++
date = "2020-10-12T13:33:37+00:00"
draft = false
tags = ["django-autocomplete-light", "python", "django"]
title = "django-autocomplete-light 3.8.0 release"
author = "jpic"
+++

**WARNING** 3.8.0 did not contain the proper built JS, please use 3.8.1 that
was just released.

[Django-autocomplete-light](https://github.com/yourlabs/django-autocomplete-light)
3.8.0 was released, and features all your contributions of the year, and tested
with a pre-release for the last 3 months or so.

It promises to fix all your JS loading issues, but comes at the price of a
small **backward compatibility breaks** affecting users with custom init
functions. If unsure: you probably don't have any and the upgrade should just
work for you.

As you will see, this is a pretty big release, we'll also briefly talk about
the future of django-autocomplete-light in this post.

<!--more-->

The whole media/script story should have been fixed by
[@danielmorrel](https://github.com/danielmorell) ! But this comes with a price
to pay: you now need to [register your init
functions](https://django-autocomplete-light.readthedocs.io/en/master/tutorial.html#overriding-javascript-code)

## Backward compatibility break

If you don't have custom init functions then you have nothing to do.

If you have custom init functions you need to add something like:

```js
document.addEventListener('dal-init-function', function () {
    yl.registerFunction( 'select2', function ($, element) {
        // autocomplete function here
    });
})
```

Then, change your custom init with:

```js
document.addEventListener('dal-init-function', function () {
    yl.registerFunction( 'your_autocomplete_function', function ($, element) {
        var $element = $(element);
        // autocomplete function here
    });
})
```

## Changelog

- [#1171](https://github.com/yourlabs/django-autocomplete-light/issues/1171) data-html and object creation bugfix by [@syserr0r](https://github.com/syserr0r)
- [#1182](https://github.com/yourlabs/django-autocomplete-light/issues/1171) fix production with select2 upgrade by [@MarkRunWu](https://github.com/MarkRunWu)
- [#1169](https://github.com/yourlabs/django-autocomplete-light/issues/1171) implement search_fields and split_words by [@MuckRock](https://github.com/MuckRock)
- [#1145](https://github.com/yourlabs/django-autocomplete-light/issues/1171) fix post method parameters by [@erdnax123](https://github.com/erdnax123)
- [#1162](https://github.com/yourlabs/django-autocomplete-light/issues/1171) JS load order issues by [@danielmorell](https://github.com/danielmorell)
- [#1157](https://github.com/yourlabs/django-autocomplete-light/issues/1171) jQuery loading by [@danielmorell](https://github.com/danielmorell)
- [#1162](https://github.com/yourlabs/django-autocomplete-light/issues/1171) fix by [@danielmorell](https://github.com/danielmorell) this one introduces the breaking changes
- [#1129](https://github.com/yourlabs/django-autocomplete-light/issues/1171) fix rtfd autobuild by [@jpic](https://github.com/jpic)
- [#1158](https://github.com/yourlabs/django-autocomplete-light/issues/1171) remove calculated width by [@nad2000](https://github.com/nad2000)
- [#1159](https://github.com/yourlabs/django-autocomplete-light/issues/1171) Fix UUID for GFK models by [@sayeghr](https://github.com/sayeghr)
- [#1138](https://github.com/yourlabs/django-autocomplete-light/issues/1171) Replace DOMNodeInserted with MutationObserver by [@CristopherH95](https://github.com/CristopherH95)
- [#1144](https://github.com/yourlabs/django-autocomplete-light/issues/1171) doc typo fix by [@timgates42](https://github.com/timgates42)
- Flake8, Tox, Travis CI, tests ... fix by [@jpic](https://github.com/jpic)

## Wait, where are 3.6.0 and 3.7.0 ?


Well, Pypi won't let me upload there, it says:

    HTTPError: 400 Client Error: This filename has already been used, use a different version. See https://pypi.org/help/#file-name-reuse for more information. for url: https://upload.pypi.org/legacy/

But I only see 3.6.0.dev0 and 3.6.0.dev1 and 3.7.0.dev0, I suppose I should
have done pre-releases on 3.6.dev0 and 3.7.dev0.

Anyway, it lets me upload on 3.8.0, one of the last 3.x medium releases !

But don't worry, 4.0 will not break anything, it will merely add a new
autocomplete script for people who want out of select2 or want something
more like what we had in DAL 1 & 2, it's here:

Demo: https://oss.yourlabs.me/autocomplete-light/
Source: https://yourlabs.io/oss/autocomplete-light

The input will have your input design by default (because Shadow Root is not
activated on this component).

Other reasons why shadow root is not enabled yet:

- I didn't know all available features of CSS variables when I started the PoC
- I kind of remember that Shadow Root prevented plain form POST from working,
  but I'm not so sure about that and I can still try again ;)

You can test it in the alight branch of the django-autocomplete-light
repository.

For those who remember, this solves **exactly** the same problems that
jquery-autocomplete-light did, except it's a lightweight StencilJS
WebComponent now, as such, we won't have any initialization code for that (it's
done by the browser).

So, you will be able to use that to get a nice global navigation search in the
top bar in again, with server side rendering.

## Thanks

Thank you deeply to all contributors, I mean, I'm still shocked to read that
some users have just upgraded from 2.x to 3.x, does that mean they've had the
jquery-autocomplete-light script in production for potentially 8 years ?

It's mind blowing, you are amazing !
