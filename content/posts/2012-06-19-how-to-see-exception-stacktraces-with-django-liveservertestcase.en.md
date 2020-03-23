+++
date = "2012-06-19T07:56:00+00:00"
draft = false
tags = ["django", "python"]
title = "How to see exception stacktraces with django LiveServerTestCase"
author = "jpic"
+++

After playing with [selenium and LiveServerTestCase](https://docs.djangoproject.com/en/dev/topics/testing/?from=olddocs#live-test-server) a little while, you might
see this:


{{< highlight python>}}
    Traceback (most recent call last):
      File "/usr/lib/python2.7/wsgiref/handlers.py", line 85, in run
        self.result = application(self.environ, self.start_response)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/contrib/staticfiles/handlers.py", line 68, in __call__
        return super(StaticFilesHandler, self).__call__(environ, start_response)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/core/handlers/wsgi.py", line 241, in __call__
        response = self.get_response(request)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/contrib/staticfiles/handlers.py", line 63, in get_response
        return super(StaticFilesHandler, self).get_response(request)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/core/handlers/base.py", line 153, in get_response
        response = self.handle_uncaught_exception(request, resolver, sys.exc_info())
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/core/handlers/base.py", line 228, in handle_uncaught_exception
        return callback(request, **param_dict)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/utils/decorators.py", line 91, in _wrapped_view
        response = view_func(request, *args, **kwargs)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/views/defaults.py", line 32, in server_error
        t = loader.get_template(template_name) # You need to create a 500.html template.
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/template/loader.py", line 145, in get_template
        template, origin = find_template(template_name)
      File "/home/jpic/env/local/lib/python2.7/site-packages/django/template/loader.py", line 138, in find_template
        raise TemplateDoesNotExist(name)
    TemplateDoesNotExist: 500.html
{{< / highlight>}}


Adding templates/500.html won't give you a stacktrace.

The solution is to add something like this to [settings.LOGGERS](http://docs.djangoproject.com/en/dev/topics/logging):


{{< highlight python>}}
    'handlers': {
        'console':{
            'level':'DEBUG',
            'class':'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.request': {
            'handlers':['console'],
            'propagate': True,
            'level':'DEBUG',
        },
{{< / highlight>}}

