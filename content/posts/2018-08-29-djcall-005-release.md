+++
date = "2018-08-29T00:03:40+00:00"
draft = false
tags = ["python", "django", "uwsgi", "spooler", "cron"]
title = "djcall 0.0.5 release"
+++
django-call is a model wrapper around uWSGI native [cron](http://uwsgi-docs.readthedocs.io/en/latest/Cron.html) and [spooler](http://uwsgi-docs.readthedocs.io/en/latest/Spooler.html) features, including the [signal framework](https://uwsgi-docs.readthedocs.io/en/latest/Signals.html) allowing to program callbacks on cron or run them in a given spooler with a given priority for example.

For example right now on a betagouv project it logs the following when uWSGI starts:

```
[uwsgi-signal] signum 1 registered (wid: 0 modifier1: 0 target: worker)                                                
[djcall] uwsgi.register_signal(1, mrsstat.models.Stat.objects.create_missing)                                          
[uwsgi-signal] signum 2 registered (wid: 0 modifier1: 0 target: worker)                                                
[djcall] uwsgi.register_signal(2, caisse.models.daily_mail)                                                            
[uwsgi-signal] signum 3 registered (wid: 0 modifier1: 0 target: worker)                                                
[djcall] uwsgi.register_signal(3, djcall.models.prune)     
[djcall] mrsstat.models.Stat.objects.create_missing() add cron : (0, 2, -1, -1, -1) signal 1                           
[djcall] caisse.models.daily_mail() add cron : (0, 8, -1, -1, 1) signal 2                                              
[djcall] caisse.models.daily_mail() add cron : (0, 8, -1, -1, 2) signal 2                                              
[djcall] caisse.models.daily_mail() add cron : (0, 8, -1, -1, 3) signal 2                                              
[djcall] caisse.models.daily_mail() add cron : (0, 8, -1, -1, 4) signal 2                                              
[djcall] caisse.models.daily_mail() add cron : (0, 8, -1, -1, 5) signal 2                                              
[djcall] djcall.models.prune(keep=10000) add cron : (0, 4, -1, -1, -1) signal 3      
```

The Cron model supports 1-5 notation but uWSGI's add_cron does not, that's why the Cron registers daily_mail on a signal on startup using itertools.product (thanks #python@irc.freenode.net !) and calls uwsgi.add_cron as needed on that signal.

Also note that the daily_mail() function uses the spooler to spool mail.send() call, and looks somewhat like this:

```
def daily_mail():
    if date.today() in holidays.France():
        return

    Caller(callback='djcall.django.email_send', kwargs=dict(subject...)).spool()
```

Another note is that it registers its own callback to clean up the Call table daily (a retrying task will create subsequent Call models, which should at some point allow to estimate Call ETA), you can see it running in the logs or by fetch Call models:

```
[djcall] djcall.models.prune(keep=10000) -> Call(id=240).call()
Dropping 0 Call objects
[djcall] djcall.models.prune(keep=10000) -> Call(id=240).call(): None
```

It's pretty fresh at the time of writing, doesn't really support live patching (although it could call a uwsgi releoad maybe), but I've wanted to have such an app for a long time and nobody made it, so "here goes nothin" and "oh god i hope it works".