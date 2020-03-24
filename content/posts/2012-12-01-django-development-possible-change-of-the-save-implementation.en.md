+++
date = "2012-12-01T08:29:00+00:00"
draft = false
tags = ["django-developers", "django"]
title = "Django development: possible change of the .save() implementation"
author = "jpic"
+++

An interesting [topic by Anssi Kääriäinen](https://groups.google.com/forum/?fromgroups=#!topic/django-developers/LMshzW3duNM) flew by django-developers mailing list about [ticket #16649: "Models.save() refactoring: check updated rows to determine action"](https://code.djangoproject.com/ticket/16649).

The ticket mentions a **50% performance optimization**. Here's an explanation by akaariai (core developer):
> A bit more information about what the approach suggested is about. Assume you load a model from DB, change some fields and save it. We currently do:
>
>     SELECT - load from DB
>     [change fields]; save()
>     In save:
>         SELECT - assert that the PK exists in the DB
>         if yes:
>             UPDATE
>         else:
>             INSERT
>
> 
> The second select above is usually redundant. If we know the object is loaded from DB (`self._state.adding == False`), and we are saving it to the same DB it was loaded from (`self._state.db == the db we are saving to`), then it is very likely the object exists in the DB. So, instead we should do:
> 
> In save:
>
>     if same db, not adding:
>         exists = UPDATE
>     else:
>         exists = SELECT
>         if exists:
>             UPDATE
>     if not exists:
>         INSERT
> 
> So, in the case the model is already in the DB, we do just a single update instead of select + update. If it so happens it doesn't exist (which should be very unlikely), we do update with zero rows modified and still know to do an insert.
> 
> This does lead to behavior change on MySQL when there is a concurrent insert to the same table. Currently the SELECT sees nothing, and the insert will lead to integrity error. After this, the update will block until the inserting transaction is committed, and then update the matching row. However, on PostgreSQL the update sees nothing, so there is no behavior change there. For MySQL users this will be better than what we have now. For PostgreSQL users there is no change from behavior standpoint.

To keep updated about this, you can [star the thread](https://groups.google.com/forum/?fromgroups=#!topic/django-developers/LMshzW3duNM)
