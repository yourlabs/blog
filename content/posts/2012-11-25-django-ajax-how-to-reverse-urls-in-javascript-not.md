+++
date = "2012-11-25T16:07:00+00:00"
draft = false
tags = ["ajax", "django", "http", "api"]
title = "Django & ajax: how to reverse urls in javascript (not)"
+++
**IMPORTANT UPDATE**: the approach proposed in this article is bad. Read [this one](http://blog.yourlabs.org/post/36729349793/django-ajax-hateoas-how-to-reverse-urls-in) instead.

You can start building a user interface using Django's awesome CRUD in a matter of seconds, for example with just this server side configuration:

```
{{< highlight python>}}
    url(delete/(?P<pk>\d+)/$', 
        generic.DeleteView.as_view(model=YourModel),
        name='yourapp_yourmodel_delete'),
{{< / highlight >}}
```

<!--more-->

It doesn't matter how long you've been using Django, this kind of trick is always charming. When you have a deadline, you know you can get Django out of the way in a single line of code, and work on the templates.

A rich user interface might need to work with many Django views. It might even need to reverse urls like `yourapp_yourmodel_delete`, which take an argument in the regexp...

### Current solutions

- [django-js-utils](https://github.com/Dimitri-Gnidash/django-js-utils/) allows reversing urls from javascript, but requires to [expose](https://github.com/Dimitri-Gnidash/django-js-utils/blob/master/dutils.conf.urls.example.js) urls to everybody,
- it is also possible [create a reverse view](http://stackoverflow.com/questions/2724383/dry-urls-in-django-javascript) which javascript should call, but it requires one ajax request to generate a url.
- another user suggested that this same reverse view could respond directly with the result of the url, which might be a good idea after all.

### Working around having to reverse the regexp

A quick and easy way to do clear the way is to use the PkUrlKwarg mixin:

```
{{< highlight python>}}
    class PkUrlKwarg(SingleObjectMixin):
        """
        Take the pk from request.GET or request.POST and sets it to kwargs,
        useful to avoid fun reversing urls from javascript
        """
        def get_object(self, queryset=None):
            self.kwargs[self.pk_url_kwarg] = self.request.REQUEST['pk']
            return super(PkUrlKwarg, self).get_object(queryset)
{{< / highlight >}}
```

This will make `/update/?pk=123` to behave like `/update/123/`, eliminating the need to reverse urls:

```
{{< highlight python>}}
    # url
    url(r'tab/delete/$',
        login_required(TabDeleteView.as_view()),
        name='form_designer_tab_delete'),

    # view
    class TabDeleteView(PkUrlKwarg, TabSecurity, AjaxDeleteView):
        model = Tab
{{< / highlight >}}
```

### Blablablabla

Quite controversial isn't it ?

Django users know very the importance of clean, usable urls. I myself know how to write many urls to directly access a resource I often need. And that never is an edit url - except side-wide configuration for example `/configure/` which is also pretty simple and usable.

At most, there can be nice delete urls like this: `/blog/your-blog/delete/`. These kind of great urls are designed to be used by Humans, not by Javascript. Javascript just wants to make a standard XHTMLHttpRequest to the blog delete resource for blog pk=1234.

### Conclusion

- To be easily usable by Humans, your blog delete url should be: `/blog/your-blog/delete/`.
- To be easily usable by Javascript, your blog delete url should by `blogDeleteUrl + 'pk=1234'`.
