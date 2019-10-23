+++
date = "2018-10-12T04:13:24+00:00"
draft = false
title = "clilabs: the Python CLI to get things done, with Django support"
+++
Sometimes I want to execute a python callback with some args on the command line, but i get frustrated that it always requires to wrap my command in a wrapper of some sort. Then, I want to do generic CRUD operations from the command line in my automation tool. [Clilabs](https://yourlabs.io/oss/clilabs) unfrustrates me.

Get started:

```
$ pip install clilabs
$ clilabs
clilabs automates python callables parametered calls.

Things starting with - will arrive in clilabs.context.

Examples:

    clilabs help your.mod:main
    clilabs debug your.mod -a --b --something='to see' how it=parses
    clilabs your.mod:funcname with your=args
    clilabs help clilabs.django
    clilabs clilabs.django:list auth.user
    clilabs +django:list auth.user  # also works
```

Moar in tutorial.md
