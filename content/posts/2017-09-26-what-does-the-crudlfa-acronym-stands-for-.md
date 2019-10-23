+++
date = "2017-09-26T08:00:15+00:00"
draft = false
tags = ["python", "django", "crudlfap"]
title = "What does the CRUDLFA+ acronym stands for ?"
+++
Well, it definitely stands for something ! And since this is becoming a FAQ, here's my answer:

It stands for: Create Read Update Delete Form Autocomplete and more !

We started by making a CRUD because the customer was complaining his come was not DRY and that we should have a CRUD in Django - the customer comes from the modern PHP framework world. 

We soon figured we needed a crudL, for the list.
We wanted to add custom actions with custom forms and it became crudlF because we added the FormViewMixin.
Then we wanted to add automatic autocomplete views so it became crudlfA, with the AutocompleteView (to be Open Sourced soonish).
Then we wanted to just refactor custom views: turned out into we use ModelViewMixin, the mixin for a model view, ie. list, create ... and ObjectViewMixin, mixin for a model instance view ie. detail update delete forms ...

At the end of the day it was CRUDLFA+.

Initially I had the project to do something, I wasn't sure what, but I was just convinced Django was psychologically blocked on old decisions, such as not supporting any JS out of the box.
But for me, not having AJAX uploads and select fields out of the box made no sense for a web framework in 2017, and I'm maintaining django-autocomplete-light since 2012 at least so there comes a time when I want this to pay by giving me autocompletion on relations by default.

Another thing I was deeply convinced about, is that class based views are under-used in Django, ie. generate their URL definition themselves. I've digressed about it in [Rethinking Django's URL router](http://blog.yourlabs.org/post/165588642658/rethinking-djangos-url-router).

Initially, I had the plan to call it django-shemale because it would go against those dogmas, such as that django shouldn't do JS OOTB or ship default templates, and because it doesn't look like what you are used to see in the django ecosystem and of course, is beautiful by design ;)

But then I met a great developer, Etienne Vidal, who incepted the concepts from a PHP framework he used to make into my head. We implemented this in a really great customer project.

With `<3`

Jamesy aka jpic