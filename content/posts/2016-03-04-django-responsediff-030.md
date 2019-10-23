+++
date = "2016-03-04T22:19:32+00:00"
draft = false
tags = ["python", "django", "best-practice", "django-responsediff"]
title = "django-responsediff 0.3.0"
+++
[django-responsediff](https://github.com/yourlabs/django-responsediff) 0.3.0 has been released !

It now also checks the status_code, and has a cute mixin:

    from responsediff.test import ResponseDiffTestMixin

    class MixinTest(ResponseDiffTestMixin, test.TestCase):
        def test_admin(self):
            self.assertResponseDiffEmpty(test.Client().get('/admin/'))

The above will fail on the first time with ``FixtureCreated`` to indicate that
it has written
``responsediff/tests/response_fixtures/MixinTest.test_admin/{content,status_code}``.

This file is meant to be added to version control. So next time this will run,
it will check that ``response.status_code`` and ``response.content`` is the
same, in future version, or in other configurations (ie. py35, py27, pypy, etc
...).

Enjoy !