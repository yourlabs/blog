+++
date = "2018-09-29T04:25:22+00:00"
draft = false
tags = ["playlabs", "linux", "python", "ansible", "best-practice"]
title = "playlabs: 30 seconds overview"
author = "jpic"
+++

Quick version of the previous article on playlabs


$ playlabs 
Playlabs: the obscene ansible distribution.

Init your ssh user with your key and secure sshd and passwordless sudo:

    playlabs init root@1.2.3.4
    # all options are ansible options are proxied
    playlabs init @somehost --ask-become-pass

Now your user can install roles:

    playlabs install docker,firewall,nginx @somehost

And deploy a project, examples:

    playlabs @somehost deploy image=betagouv/mrs:master
    playlabs @somehost deploy
        image=betagouv/mrs:master
        plugins=postgres,django,uwsgi
        backup_password=foo
        prefix=ybs
        instance=hack
        env.SECRET_KEY=itsnotasecret
    playlabs @somehost deploy
        prefix=testenv
        instance=$CI_BRANCH
        image=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

If you have that work, creating an inventory is the way to move on, wether you
want to version configuration, add a deploy user for your CI, configure a
secret backup password, add ssh-keys ...:

    playlabs scaffold ./your-inventory


See the [example inventory that scaffold creates for you](https://yourlabs.io/oss/playlabs/tree/master/playlabs/inventory_template) but in my opinion the most [obscene part is plugins](https://yourlabs.io/oss/playlabs/tree/master/playlabs/plugins).
