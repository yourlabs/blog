+++
date = "2012-11-02T09:27:44+00:00"
draft = false
tags = []
title = "django-autocomplete-light 1.1.0 is out, beware the backward compatibility break in templates !"
author = "jpic"
+++

The [previously announced backward compatibility break](http://blog.yourlabs.org/post/34262567559/upcoming-backward-compatibility-break-in), although minor, has been released.

So don't do pip update -U django-autocomplete-light **unless** you're ready to change <divs> to <span class="div"> in your autocomplete_light templates overrides (actually, that might not even be necessary now that I think of it).

You've been warned !
