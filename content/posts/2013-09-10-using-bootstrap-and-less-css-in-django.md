+++
date = "2013-09-10T15:13:00+00:00"
draft = false
tags = ["python", "django", "git"]
title = "Using bootstrap and less css in django"
+++
### Overview

1. **Compile less in debug mode in the browser** for development. This enables your integrator to work faster and to view syntax errors reports in the browser and make development awesome.
2. **Use django-compressor** for production to pre-compile all your less into css and make performance awesome.
3. **Be able to reuse in your less scripts: bootstrap classes, variables**, etc, etc ... else what is less good for ? The problem is that you must get your compiler to compile both bootstrap and your own less scripts in the same run.


### Basic strategy at Django level

This is how your `site_base.html` template could contain:

    {% if debug %}
        <link rel="stylesheet" type="text/css" href="{% static 'autocomplete_light/style.css' %}" />
        <link href="{{ STATIC_URL }}bootstrap/less/bootstrap.less" charset="utf-8" type="text/less" rel="stylesheet">
        <script type="text/javascript">less = {}; less.env = 'development';</script>
        <script type="text/javascript" src="{{ STATIC_URL }}less.js" ></script>
    {% else %}
        {% compress css %}
        <link rel="stylesheet" type="text/css" href="{% static 'autocomplete_light/style.css' %}" />
        <link href="{{ STATIC_URL }}bootstrap/less/bootstrap.less" charset="utf-8" type="text/less" rel="stylesheet">
         {% endcompress %}
    {% endif %}

Ok, that's the ugly part: it's not very DRY ... but it does work really great. As you can see, you need the [debug context processor](https://docs.djangoproject.com/en/dev/ref/templates/api/#django-core-context-processors-debug).

This is how your settings could look like:

    COMPRESS_PRECOMPILERS = (
        ('text/less', 'recess --compile {infile} > {outfile}'),
    )

Note: bootstrap only compiled on recess less compiler when I did this. Maybe other compilers are supported nowadays but I wouldn't bet on it.

### Basic git strategy

To re-use bootstrap directly from their repo, use [git submodules](http://git-scm.com/book/en/Git-Tools-Submodules).

### Basic strategy at the less level

Suppose we create a `custom.less` script which should be able to re-use bootstrap stuff, ie. variables, classes, mixins and so on.

We now have a problem: the compiler must parse both bootstrap's stuff and `custom.less` at the same time. Else, how could the compiler know about bootstrap's variables when compiling `custom.less` ?

So, you could import `custom.less` in `bootstrap.less`, but that will cause a modification of a file outside your repo (remember: bootstrap.less comes from a submodule).

Solution: create a `master.less` which import both `bootstrap/less/bootstrap.less` and `custom.less`. Don't forget to link `master.less` instead of `bootstrap.less` in your `site_base.html`.