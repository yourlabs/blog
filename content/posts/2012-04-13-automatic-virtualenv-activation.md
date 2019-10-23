+++
date = "2012-04-13T08:02:00+00:00"
draft = false
tags = ["virtualenv", "python"]
title = "Automatic virtualenv activation"
+++
This article proposes a proven standard which enables automatic virtualenv activation.

### Demonstration

Before, I had to do something like:

```
{{< highlight bash>}}
    cd myproject
    source ../env/bin/activate
{{< / highlight>}}
```

Now I just do:

    cd myproject

### Virtualenv standard

Say I have a project called projectX, you could expect to find it as such on my servers:

```
{{< highlight bash>}}
    /srv
        /projectX_prod
        /projectX_test
        /projectX_dev
            /projectX_dev_env -> the virtualenv
            /env -> symlink to projectX_dev_env
            /main -> the checkout of the python project
{{< / highlight>}}
```

As you can see, it is easy and consistent. For the record, this is the command I use to create the symlink:

```
{{< highlight bash>}}
    cd /srv/projectX_prod
    ln -sfn projectX_dev_env env
{{< / highlight >}}
```

### Shell hack

Usually, when I want to hack a project, it starts with:

    cd /srv/projectX_dev

Or even:

    cd /srv/projectX_dev/main

I know that this is always how it will start. So I added a hack in my shell init script to enable the corresponding virtualenv automatically. It is pretty self explanatory, so you should be able to hack it easily:

```
{{< highlight bash>}}
    function cd() {
        builtin cd "$@";
        if [ -f env/bin/activate ]
        then
            source env/bin/activate
        elif [ -f bin/activate ]
        then
            source bin/activate
        elif [ -f ../env/bin/activate ]
        then
            source ../env/bin/activate
        fi 
    }
{{< / highlight>}}
```
