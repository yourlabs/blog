+++
date = "2013-12-16T09:01:00+00:00"
draft = false
tags = ["selenium", "python", "django", "travis-ci"]
title = "RuntimeError: Failed to shutdown the live test server in 2 seconds. The server might be stuck or generating a slow response."
author = "jpic"
+++

Another problem you [might run into](https://travis-ci.org/yourlabs/django-autocomplete-light/jobs/15177540) when testing Django apps with Selenium on Travis:

    ======================================================================
    ERROR: tearDownClass (autocomplete_light.tests.widget.WidgetTestCase)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
      File "/home/travis/build/yourlabs/django-autocomplete-light/autocomplete_light/tests/widget.py", line 29, in tearDownClass
        super(WidgetTestCase, cls).tearDownClass()
      File "/home/travis/virtualenv/python2.7/local/lib/python2.7/site-packages/django/test/testcases.py", line 1148, in tearDownClass
        cls.server_thread.join()
      File "/home/travis/virtualenv/python2.7/local/lib/python2.7/site-packages/django/test/testcases.py", line 1072, in join
        self.httpd.shutdown()
      File "/home/travis/virtualenv/python2.7/local/lib/python2.7/site-packages/django/test/testcases.py", line 959, in shutdown
        "Failed to shutdown the live test server in 2 seconds. The "
    RuntimeError: Failed to shutdown the live test server in 2 seconds. The server might be stuck or generating a slow response.

Apparently, two seconds are not enough wait for travis, sometimes. Unfortunnately, the 2 seconds wait is [hard-coded into Django](https://github.com/django/django/blob/1.6/django/test/testcases.py#L999), not to mention that it's in another thread which makes it even harder to fix in our projects.

The only solution I have found so far is a [monkey-patch](http://en.wikipedia.org/wiki/Monkey_patch), which I implemented in [django-autocomplete-light](https://github.com/yourlabs/django-autocomplete-light/commit/5ff24564946feb65fb6c4c42b7d3793b6ebcae3b):



{{< highlight python>}}
    # Patch for travis
    from django.test.testcases import StoppableWSGIServer


    def patient_shutdown(self):
        """
        Stops the serve_forever loop.

        Blocks until the loop has finished. This must be called while
        serve_forever() is running in another thread, or it will
        deadlock.
        """
        self._StoppableWSGIServer__serving = False
        if not self._StoppableWSGIServer__is_shut_down.wait(30 if os.environ.get('TRAVIS', False) else 2):
            raise RuntimeError(
                "Failed to shutdown the live test server in 2 seconds. The "
                "server might be stuck or generating a slow response.")
    StoppableWSGIServer.shutdown = patient_shutdown
{{< / highlight >}}


This will give travis 30 seconds to shut down the server, and [fix everything](https://travis-ci.org/yourlabs/django-autocomplete-light/builds/15180200).

Note that this is not necessary starting Django 1.7. However, `LiveServerTestCase` won't serve static files anymore in Django 1.7. So this is how you get a `LiveServerTestCase` that works on travis and all versions of Django:


{{< highlight python>}}
    if VERSION[0] == 1 and VERSION[1] &lt; 7:
        # Patch for travis
        from django.test.testcases import StoppableWSGIServer

        def patient_shutdown(self):
            Stops the serve_forever loop.…                                                                                                    6… 
            self._StoppableWSGIServer__serving = False
            if not self._StoppableWSGIServer__is_shut_down.wait(30):
                raise RuntimeError(
                    "Failed to shutdown the live test server in 2 seconds. The "
                    "server might be stuck or generating a slow response.")
        StoppableWSGIServer.shutdown = patient_shutdown
    else:
        # LiveServerTestCase doesn't serve static files in 1.7 anymore
        from django.contrib.staticfiles.testing import StaticLiveServerCase as LiveServerTestCase
{{< / highlight>}}

