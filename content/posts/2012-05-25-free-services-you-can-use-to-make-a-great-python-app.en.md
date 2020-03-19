+++
date = "2012-05-25T09:48:00+00:00"
draft = false
tags = ["python"]
title = "Free services you can use to make a great python app"
+++
A great django app should have:

- a source repository
- an issue tracker
- documentation
- release packages
- a mailing list
- continuous integration
- translations

### Source code repository and issue tracker

Usually, source code repository services come with an issue tracker. The most common are [Github](http://github.com) and [Bitbucket](http://bitbucket.com) for mercurial.

You can find other [git hosts](https://git.wiki.kernel.org/index.php/GitHosting) such as [Baregit](http://baregit.com/) but they don't necessarily include an issue tracker like Github or Bitbucket.

Most django apps use github, but also many of them are on bitbucket.

### Documentation

The standard way is to have a [sphinx](http://sphinx.pocoo.org/) project in the docs subdirectory of the application sources root.

[Read the docs](http://rtfd.org) is great service which connects to your repo, builds and hosts the sources. It will generate an url like [django-autocomplete-light.rtfd.org](http://django-autocomplete-light.rtfd.org) hosting the documentation.

If using Github, then you can enable a "post commit hook" to RTFD. This will enable documentation regeneration every time a commit is pushed. Many great django applications use it. A really amazing service !

### Release packages

The standard way is to [build a python setuptools package](http://packages.python.org/distribute/setuptools.html). A package is an archive of the source code that can be installed with easy_install or pip.

You can host it like you want, but the easiest is to just upload it on [PyPi](http://pypi.python.org).

### Mailing list

A mailing list where new version can be announced and where users can ask questions. I found two hosts:

- [librelist](http://librelist.com),
- [google](http://groups.google.com),

Old school hackers will prefer librelist, but it has some issue as you can see in the FAQ, with emails hosted at google that are not @gmail.com.

### Continuous integration

Continuous integration means running the tests after every source code update, to find regressions.

[Travis-ci](http://travis-ci.org) is a fantastic service which can also be enabled by a github post commit hook. It will download the last sources and run tests, and email you if they fail.

Travis can also be configured to run PEP8 compliance tests in addition to unit tests.

### Translations

[Transifex](http://transifex.net) is a fantastic translator network which also connects to the source repository.

### Demo projects

[PythonAnywhere](http://pythonanywhere.com) is an awesome webhost which has a free plan.

### Example

It does take quite some effort to configure all this, but it's very rewarding. There is a lot of documentation, IRC support channels and of course: many open source examples to get inspiration from.

Here are a couple of apps I did which use these services:

- [django-autocomplete-light](http://github.com/yourlabs/django-autocomplete-light/),
- [django-cities-light](http://github.com/yourlabs/django-cities-light),
- [django-session-security](http://github.com/yourlabs/django-session-security),

But you can find [many others](https://www.google.es/search?q=django+site%3Artfd.org).