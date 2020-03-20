+++
date = "2018-03-04T15:16:38+00:00"
draft = false
tags = ["selenium", "best-practice", "python", "django", "js"]
title = "Djangonauts: Say no to selenium drug"
+++
When you start applying best development practices such as TDD, you discover that you make much better software.

First, you can TDD your python code with anything, django has a test runner, otherwise you have pytest and many friends.

Then, you make python to interact with javascript. In the Django community, it seems that there is a conscensus around "use selenium to test your JS". I've been like this myself for years, but the thing with selenium is that it's functional testing, not unit testing, it does bring short term ROI, but on the long term it becomes costy to maintain over time.

And lets face it: have 100% unit test coverage of your code first, then think of functional testing. If you're doing functional testing on some JS code which has 0 unit test: you're clearly wasting a lot of efforts on the long run. Selenium is always going to ask for more attention, unit tests are fast and have low resource requirements which make them perfect to run on free services such as travis or circle.

The reality seems to be that most backend developers who are able to produce quality backend code have hard times creating quality JS code. I see this all the time:

- django-dynamic-fields, until the [current rewrite](https://github.com/yourlabs/django-dynamic-fields/tree/npm/src/ddf),
- django-autocomplete-light,
- it's the case for django-material js,
- same for nagare framework js

And i'm not here to criticize django-material or nagare, i LOVE both, but let's be honest: our JS is not up to our Python in terms of quality.

To be completely honest, i'm writing this for me because I'm guilty as everyone else, because i'm never falling in the trap again from now on. I don't see any excuse to not TDD JS and rely on functional tests instead, it's my fault and all I can honestly do about it is become a proper JS developer, and apply the same design principles which help me make better Python code.

Django itself, is even historically affraid of supporting any kind of JS integration outside their famous admin app. So your Django app out of the box will be usable as something from the Web 1.0 era. And really, I LOVE Django, but I'm also honest about it.

This is my invitation to break the pattern: say no to selenium code. Please TDD your JS code and release it as an NPM module, nowadays JS has all the ecosystem like Python with package managers, unit testing libraries - sometimes even better than Python.

And please, do go ahead and dump Python objects into JSON to pilot your JS code, it's easy to unit test on both sides, instead of wasting your time with selenium.

With LOVE