+++
date = "2015-09-28T00:33:38+00:00"
draft = false
tags = ["python", "django", "django-autocomplete-light"]
title = "Django 1.9 support for Django-autocomplete-light"
author = "jpic"
+++

Since Django 1.9a1 was released, many users are going to upgrade their project and wonder why django-autocomplete-light won't load anymore. Probably, some users are going to google ImportError or even [`django.core.exceptions.AppRegistryNotReady: Apps aren't loaded yet`](https://github.com/yourlabs/django-autocomplete-light/commit/7e6d10e07cc3b6931f3ca738d07464d6667d4bda) about autocomplete_light and Django 1.9. This post documents the situation and provides a solution.

Do:


{{< highlight bash>}}
    find test/ -name foo -exec sed -i 's/import autocomplete_light/from autocomplete_light import shortcuts as autocomplete_light/' '{}' \;
{{< / highlight >}}


I don't remember why exactly since we've baked Django 1.9 support in April 2015 (victory !!!), but IIRC due to app-loading refactor we can't have anything in `__init__.py` for installed apps just for convenience anymore (ie. model imports). To maintain as much backward compatibility as possible, we still load what we can there, but please use ``autocomplete_light.shortcuts`` instead.

And while we're at it, feel free to use ``from autocomplete_light import shortcuts as al``, that's the namespace used in the [django autocomplete examples](http://django-autocomplete-light.readthedocs.org/en/master/autocomplete.html?highlight=shortcuts#examples) now.

I've pushed the [dj19](https://github.com/yourlabs/django-autocomplete-light/commits/dj19) branch back on github for posterity, it might be instructive to other django app maintainers desiring to support Django 1.9.

Commit [7e6d10e](https://github.com/yourlabs/django-autocomplete-light/commit/7e6d10e07cc3b6931f3ca738d07464d6667d4bda) demonstrates how taking the Generic autocompletes out of `autocomplete_light/__init__.py` was required for Django 1.9 to boot:


{{< highlight bash>}}
    $ ./manage.py runserver
    Traceback (most recent call last):
      File "./manage.py", line 10, in <module>
        execute_from_command_line(sys.argv)
      File "/home/jpic/env/lib/python2.7/site-packages/django/core/management/__init__.py", line 350, in execute_from_command_line
        utility.execute()
      File "/home/jpic/env/lib/python2.7/site-packages/django/core/management/__init__.py", line 342, in execute
        self.fetch_command(subcommand).run_from_argv(self.argv)
      File "/home/jpic/env/lib/python2.7/site-packages/django/core/management/__init__.py", line 176, in fetch_command
        commands = get_commands()
      File "/home/jpic/env/lib/python2.7/site-packages/django/utils/lru_cache.py", line 100, in wrapper
        result = user_function(*args, **kwds)
      File "/home/jpic/env/lib/python2.7/site-packages/django/core/management/__init__.py", line 71, in get_commands
        for app_config in reversed(list(apps.get_app_configs())):
      File "/home/jpic/env/lib/python2.7/site-packages/django/apps/registry.py", line 137, in get_app_configs
        self.check_apps_ready()
      File "/home/jpic/env/lib/python2.7/site-packages/django/apps/registry.py", line 124, in check_apps_ready
        raise AppRegistryNotReady("Apps aren't loaded yet.")
    django.core.exceptions.AppRegistryNotReady: Apps aren't loaded yet.
{{< / highlight>}}


Or pass tests:


{{< highlight bash>}}
    $ tox
    py34-djangomaster create: /home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster
    py34-djangomaster installdeps: https://github.com/django/django/archive/master.tar.gz, -rtest_project/test_requirements_without_django.txt
    py34-djangomaster develop-inst: /home/jpic/env/src/autocomplete-light
    py34-djangomaster runtests: PYTHONHASHSEED='686383435'
    py34-djangomaster runtests: commands[0] | py.test --strict -r fEsxXw autocomplete_light
    Traceback (most recent call last):
      File ".tox/py34-djangomaster/bin/py.test", line 9, in <module>
        load_entry_point('pytest==2.7.0', 'console_scripts', 'py.test')()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/config.py", line 32, in main
        config = _prepareconfig(args, plugins)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/config.py", line 85, in _prepareconfig
        pluginmanager=pluginmanager, args=args)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 521, in __call__
        return self._docall(self.methods, kwargs)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 528, in _docall
        firstresult=self.firstresult).execute()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 393, in execute
        return wrapped_call(method(*args), self.execute)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 109, in wrapped_call
        wrap_controller.send(call_outcome)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/helpconfig.py", line 28, in pytest_cmdline_parse
        config = outcome.get_result()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 137, in get_result
        raise ex[1].with_traceback(ex[2])
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 123, in __init__
        self.result = func()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 394, in execute
        res = method(*args)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/config.py", line 636, in pytest_cmdline_parse
        self.parse(args)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/config.py", line 746, in parse
        self._preparse(args)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/config.py", line 718, in _preparse
        args=args, parser=self._parser)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 521, in __call__
        return self._docall(self.methods, kwargs)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 528, in _docall
        firstresult=self.firstresult).execute()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 393, in execute
        return wrapped_call(method(*args), self.execute)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 113, in wrapped_call
        return call_outcome.get_result()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 137, in get_result
        raise ex[1].with_traceback(ex[2])
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 123, in __init__
        self.result = func()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/_pytest/core.py", line 394, in execute
        res = method(*args)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/pytest_django/plugin.py", line 202, in pytest_load_initial_conftests
        _setup_django()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/pytest_django/plugin.py", line 124, in _setup_django
        django.setup()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/__init__.py", line 18, in setup
        apps.populate(settings.INSTALLED_APPS)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/apps/registry.py", line 85, in populate
        app_config = AppConfig.create(entry)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/apps/config.py", line 86, in create
        module = import_module(entry)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/importlib/__init__.py", line 109, in import_module
        return _bootstrap._gcd_import(name[level:], package, level)
      File "<frozen importlib._bootstrap>", line 2254, in _gcd_import
      File "<frozen importlib._bootstrap>", line 2237, in _find_and_load
      File "<frozen importlib._bootstrap>", line 2226, in _find_and_load_unlocked
      File "<frozen importlib._bootstrap>", line 1200, in _load_unlocked
      File "<frozen importlib._bootstrap>", line 1129, in _exec
      File "<frozen importlib._bootstrap>", line 1471, in exec_module
      File "<frozen importlib._bootstrap>", line 321, in _call_with_frames_removed
      File "/home/jpic/env/src/autocomplete-light/autocomplete_light/__init__.py", line 4, in <module>
        from .registry import AutocompleteRegistry, registry, register, autodiscover
      File "/home/jpic/env/src/autocomplete-light/autocomplete_light/registry.py", line 26, in <module>
        from .autocomplete import AutocompleteModelBase, AutocompleteInterface
      File "/home/jpic/env/src/autocomplete-light/autocomplete_light/autocomplete/__init__.py", line 6, in <module>
        from .generic import AutocompleteGeneric
      File "/home/jpic/env/src/autocomplete-light/autocomplete_light/autocomplete/generic.py", line 4, in <module>
        from django.contrib.contenttypes.models import ContentType
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/contrib/contenttypes/models.py", line 159, in <module>
        class ContentType(models.Model):
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/db/models/base.py", line 94, in __new__
        app_config = apps.get_containing_app_config(module)
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/apps/registry.py", line 234, in get_containing_app_config
        self.check_apps_ready()
      File "/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/lib/python3.4/site-packages/django/apps/registry.py", line 124, in check_apps_ready
        raise AppRegistryNotReady("Apps aren't loaded yet.")
    django.core.exceptions.AppRegistryNotReady: Apps aren't loaded yet.
    ERROR: InvocationError: '/home/jpic/env/src/autocomplete-light/.tox/py34-djangomaster/bin/py.test --strict -r fEsxXw autocomplete_light'
{{< / highlight >}}


Also, don't forget to [try Django 1.9's new admin theme](http://jpic.pythonanywhere.com) ! </module></module></module></module></module></frozen></frozen></frozen></frozen></frozen></frozen></frozen></module>
