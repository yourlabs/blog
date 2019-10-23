+++
date = "2012-07-18T11:49:00+00:00"
draft = false
tags = ["python", "django", "best-practice"]
title = "Never hardcode absolute paths"
+++
This is *nonono*:

```
{{< highlight python>}}
    STATIC_ROOT = '/home/coat/www/site/app/static/'
{{< / highlight>}}
```

**Never** hardcode absolute paths, you're just making your settings file less portable and probably killing kittens. Adapt this to your needs:

```
{{< highlight python>}}
    import os.path
    import posixpath

    PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')

    STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')

    # fix STATICFILES_DIRS too
    # and TEMPLATE_DIRS
{{< / highlight>}}
```
