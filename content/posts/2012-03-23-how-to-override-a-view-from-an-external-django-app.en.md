+++
date = "2012-03-23T09:28:00+00:00"
draft = false
tags = ["django", "python", "best-practice"]
title = "How to override a view from an external Django app"
author = "jpic"
+++

This article describes how to override a view from an external Django app which is a FAQ on StackOverflow and IRC.

You should understand that your urls.py is a really central and critical part of your django project.

#### You don't touch external app code

You are **not** supposed to edit the code from an external app. Unless you **fork it first** on github.

#### How to override without forking

##### Overriding a template

If you want to override [templates/userena/activate_fail.html](https://github.com/bread-and-pepper/django-userena/blob/master/userena/templates/userena/activate_fail.html), then all you have to do is create your own `templates/userena` directory and make your own `activate_fail.html` in it.

##### Overriding a url

Probably the first thing you should check in an external app is [its urls.py](https://github.com/bread-and-pepper/django-userena/blob/master/userena/urls.py). Views that are properly coded should support plenty of arguments. For example, userena has a signup view with such a signature (at the time of writing):

<pre class="sh_python">
def signup(request, signup_form=SignupForm,
       template_name='userena/signup_form.html', success_url=None,
       extra_context=None):
</pre>

This means that you can replace the form used by the signup view. To do so, open your `urls.py`, add what we are going to need at the top:

<pre class="sh_python">
from userena import views as userena_views
from yourforms import YourSignupForm
</pre>

Then, find the include the external app's urls, something like:

<pre class="sh_python">
url(r'^userena/', include('userena.urls')),
</pre>

**Before** that, add your url override:

<pre class="sh_python">
url(r'^userena/signup/$', userena_views.signup, {'signup_form': YourSignupForm}, name='userena_signup'),
url(r'^userena/', include('userena.urls')),
</pre>

Now, your custom url definition will be the first to be hit when a visitor hits /userena/signup/. Which means that `/userena/signup/` will use `YourSignupForm` instead of userena's signup form.

This trick works with any view argument. The ones you should see the most often are:

 - `template_name`: lets you change the template name
 - `extra_context`: lets you add a dict that will be added to the context

Almost every view should have these arguments.

##### Overriding a view

Overriding a view requires to override the url of the view you want to replace. If you want your own signup view to be used, then just override the url:

<pre class="sh_python">
import yourviews

# ...
url(r'^userena/signup/$', yourviews.yoursignup, name='userena_signup'),
url(r'^userena/', include('userena.urls')),
</pre>

##### Decorating a view

Decorating a view is like overriding a view, but reuses the external app's view. Basically, it's the same than overriding a view (see above), but your view will look like this

<pre class="sh_python">
from userena import views as userena_views

def yoursignup(request):
    # do stuff before userena signup view is called

    # call the original view
    response = userena_views.signup(request)

    # do stuff after userena signup view is done

    # return the response
    return response
</pre>

#### Forking an app

If you are not familiar with pip and virtualenv first, please read [the post about using pip and virtualenv](/post/19725807220/django-pinax-virtualenv-setuptools-pip) first.

For example:

 - You installed django-userena as such: `pip install django-userena`
 - First you should uninstall it: `pip uninstall django-userena`
 - Then go on [the app's github page](https://github.com/bread-and-pepper/django-userena)
 - Click on the *fork* button
 - This will make you a repository with a copy of django-userena
 - Install it as such: `pip install -e git+git@github.com:your-username/django-userena.git#egg=django-userena`
 - Then you can edit the code in `yourenv/src/django-userena`
 - Push your commits

#### Credits

**lauxley** from #django@irc.freenode.net proofreaded this article.

Thanks !
