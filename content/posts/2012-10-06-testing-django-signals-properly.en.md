+++
date = "2012-10-06T14:17:00+00:00"
draft = false
tags = ["python", "django"]
title = "Testing django signals properly"
author = "jpic"
+++

Asserting that signals were sent properly can be a bit tricky: they must be sent in a particular order with specific arguments.

Fortunately, [mock-django](https://github.com/dcramer/mock-django) provides plenty of cool features, including a nice signal receiver mock. The only problem with mock-django is that it's not documented. So I had to reverse-engineer and here's what I've found: the best way to test a signal is to use the ``call_args_list`` property of the receiver mock.

A simple example (courtesy of [django-appstore](https://github.com/yourlabs/django-appstore/)), asserts that ``your_function`` sends the right signal:


{{< highlight python>}}
    import unittest
    from mock import call
    from mock_django.signals import mock_signal_receiver

    import your_function

    
    class YourTestCase(unittest.TestCase):
        def test_001_simple_app(self):
            app = App.objects.create(name='artists',
                category=AppCategory.objects.create(name='art'))
            appversion = AppVersion.objects.create(app=app, version=0)
            env = Environment.objects.create(name='default')

            with mock_signal_receiver(post_app_install) as install_receiver:
                env.install(appversion)
                # test that the signal was called once with the right arguments
                self.assertEqual(install_receiver.call_args_list, [
                    call(signal=post_app_install, sender=env,
                        appversion=appversion),
                ])
{{< / highlight >}}


To test that a signal was called several times, with the right arguments in the right order:


{{< highlight python>}}
    def test_002_simple_dependency(self):
        artists_app = App.objects.create(name='artists',
            category=AppCategory.objects.create(name='art'))
        artists_appversion = AppVersion.objects.create(app=artists_app, version=0)

        artworks_app = App.objects.create(name='artworks',
            category=AppCategory.objects.get(name='art'))
        artworks_appversion = AppVersion.objects.create(app=artworks_app, version=0)
        artworks_appversion.dependencies.add(artists_appversion)

        env = Environment.objects.create(name='default')

        with mock_signal_receiver(post_app_install) as install_receiver:
            env.install(artworks_appversion)
            self.assertEqual(install_receiver.call_args_list, [
                call(signal=post_app_install, sender=env,
                    appversion=artists_appversion),
                call(signal=post_app_install, sender=env,
                    appversion=artworks_appversion),
            ])
{{< / highlight>}}

