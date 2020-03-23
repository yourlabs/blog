+++
date = "2016-03-05T01:54:34+00:00"
draft = false
tags = ["python", "django", "django-autocomplete-light"]
title = "django-autocomplete-light v3: what’s going on"
author = "jpic"
+++

This post clarifies the status of django-autocomplete-light and strategy for v3.

### Version 2

No further effort will be made to support new versions of Django in v2. However, it supports the current LTS Django 1.8 and future-release Django 1.10, so we've got plenty of time to re-do v2's best features in v3 (in a better way) and most importantly you've got plenty of time to upgrade (until 2018).

### Version 3

It's a ground-up rewrite and it's not backward compatible - hence the 2 years upgrade plan.

#### Backward compatibility break from 3.0 to 3.1

Most important news first: CreateModelField, introduced in 3.0, is gone in 3.1, and objects are created on the fly like in v2 in 3.1. It's much better supported by django's ChoiceField and Select widget to not re-invent values themselves. See the [old way](http://django-autocomplete-light.readthedocs.org/en/3.0.4/creation.html) and the [new way](http://django-autocomplete-light.readthedocs.org/en/master/tutorial.html#creation-of-new-choices-in-the-autocomplete-form)

Also, dal_tagulous was removed in favor of django-tagging, because
tagulous already provides its implementation of a select2 widget.

#### Scripts

V3 supports multiple scripts for the frontend. The only one that's currently implemented is Select2, because it suits most users and projects and is more widely tested.

Of course, it wasn't built *for server side frameworks* like jquery-autocomplete-light. JAL allows to have consistent rendering in the widget and autocomplete box, as well as server side template rendering. So that's definitely a must for us and is the priority for DAL 3.2.

#### Add-another popup

add-another feature has been extracted from v2 into
[yourlabs/django-addanother](https://github.com/yourlabs/django-addanother) in a generic fashion. A widget wrapper class with the same design as in django.contrib.admin.widgets.RelatedFieldWidgetWrapper is implemented here and should support any kind of Select widget. 

Unfortunnately for the release, it turned out another app existed with that purpose at the moment I was registering it on PyPi after reaching test completion.

Collaboration with @jonashaag to backport it to [jonashaag/django-addanother](https://github.com/jonashaap/django-addanother)
has been agreed to and is in progress.

Meanwhile, you can use [yourlabs/django-addanother](https://github.com/yourlabs/django-addanother) for any kind of (multiple) Select widget, you could even use it with django-select2 or whatnot. That app is meant to be forward compatible, except the main app name which may change from `addanother` to `django_addanother`.

#### ModelForm

v2 provides a ModelForm that's able to save generic foreign key and django-genericm2m generic many to many relations. This has been implemented in v3 in a more generic way, supporting django-gm2m as well.

However, this is considered out of the scope of DAL so it will be removed for v3 when [django-xmodelform](https://github.com/jpic/xmodelform) is finished. Backward compatibility will be kept here because it's just an import.

This is even considered a hack because Django is designed as such: Model fields are the glue between form fields and db fields, as you can see from Model Field source code. This means that if we want a form field for a model field that, then we need that model field to provide at least a default form field. This is **not** the case for GenericForeignKey, so that's why the mid-term plan is to keep this in xmodelform until we have contribute form fields for django's GenericForeignKey and django-genericm2m and django-gm2m's form fields.

#### ModelFormMetaclass

Having a ModelForm which directly configures fields is of god damn beauty, and I don't see how anyone is going to take that away from v2. As a matter of fact, the lack of this feature was the first issue raised on v3 by the community.

About getting this feature into Django itself, I'm trying to [start a discussion to improve this](https://groups.google.com/forum/#!topic/django-developers/zG-JvS_opi4) and so far, I've got no feedback. So if that's important for you, please participate :)

It is considered out of the scope of DAL to provide a ModelFormMetaclass like in v2. Instead, a ModelFormMetaclass which has a registry of factories, as implemented in xmodelform will be used.

The initial plan of iterating over registered urls to find the appropriate default autocomplete view for a relation doesn't work because urls are not yet registered at the moment forms are being declared.

I've experimented with tons of way to achieve that, and it seems like the only way is indeed to build a map of default autocomplete urls for relation types, ie. `country_autocomplete` for any relation to `Country`. We might have to do a few API backflips to achieve this, such as coding the default url name as a View attribute, so that it can be used both in a register call inside App.ready, and in a url factory provided by the view, left to the user to register in urlpatterns.

#### Better views

I really like it when I can just override a method and do my own queryset sauce. However, users have proven their eager for contributing APIs like search_fields. Like in v2, I'm going to completely leave this to the community.

### Conclusion

There's a lot of work, and it's a lot of fun. But don't forget, we're all volunteers, so any contribution you'll make (please, no issues without pull request !!), or any cash you can give, will provide the motivation to achieve this together.

We really need v3 to be the last release before it or something else is integrated into Django (1.17 ? LOL), so we've got to do it right, it'll take time and effort, any help we can get is welcome. I know some are using DAL in banks, or big companies, please find a way to help us, if you can't dedicate time then you know what you can do !
