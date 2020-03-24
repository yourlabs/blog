+++
date = "2015-06-25T01:14:51+00:00"
draft = false
tags = ["saltstack", "ci"]
title = "Test Driven Development with SaltStack SLS code"
author = "jpic"
+++

Getting started with [SaltStack](http://saltstack.com) usually means piling up a bunch of YAML code templated with Jinja in a source code repository because that's the way to go from the documentation's point of view. With significant whitespace, YAML enables even non-developers to define data structures in non verbose way. Jinja2 is a templating engine which enables a non-developer to make YAML files dynamic, typically depending on variables. However, Jinja2 hasn't significant whitespace and this can decrease readability of YAML templates. And since YAML and Jinja2 are two different languages in the same file, there is no readable way to ident code. Not to mention that Jinja2, as a template language rather than a programing language, has a pretty limited subset of operators.

### A kitten dies somewhere in the world when you read this example

Consider this trivial example where we generate states in YAML + Jinja2 to add
or remove groups defined in a pillar variable.

<script src="https://gist.github.com/jpic/4a397a068e78cf3c2f53.js"></script>

The readability issue with mixing two languages in the same code script is demonstrated in the groups.sls example above. Mixing two languages requires mixing two different indentation logics and results in really confusing code.
Automating quality assurance for the above code isn't impossible, but we don't have any tool yet to test and lint this kind of spaggetti code.

Exercise to the reader: the above example being only one module call given a pillar variable, imagine what the code to generate a bunch of related states using a bunch of related variables would look like in YAML + Jinja2.

### Salt's py renderer and py.test to the rescue

Salt can render Python scripts to SLS using the [py SLS renderer](http://docs.saltstack.com/en/latest/ref/renderers/all/salt.renderers.py.html) which enables:

- Python's language constructs (up to OOP if needed),
- Python functions to return several module calls,
- Test-first development with py.test.
- Python's quality assurance tools (flake8, coverage ...).

All this without installing anything else than py.test to run tests. This example SLS was made in full TDD:

<script src="https://gist.github.com/jpic/51e1545aff67d5f451e3.js"></script>

Testing the run function which decides which variables to call the python functions with using the environment's pillar is left as an exercise for the reader.
