+++
date = "2012-12-03T12:30:43+00:00"
draft = false
tags = ["python", "documentation", "service"]
title = "Using rst for documentation on both GitHub and Sphinx/RTFD: code-block tip"
+++
Good documentation should be readable from source, and usable to generate fancy HTML. That's why RST is so commonly used:

- readable as text source,
- usable to generate HTML and even PDF
- GitHub knows how to render it,
- Sphinx and ReadTheDocs know how to render it.

Good documentation should often show code. This article demonstrates an inconsistency between RTFD and GitHub rendering, and how to fix it.

As far as sphinx is concerned, the default highlight language for code blocks is Python. This will render as Python on Sphinx/RTFD:

    Try this example code::

        do_something()

But on GitHub, this will render as plain, sad black text. To fix it, set `.. code-block:: python`:

    Try this example code:

    .. code-block:: python

        do_something()

This will enable the right syntax coloration on both GitHub ([example](https://github.com/yourlabs/django-autocomplete-light/blob/docs_rewrite/docs/source/cookbook.rst)) and RTFD ([example](https://django-autocomplete-light.readthedocs.org/en/docs_rewrite/cookbook.html)).

This works with [any language](http://pygments.org/languages/) ie.:

    Try this example python:

    .. code-block:: python

        do_something()

    Try this example html:

    .. code-block:: html

        <input type="text" />

    Try this example javascript:

    .. code-block:: js

        do_something()

### Credits

Thanks to jodal@#readthedocs for helping me debug my docs. Always check that it is rendered properly on GitHub before expecting good rendering on RTFD which is stricter.