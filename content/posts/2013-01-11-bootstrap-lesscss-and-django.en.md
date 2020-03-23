+++
date = "2013-01-11T08:02:05+00:00"
draft = false
tags = ["django"]
title = "Bootstrap, lesscss and django"
author = "jpic"
+++

This article demonstrates how to have your own project-specific twitter-bootstrap fork, allowing you to change stuff in `variables.less` and other files. In development, lesscss is computed by the browser, with the less library in debug mode. In production, it relies on django-compressor.

In `site_base.html`:


{{< highlight html>}}
    {% if debug %}
        <link href="{{ STATIC_URL }}bootstrap/less/bootstrap.less" charset="utf-8" type="text/less" rel="stylesheet">
        <link href="{{ STATIC_URL }}bootstrap/less/responsive.less" rel="stylesheet">
        <script type="text/javascript">less = {}; less.env = 'development';</script>
        <script type="text/javascript" src="{{ STATIC_URL }}less.js" ></script>
    {% else %}
            {% compress css %}
            <link href="{{ STATIC_URL }}bootstrap/less/bootstrap.less" charset="utf-8" type="text/less" rel="stylesheet">
            <link href="{{ STATIC_URL }}bootstrap/less/responsive.less" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="{% static 'autocomplete_light/style.css' %}" />
            {% endcompress %}
    {% endif %}
{{< / highlight >}}


In `settings.py`:


{{< highlight python>}}
    COMPRESS_ENABLED = True
    COMPRESS_PRECOMPILERS = (
        ('text/less', 'recess --compile {infile} > {outfile}'),
    )
    COMPRESS_DEBUG_TOGGLE = 'debug'
{{< / highlight >}}


Note the usage of [twitter recess](http://twitter.github.com/recess/), which you can get by [npm](http://npmjs.org).

This is because we decided to fork from twitter bootstrap - ie. change stuff in variables.less and so on.
