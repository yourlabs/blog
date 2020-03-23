+++
date = "2018-10-16T11:22:45+00:00"
draft = false
tags = ["django", "python", "best-practice"]
title = "clilabs 1.1.1 release"
author = "jpic"
+++

Clilabs now benefit a new command that automates a series of 3 lines that's I've been typing over and over again during 10 years of Django hacking.


$ clilabs help +django:settings
Setting up django has failed !
DJANGO_SETTINGS_MODULE env var not set !
Show settings from django.

How many times have you done the following ?

    python manage.py shell
    from django.conf import settings
    settings.DATABASES # or something

Well it's over now ! Try this instead:

    clilabs +django:settings DATABASES INSTALLED_APPS # etc



Also, clilabs now automaticall detects the DJANGO_SETTINGS_MODULE if not set, by parsing the first manage.py it will find from the current working directory. What ? It's what I'd be doing manually anyway !!!

Let's see that:


16/10 2018 13:14:39 jpic@jpic ~/src/djcall  (master)
$ clilabs +django:settings DATABASES INSTALLED_APPS
Auto-detected DJANGO_SETTINGS_MODULE=djcall_example.settings
If incorrect, please set DJANGO_SETTINGS_MODULE env var
DATABASES={'default': {'ATOMIC_REQUESTS': False,
             'AUTOCOMMIT': True,
             'CONN_MAX_AGE': 0,
             'ENGINE': 'django.db.backends.sqlite3',
             'HOST': None,
             'NAME': '/home/jpic/src/crudlfap/db.sqlite3',
             'OPTIONS': {},
             'PASSWORD': None,
             'PORT': '',
             'TEST': {'CHARSET': None,
                      'COLLATION': None,
                      'MIRROR': None,
                      'NAME': None},
             'TIME_ZONE': None,
             'USER': None}}
INSTALLED_APPS=['django.contrib.admin',
 'django.contrib.auth',
 'django.contrib.contenttypes',
 'django.contrib.sessions',
 'django.contrib.messages',
 'django.contrib.staticfiles',
 'crudlfap',
 'betterforms',
 'bootstrap3',
 'material',
 'crudlfap_auth',
 'django_filters',
 'django_tables2',
 'djcall']

