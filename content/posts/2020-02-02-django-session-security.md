+++
date = "2020-02-02T13:33:37+00:00"
draft = false
tags = ["logout", "security","django"]
title = "Django-session-security 2.6.6"
+++
[ **Django-session-security** ](https://github.com/yourlabs/django-session-security) is an application which allows you to logout an authenticated user in the event of inactivity. This makes it possible to protect sensitive data visible on a browser when the user leaves his workstation.
This application can force logout after a time determined by the user.
  
<!--more-->  


**Why does this app event exist ?** Effectively, it would be easier to schedule a session closure after X minutes, but:  

- User should not have to log in again if session is closed and work is not finished.  
- in the same way if the user filled out a form when logging out, his work would be lost and he would have to reconnect.  

&nbsp;

--------------------------------------
### How does it work ?

-When the user loads a page, SessionSecurity middleware will set the last activity to now. The last activity is stored as datetime in ```request.session['_session_security']```

-To avoid having the middleware update that last activity datetime for a URL, add the url to settings. _SESSION_SECURITY_PASSIVE_URLS_.  

&nbsp; 

```
PASSIVE_URLS = getattr(settings, 'SESSION_SECURITY_PASSIVE_URLS', [])
```  
&nbsp;  

- Before the session disconnects, ```SESSION_SECURITY_WARN_AFTER``` sends an alert message to the user to notify him of the upcoming closure. For exemple : "_Your session is about to expire, move the mouse to extend it_".  

- When the user moves mouse, click, scroll or press a key, SessionSecurity will save the DateTime as a JavaScript attribute. It will send the number of seconds since when the last user activity was recorded to PingView, next time it should ping.  
  

- Before displaying this warning, **SessionSecurity** will upload the time since the last client-side activity was recorded. The **middleware** will take it if it is shorter than what it already has - ie. another more recent activity was detected in another browser tab. The **PingView** will respond with the number of seconds since the last activity - all browser tab included.  

-If there was no other, more recent, activity recorded by the server: it will show the warning. Otherwise it will update the last activity in javascript from the **PingView** response.  


-Same goes to expire after settings.```SESSION_SECURITY_EXPIRE_AFTER``` seconds. Javascript will first make an ajax request to PingView to ensure that another more recent activity was not detected anywhere else, in any other browser tab.  

-----------------------------------------  

```
EXPIRE_AFTER = getattr(settings, 'SESSION_SECURITY_EXPIRE_AFTER', 600)
WARN_AFTER = getattr(settings, 'SESSION_SECURITY_WARN_AFTER', 540)
```
-------------------------------------------  

### Quick setup  

Install the package:

```
pip install django-session-security
# or the development version
pip install -e git+git://github.com/yourlabs/django-session-security.git#egg=django-session-security
```  
&nbsp;  

For static file service, add to ```settings.INSTALLED_APPS:```  

```
'session_security',
```  
&nbsp;  

Add to ```settings.MIDDLEWARE_CLASSES```, after django’s **AuthenticationMiddleware**:  

```
'session_security.middleware.SessionSecurityMiddleware',
```  

&nbsp;  

Ensure ```settings.TEMPLATE_CONTEXT_PROCESSORS``` has:  

```
'django.core.context_processors.request'
```  
&nbsp;  

Add to urls:  
   

```
url(r'session_security/', include('session_security.urls')),
```  

At this point, we’re going to assume that you have django.contrib.staticfiles working. This means that static files are automatically served with runserver, and that you have to run collectstatic when using another server (fastcgi, uwsgi, and whatnot). If you don’t use django.contrib.staticfiles, then you’re on your own to manage staticfiles.

After jQuery, add to your base template:  

```
{% include 'session_security/all.html' %}
```  
------------------------------------  

**Requirements**  

- Python 2.7 or 3.5+
- jQuery 1.7+
- Django 1.8 to 2.0
- django.contrib.staticfiles or #YoYo

------------------------


