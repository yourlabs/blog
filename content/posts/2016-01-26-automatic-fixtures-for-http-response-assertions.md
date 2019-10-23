+++
date = "2016-01-26T13:41:36+00:00"
draft = false
tags = ["python", "django", "test", "django-responsediff", "best-practice"]
title = "Automatic fixtures for HTTP Response assertions"
+++
As stated in the "Database state assertion" article: I'm pretty lazy
when it comes to writing tests for existing code, however, I'm even lazier when
it comes to repetitive manual testing action.

When my user tests my website, they browse it and check that everything is
rendered fine. In the same fashion,
[django-responsediff](https://github.com/yourlabs/django-responsediff) eases
doing the high-level assertions of page HTML rendering.

Consider this example:

    class TestYourView(TestCase):
        def test_your_page(self):
            result = test.Client().get(your_url)

            # Factory to create a Response for this test
            expected = Response.for_test(self)

            # Generate the fixture if necessary, otherwise GNU diff-it
            expected.assertNoDiff(result)

On the first run, this would create a directory in the directory containing
TestYourView, named ``responsediff_fixtures``, with a sub-directory
``TestYourView.test_your_page`` and a file ``content`` with response.content in
there, if it does not already exist, and raise ``FixtureCreated`` to inform the
user that no test has actually been run, and that the fixture has just been
created.

User should add the generated fixture to the repository. Then, next time this
test is run, it will run GNU diff between ``response.content`` and the
previously-generated fixture, if a diff is found then assertNoDiff() will raise
a DiffFound exception, printing out the diff output.

Of course, a lot of new features are possible and will come when their need
becomes an impediment for one of us djangonauts, some ideas:

- store response headers and compare them too,
- tests only bits of the contents,
- why not even a spider that would crawl the website and create tests, but
  that's what django-test-utils, unfortunnately unmaintained used to do.

Happy testing !!