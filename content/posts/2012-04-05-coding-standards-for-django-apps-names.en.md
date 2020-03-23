+++
date = "2012-04-05T08:01:00+00:00"
draft = false
tags = ["django", "best-practice"]
title = "Coding standards for Django apps: names"
author = "jpic"
+++

This post shows a coding standard which emerged from the Pinax community (formerly hot-club)[source needed] for predictive and consistent URL naming patterns. While this is still supported by Django, [namespaced URL `include()`](https://docs.djangoproject.com/en/1.8/intro/tutorial03/#namespacing-url-names) has been as well for some years now and urls should be translated when upgrading Django versions. [Django Contributing Commons](https://github.com/codingjoe/django-cc) maintains a technical description which you can reuse in your project. Check it out and try to contribute, this could be a nice community driven git based coding standards for Django !

Here goes, for history:

Naming stuff in Django apps consists of using:

 - the application name
 - a model name
 - an action name

#### Naming views

View names are composed of 2 items which are separated by an underscore:

 - the model name
 - the action name

Common cases are:

 - post_detail
 - band_create
 - user_list
 - group_delete

#### Naming urls, legacy

My standard is older that [namespaced urls](https://docs.djangoproject.com/en/dev/releases/1.1/#url-namespaces). It is composed of the following elements separated by an underscore:

 - app name
 - view name as above

For example:

 - blog_post_detail
 - band_band_create
 - auth_user_list
 - auth_group_delete

**band_band_create** ? Well if the url is for creating a Band model instance from the band app, so that's pretty self-documenting.

Prefixing url names with the application name was a very nice way of avoiding conflicts between url names.

#### Naming urls with namespaces

Since Django 1.1, this is not necessary anymore because of [namespaced urls inclusion](https://docs.djangoproject.com/en/dev/topics/http/urls/#topics-http-defining-url-namespaces). Instead of including your blog app urls as such:


{{< highlight  python>}}
    url(r'blog/', include('blog.urls')),
{{< / highlight >}}


And reversing as such:


{{< highlight  python>}}
    {% url 'blog_post_detail' post.pk %}
{{< / highlight>}}


You could include your blog app urls with the blog app namespace:


{{< highlight  python>}}
    url(r'blog/', include('blog.urls', app_name='blog'))
{{< / highlight>}}


Thus, if you named the post_detail view url just post_detail, there should be no conflict reversing as such:


{{< highlight  python>}}
    {% url 'blog:post_detail' post.pk %}
{{< / highlight>}}


Both are good as long at it is consistent per app.

#### Naming templates

Templates should live in an application-specific directory be named after their views. For example:

 - blog/post_detail.html
 - band/band_create.html
 - auth/user_list.html
 - auth/group_delete.html

#### Further reading

 - [good variable names](http://c2.com/cgi/wiki?GoodVariableNames)
 - [meaningful names](http://c2.com/cgi/wiki?MeaningfulName)
 - [system of names](http://c2.com/cgi/wiki?SystemOfNames)
