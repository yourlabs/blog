+++
date = "2012-08-28T12:15:00+00:00"
draft = false
tags = ["django", "best-practice"]
title = "Surviving django.contrib.staticfiles (or: how to manage static files with django)"
author = "jpic"
+++

This article describes how to use [django.contrib.staticfiles](https://docs.djangoproject.com/en/dev/howto/static-files/) as this is a FAQ StackOverflow and IRC.

### Structure

The HTTP server is to serve static files directly from a public folder, without going through Django at all.

#### Uploaded files

If the HTTP server configuration serves ``/srv/project/media_root/`` on url ``/media_url/``, for example with this nginx configuration:

        location ^~ /media_url/ {
            alias /srv/project/media_root/;
            autoindex off;
        }

Then:

- ``settings.MEDIA_ROOT`` should be ``/srv/project/media_root/``
- ``settings.MEDIA_URL`` should be ``/media_url/``

**``/srv/project/media_root/`` is managed by Django's FileField and ImageField file system storage, you should not add files there by yourself.**

#### Static files

In the same fashion, the HTTP server configuration serves ``/srv/project/static_root/`` on url ``/static_url/``, then:

- ``settings.STATIC_ROOT`` should be ``/srv/project/static_root/``,
- ``settings.STATIC_URL`` should be ``/static_url/``.

**Also, ``/srv/project/static_root/`` is managed by Django, and you should not add files there yourself.** Don't worry, we'll see how to work with that a little further in this article.

### Static files provided by external apps

External apps such as [django.contrib.admin](https://docs.djangoproject.com/en/dev/ref/contrib/admin/) provide static files from their ``static/`` subdirectory.

#### Problem

Take ``django/contrib/admin/static/admin/css/base.css`` for example, it is not in  ``settings.STATIC_ROOT ``. So, the HTTP server cannot serve it as-is.

#### Solution

Django provides a [management command](https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#collectstatic) that will copy the contents of the ``static/`` subdirectory of each ``INSTALLED_APPS`` into ``STATIC_ROOT``, making them available on ``STATIC_URL``:

    ./manage.py collectstatic

For example, it will copy ``django/contrib/admin/static/admin/css/base.css`` to ``/srv/project/static_root/admin/css/base.css``, making it available on url `` /static_url/admin/css/base.css``

### How to add your own static files

**``/srv/project/static_root/`` is managed by Django, and you should not add files there yourself.**

That's why the ``collectstatic`` command actually does much more. It will also **copy the contents of every directory in the ``settings.STATICFILES_DIRS`` into ``settings.STATIC_ROOT``**, making them available to ``settings.STATIC_URL``.

To create your own ``style.css``:

- create your project-level static files directory, for example: ``/srv/project/static_dir/``,
- create your  ``style.css`` in it, for example: ``/srv/project/static_dir/style.css``
- set  ``settings.STATICFILES_DIRS`` to ``/srv/project/static_dir/``

After you run ``collectstatic``, ``/srv/project/static_dir/style.css`` will be copied into ``/srv/project/static_root/style.css``, making it available in url ``/static_url/style.css``.

### How to override a static file

Imagine that you want to override ``/static_url/admin/css/base.css``. The first thing you have to do is find its location:

    >>> ./manage.py findstatic admin/css/base.css
    Found 'admin/css/base.css' here:
      /home/jpic/env/lib/python2.7/site-packages/django/contrib/admin/static/admin/css/base.css

Then, copy it to your ``/srv/project/static_dir/``, which you have added to ``settings.STATICFILES_DIRS`` (see previous paragraph), for example:

    mkdir -p /srv/project/static_dir/admin/css/
    cp /home/jpic/env/lib/python2.7/site-packages/django/contrib/admin/static/admin/css/base.css /srv/project/static_dir/admin/css

Your copy would reside in ``/srv/project/static_dir/admin/css/base.css``. For ``collectstatic``, ``/srv/project/static_dir/`` has priority over ``django/contrib/admin/static``, because of the default order of ``settings.STATICFILES_FINDERS``.

So, ``collectstatic`` will get ``/srv/project/static_root/admin/css/base.css`` to be a copy of your override ``/srv/project/static_dir/admin/css/base.css``, instead of the original ``django/contrib/admin/static/admin/css/base.css``

### Static files urls in templates

Because ``settings.STATIC_URL`` can change, for example you decide to use a CDN, then you should not hard-code static urls like this:

    <link rel="stylesheet" type="text/css" href="/static_url/style.css" />

Instead, it is better to use the [template tag](https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#template-tags):

    {% load static from staticfiles %}

    <link rel="stylesheet" type="text/css" href="{% static "style.css" %}" />

### In development

When using the development server with ``DEBUG=True``, it is not needed to run ``collectstatic`` because it would not be convenient. This is probably why you didn't notice what was happening behind the scenes at all.

### Going further

Read [Never hardcode absolute paths](http://blog.yourlabs.org/post/27477234167/never-hardcode-absolute-paths).

Read, or over-read the [documentation for django.contrib.staticfiles](https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/).
