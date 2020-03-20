+++
date = "2017-04-14T00:41:49+00:00"
draft = false
tags = ["django-autocomplete-light", "python", "django"]
title = "django-autocomplete-light 3.2.3 release"
+++
3.2.3 Two seriously good community contributed bugfixes

- [#799](https://github.com/yourlabs/django-autocomplete-light/issues/799): Support serializing UUIDs and add tests for models with UUIDs as PKs by [@blag](https://github.com/blag)
- [#826](https://github.com/yourlabs/django-autocomplete-light/issues/826): Prevent rendering of empty option on multi select by [@beruic](https://github.com/beruic)

Bravo !

Tests are passing reliabily these days. The code climate is pretty sunny to contribute patches. 

Help wanted on unit tests: there is a bunch of units and currently everything is tested together with selenium. This works but that means when we test django 1.8 to 1.12 (master, not passing) we need to run selenium much more (for each version) than if we had unit tests covering the code. It would make following up Python and Django versions easier.

Another thing you might want to know, is that during the last year YourLabs has been acting as a non profit sports club in France and has been making websites for free for people who have good projects to live from being themselves but no money to invest "hacking local economy".