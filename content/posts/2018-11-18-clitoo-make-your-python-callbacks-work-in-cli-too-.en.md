+++
date = "2018-11-18T12:44:19+00:00"
draft = false
tags = ["python", "best-practices"]
title = "clitoo: make your python callbacks work in CLI too !"
+++
[Clitoo](https://yourlabs.io/oss/clitoo) makes your python callbacks work on CLI too !

This CLI can execute python callbacks with parameters.

[Clitoo](https://yourlabs.io/oss/clitoo) recognizes 4 types of command line arguments:

- lone arguments are passed as args
- arguments with = are passed as kwargs
- dashed arguments like -f arrive in context.args
- dashed arguments like -foo=bar arrive in context.kwargs

It doesn't matter how many dashes you put in the front, they are all removed.

To use the context in your callback just import the clitoo context::

    from clitoo import context
    print(context.args, context.kwargs)

Clitoo provides 2 builtin commands: help and debug. Any other first argument will be considered as the dotted path to the callback to import and execute.

Examples:

- `clitoo help your.mod.funcname`: Print out the function docstring.
- `clitoo debug your.func -a --b --something='to see' how it=parses`: Dry run of your.mod with arguments, dump out actual calls.
- `clitoo your.mod.funcname with your=args`: Call your.mod.funcname('with', your='args').


$ clitoo debug your.func -a --b --something='to see' how it=parses
Could not import your.func nor your.func
Args: ('how',)
Kwargs: {'it': 'parses'}
Context args: ['a', 'b']
Context kwargs: {'something': 'to see'}


Get started today with pip install clitoo !