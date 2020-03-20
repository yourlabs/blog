+++
date = "2018-03-09T12:09:00+00:00"
draft = false
tags = ["python", "django"]
title = "Model in Django: not what you think they are"
+++
It's funny how my imagination was completely anihilated when I actually read django model field source code.

I thought a Django Model was dedicated to designing the database.

But a Model field **is not** a DB Field.
 
A Model field **has** a DB field, **and** a formfield method.

Unfortunnately, formfield is not changeable unless you override the method which means creating your own model field.

Also unfortunate, Model has no form() method like their fields have formfield() method.

Why ? Well I suppose a lot of people, like me before reading model source code, believe that models are supposed to define the database.

This belief was maybe made popular because django provides modelformfactory from **outside** the model, instead of having a model.form() method like model.field.formfield()?

Doesn't matter, adapters will fill the gap and clarify how things such as a model and a form work together in a much cleaner way.