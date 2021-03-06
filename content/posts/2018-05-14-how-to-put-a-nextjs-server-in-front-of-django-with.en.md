+++
date = "2018-05-14T13:11:17+00:00"
draft = false
tags = ["python", "django", "nextjs", "react", "django-appwatch"]
title = "Put a nextjs server in front of django"
author = "jpic"
+++

![image](/img/2018-05-14-how-to-put-a-nextjs-server-in-front-of-django-with/b581253229bc5b47f5a8b4fb70f57a05f42b24d72d6cd5ae514d248cb2be38b8.png)

# How to put a NextJS server in front of Django with django-appwatch In this article, we'll get started on a new Django project with NextJS in front of Django. We choose to put NextJS in front of Django because NextJS is an isomorphic UI framework for React, that's pretty simple to use. \- Create your Django project as usual, \- Do in your repo: `yarn add next react` \- Install [django-appwatch](https://git.yourlabs.org/oss/appwatch) with `pip install django-appwatch`, \- Add appwatch to INSTALLED_APPS, \- Run command `manage.py appwatch pages:./pages` The appwatch command will watch the `pages/` subdirectories for each app, and build a pages directory aggregating them in the same way we have templates or static files. If you have added your project to `INSTALLED_APPS`, you can create a `pages/index.js` file in the project module, otherwise in an app that you include. The NextJS server will pick it up: `./node_module/.bin/next` will start the server on port 3000. If you also want to add a `components` subdirectory to Django apps for React components, mount them into the `./pages/components` dir so they will be importable from `./components` from within your page templates: `manage.py appwatch pages:./pages components:./pages/components`. As for what to code in Django, I highly recommend a [GraphQL endpoint](https://github.com/graphql-python/graphene-django/tree/master/examples/starwars). If you're making a generic frontend module, you could have connectors like Crudl.io which supports both DRF and GraphQL. As for the UI toolkit, we want to start a fork of Crudl.io based on NextJS and Material-UI soon, appwatch will do great to manage per app templates ;)
