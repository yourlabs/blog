+++
date = "2018-08-01T19:16:07+00:00"
draft = false
tags = ["python", "django", "uwsgi", "django-uwsgi-spooler"]
title = "yourlabsdjango-uwsgi-spooler"
author = "jpic"
+++

https://github.com/yourlabs/django-uwsgi-spooler

Finnaly a Django app to wrap around uWSGI's builtin spooler ! I should have done this years ago, but I was expecting to make a boring module, it turned out a lot more exciting than expected ! First things first, django-uwsgi-spooler has only one expectation from your callbacks: be an importable function and take a task argument. The only other expectation is that you can use the Task model it provides, for example: Task(callback_name='yourmodule.yourcallback', env=myvars).spool() Find more up to date information in [the README](https://github.com/yourlabs/django-uwsgi-spooler). What's the catch ? **SECURITY** Task model has a PickleField for you to pass data Well, hitting the database to update the task information (progress and output) is highly sub-optimal. So, the product needs going through another iteration, to make it use cache as safely as possible and still persist the data (progress, output) from the cache into the database after the task is over. But still, if you have [CRUDLFA+](https://blog.yourlabs.org/tagged/crudlfap) then it will offer a CRUD interface out of the box. For the moment it's basic Task model visualisation, but I'm excited because of the possibilities it opens, such as: creating tasks in the admin, using other tasks as template, cancelling tasks... Have fun !
