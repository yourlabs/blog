+++
date = "2018-03-08T17:33:35+00:00"
draft = false
tags = ["best-practice", "python", "django"]
title = "django-adapters audit writeup"
+++
It's been probably 30 hours I've spent trying to contribute to the [django-adapters](https://github.com/mjtamlyn/django-adapters/). This article describes the approach we take when making investment audits on software @ YourLabs, and my conclusions on this project.

I started by reading what had been done and issues. My first mistake was to not be patient enough to really read and profoundly understand absolutely every piece that had been done.

It seems to me that what django-adapters tries to do is invent a new pattern to solve the kind of problems we usually deal with as developers:

- fetch data from some source, using various python libraries for example, converting settings into things like API urls and whatnot,
- make a friendly data submission interface striving to help the user fix his data input until valid, the more friendly it is, the less Humans will be waiting for our answers on how exactly it is usable,
- process the valid data which means executing various steps, from writing a file to sending an email or triggering a channels job, and outputing something, an json dump, an html body, a response object, or something

In 2018, we also need to write good JS code, having good development workflows like JS or Python developers have surely help. For DRY purposes, we need to be able to pick up on the client side where the server side left the story.

Example: If something should add or remove a field, we should only specify it once, then be able to code both the client and server, in different languages ok that works for me: code the server in python, client in js, because it's not an isomorphic Go or Node project, but as a Human being my issue is the same. This is why i started the [facond project](http://facond.readthedocs.io/en/master/) with a reasonable ambition that fits my little size. python-adapters however, should enable as a framework to glue different libraries around data they can share logic on, dump/restore the logic schemas, and be introspectable and mutable to enable even more in-the-foot-shooting.

Surely, this will create a lot of new problems, but will fix a lot of problems we have been having for the past 10 years. Is this going to fix more problems than it will solve ? Given the frustration around several components which are just too old, but kept for backward compatibility. 

**And python-adapters have a great pattern to make things compatible so that's absolutely complementary, adding adapters to an existing project can only enhance it.**

Now, for the financial part of the report.

Where's dealing with a beast size piece of software, this can be a framework on its own, to actually glue all apps in the python ecosystem together, based on steps being executed on payloads and mutable data structures with a certain isomorphism, and with django bring that to a high level, so in my opinion to can have a ROI of a million USD/year starting next year, if really this is produced by the team of people watching this repository.

I think a time estimate of 300 man hours will be a minimum, but if we want this to be as perfect as we can we know how 300 hours can slip into 500, so for security, YourLabs Business Service recommendation is to start the project with 50k, as sponsor we'll provide a major part of that budget.

That said, I still think most of it is not django specific, so we could target the whole python community, should be python-adapters rather than django-adapters: this is a framework for gluing code, it can help with a web framework, but is also useful without web frameworks.

I also recommend that we do not close our eyes on tech debt in our JS code, and aim for the same testability and coverage than with our python code. Of course, the JS lib will also be usable without Python, or with any server side language, as long as they can dump their adapter tree in JSON like the Python reference version.