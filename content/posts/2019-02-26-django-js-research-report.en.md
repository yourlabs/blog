+++
date = "2019-02-26T20:20:37+00:00"
draft = false
tags = ["python", "django", "best-practice", "npm", "nodejs", "js"]
title = "Django & JS research report"
author = "jpic"
+++

This article aims to report the current state of research about dealing with both JS and Django, for people that aim to primarly deal with Django and enjoy the same workflow they have with python package with their frontend development, and find patterns to connect them while keeping them loosely coupled at whatever limit feels right for them. Nuff said, let's hack !

[crudlfap](https://gitpitch.com/yourlabs/crudlfap#/12) relies on django-webpack-loader, which does its job very well. Also maintaining an [override in production project](https://github.com/betagouv/mrs/blob/master/src/mrs/static/js/crudlfap.js) which works in pure webpack.

Wether you want to use webpack or not is a purely existential question of "where to draw the line exactly". But Djangonauts have a lucky win of "not my problem" /because/ [django-webpack-loader](https://github.com/owais/django-webpack-loader/) does it so well: even supporting bleeding edge webpack features such as code splitting.

The blatant problem with both crudlfap and mrs repositories is that the js files - which live in the js environment that node provides the ecosystem for - are not well splited into different apps: both repos have a directory, [js](https://yourlabs.io/oss/crudlfap/tree/master/js) and [mrs/static/mrs (*super confusing file tree*)](https://github.com/betagouv/mrs/tree/master/src/mrs/static).

Note how confusing it gets when both their own dev command: [crudlfap](https://yourlabs.io/oss/crudlfap/blob/master/src/crudlfap/management/commands/dev.py) and [mrs](https://github.com/betagouv/mrs/tree/master/src/mrs/management/commands/dev.py). The two purpose of this dev command is automation of migrate and runserver in a row of course but especially to run the node environment watch script.

At the end of the day we're dealing with two blatant debt points that could have low cost solutions:

- generate a source directory for the js ecosystem from plugins and installed apps,
- have the development command run the server and start the js ecosystem watch script.

So, currently [django-collectdir](https://yourlabs.io/oss/django-collectdir) addresses the first problem. It could solve the other problem by adding a runserver command that would also run the watch command in a forked process.

There is definitely still a beautiful hack to mine, hope this little writeup will help you narrow it down.

Have a beautiful day

With LOVE
