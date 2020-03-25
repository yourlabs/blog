+++
date = "2012-04-02T08:00:06+00:00"
draft = false
tags = ["linux", "python"]
title = "Distro-agnostic craftman’s guide to python environment management"
author = "jpic"
+++

This article demystifies deployment of Python applications on any unix flavor.
It’s distro agnostic approach is possible by a pragmatic use of each layer of a
standard python application.

This article targets system administrators and why not python developers as well?

#### Crafting python

Compiling Python is blazingly easy and fast, particularly for veteran php
system administrators !

First things first, to see the compile flags of an existing python
installation, the “sysconfig” module can be used:


{{< highlight bash>}}
    In [1]: import sysconfig

    In [2]: sysconfig.get_config_var('CONFIG_ARGS')
    Out[2]: "'--prefix=/usr' '--enable-shared' '--with-threads' '--enable-unicode=ucs4' '--with-system-expat' 'CFLAGS=-march=i686 -mtune=generic -O2 -pipe' 'LDFLAGS=-Wl,--hash-style=gnu -Wl,--as-needed'"
{{< / highlight>}}


Configuring sources from scratch just requires over reading the short —help
output, for example:


{{< highlight  bash>}}
    ./configure --enable-unicode=ucs4 --without-cxx --prefix=/tmp
{{< / highlight>}}


Of course, the —prefix argument is mandatory for proper environment management,
for example:

 - --prefix=$HOME/src/projectX/env
 - --prefix=/srv/projectX
 - --prefix=/tmp

In the last case, it installs the python executable in /tmp/bin, libraries in
/tmp/lib/python2.7/ and the initial package path is
/tmp/lib/python2.7/site-packages.

With a poor “Intel(R) Atom(TM) CPU N270 @ 1.60GHz” dual core, it compiles in 5 minutes.


{{< highlight  bash>}}
    make -j3  407.45s user 14.88s system 136% cpu 5:09.94 total
{{< / highlight >}}


#### Crafting setuptools

Setuptools provides the command line utility to install python package from any
sources.

Obviously, it depends on svn to install packages from svn repositories, from
git to install from git repositories and so on.

Installation is a no brainer again: downloading and running the egg file is a
matter of seconds.

Again, the —prefix option should be used as such:


{{< highlight  bash>}}
    sh setuptools-0.6c11-py2.5.egg --prefix=/tmp
{{< / highlight>}}


#### Crafting application specific dependencies

There are currently two cool ways to craft an application specific environment
with just python and setuptools:

 - buildout: ini configuration files, can build and configure external tools like nginx
 - virtualenv: simple python path wrapper, usable without a single command line

Buildout comes from the Zope tribe of the Python community, it great for very large deployments.
Virtualenv is easily usable and is sufficient in most cases, example usage:


{{< highlight bash>}}
    # install virtualenv
    /tmp/bin/pip install virtualenv

    # create an application specific environment
    /tmp/bin/virtualenv /srv/your_application/your_application_env

    # optionnaly symlink to a generic env path for later automation
    ln -sfn env /tmp/your_application/your_application_env

    # activate the application specific environment
    source /tmp/your_application/bin/activate
{{< / highlight>}}


Once the virtualenv is activated, anything done in the current python
environment affects /tmp/your_application/your_application_env. For example:

 - running “python” will spawn /tmp/your_application/your_application_env/bin/python
 - setuptools will install in /tmp/your_application/your_application_env/lib/python2.7/site-packages

It is time to install application specific dependencies:


    pip install -r /tmp/your_applications/requirements.txt


#### Automating virtualenv activation

It is cool to reduce risk of affecting wrong environments in the console by
automating virtualenv activation.

Instead of:


{{< highlight bash>}}
    $ cd /tmp/your_application
    $ source /tmp/your_application/your_application_env/bin/activate
    (your_application_env) $
{{< / highlight>}}


It is better to just do:


{{< highlight bash>}}
    $ cd /tmp/your_application
    (your_application_env) $
{{< / highlight>}}


With this .zshrc:


{{< highlight bash>}}
    function cd() {
        builtin cd $@; 
        if [ -f env/bin/activate ]
        then 
            . env/bin/activate
            . ~/.oh-my-zsh/themes/$ZSH_THEME.zsh-theme
            export RPROMPT="$RPROMPT%F{180}${PWD##*/}"
        fi 
    }
{{< / highlight>}}


#### Questions

 - Is it so easy to craft a custom environment in your favorite programming
language?
 - Would deployment be so easy if the package management tool wouldn’t support
installing directly from VCS servers?
 - What’s the benifit of crafting python environments compared to using distro
specific tools like apt-get?
