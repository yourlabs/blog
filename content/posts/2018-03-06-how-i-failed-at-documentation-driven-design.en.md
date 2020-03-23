+++
date = "2018-03-06T16:11:09+00:00"
draft = false
tags = ["best-practice"]
title = "How I failed at documentation driven design"
author = "jpic"
+++

A small anecdote about one of my most recent failures ! Now it's up to me to be a better coder next time ;)

When I rewrote django-dynamic-fields into [facond](https://facond.readthedocs.org), I still had Form/Rule/Action/Conditions from ddf.

When the code got to the point where i was satisfied with it i wrote the tutorial. 

**This is how I figured this lib had just no need for the "Rule" component**.

Hopefuly, both python and js had serious unit test coverage, so I just removed the Rule stuff from Python and JS, changed all function signatures, and kept on fixing stuff until tests passed again. This strikes me: if i had started by writing the tutorial, I would not have wasted my time TDDing a component that I actually didn't need.

This kind of things would make me look silly in a retrospective right ? hahaha    
