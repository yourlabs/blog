+++
date = "2020-10-27T13:37:00+00:00"
draft = false
tags = ['devops', 'docker', 'docker-compose', 'ansible', 'podman', 'buildah']
title = "Shlax Container Image Builder: Preview"
author = "jpic"
+++

In a world where Dockerfiles, docker-compose.yml files, ansible files, and
others compete for my attention against tech debt in projects that become a bit
complex: I decided to make a Python micro framework to make it as nice to build
an infra as I think it is to build a CRUD with Django.

Shlax is meant to be a multi purpose automation framework, where logic to
acheive a certain state can be easily shared accross container building, host
provisioning, infrastructures with virtual systems and networks. Most of it is
not production ready yet, but the container building part seems to get me the
best I can get:

- Distribution package host caching
- Python and NodeJS host caching

No more waiting for all packages to download again, I'm not always near my
[local mirrors](https://yourlabs.org/posts/2020-03-16-arch-and-alpine-yourlabs-mirrors/)

I also like that Shlax mounts user home pip and npm cache directories inside
the containers so that the cache is shared with my localhost.

## Demo

You can play with :

    git clone https://yourlabs.io/oss/shlax.git
    cd shlax
    pip3 install -e .[test,cli]
    ./shlaxfile.py build
    py.test -sv tests

## Caching walkthrough

The container build recipe looks like this:

```py
shlax = Container(
    build=Buildah(
        Packages('python38', 'buildah', 'unzip', 'findutils', upgrade=False),
        Copy('setup.py', 'shlax', '/app'),
        Pip('/app'),
        base='quay.io/podman/stable',
        commit='shlax',
    ),
)
```

This is what it looks like on my machine with cache hits:

![2020-10-27-173154_1342x200_scrot](https://user-images.githubusercontent.com/94636/97332928-4a358e80-187b-11eb-91e3-10e451892214.png)

Maybe should silent errors in the "Invalidating old layers" code.

So if I change the above build script to add the "most" package it will invalidate all layers:

![2020-10-27-172742_1434x341_scrot](https://user-images.githubusercontent.com/94636/97332478-ca0f2900-187a-11eb-9a29-4e992dd9f54a.png)

But reuse the local package cache (what a relief ..):

![2020-10-27-173502_1412x802_scrot](https://user-images.githubusercontent.com/94636/97333275-aef0e900-187b-11eb-93da-fb536fc0343a.png)

Same story of course with a python package, for example adding the "django" package will make the build start from the Pip layer:

![2020-10-27-173858_1435x240_scrot](https://user-images.githubusercontent.com/94636/97333797-3b9ba700-187c-11eb-951a-c0e904e3f373.png)

But it won't hit the network because it shares the same cache as my local pip command which is shared with the Pip action, you can see how it commits the layer at the end:

![2020-10-27-173958_1427x623_scrot](https://user-images.githubusercontent.com/94636/97333915-6423a100-187c-11eb-9514-b6328537577c.png)

And cleaner code which proceeds to umounts of mounts made by different actions, and commit:

![2020-10-27-174023_1146x315_scrot](https://user-images.githubusercontent.com/94636/97334023-81586f80-187c-11eb-870b-97387f520f45.png)
