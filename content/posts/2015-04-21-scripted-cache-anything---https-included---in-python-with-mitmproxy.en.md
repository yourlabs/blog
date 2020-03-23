+++
date = "2015-04-21T10:28:17+00:00"
draft = false
tags = ["linux", "python", "security", "ci"]
title = "Scripted Cache AnyThing - HTTPS included - in Python with mitmproxy"
author = "jpic"
+++

The [last
article](http://blog.yourlabs.org/post/116296979953/scripted-mitm-anything-in-python-with-mitmproxy)
demonstrated how we could simply make any https flow going out a virtual
bridge network interface through mitmproxy to cache anything.

In this article, we'll focus on the logic to "cache anything" from within our
mitmproxy script.

### Design

We'd like each fetched file to be stored in a directory as is to make it easy
to tweak the cached content:

- remove a file from the cache directory to force the proxy to re-fetch it,
- fill the cache directory with your own files,
- have the cache directory mountable in a memory (ie. a tmpfs directory).

So, for example:

    # for apt
    http://http.debian.net/debian/pool/main/r/rtmpdump/librtmp-dev_2.4+20111222.git4e06e21-1_amd64.deb
    # would be:
    cache_directory/http.debian.net/debian/pool/main/r/rtmpdump/librtmp-dev_2.4+20111222.git4e06e21-1_amd64.deb

    # for pip
    https://pypi.python.org/simple/python-memcached
    # would be
    cache_directory/simple/python-memcached/index.html

    # for elasticsearch plugin installer
    https://github.com/mobz/elasticsearch-head/archive/master.zip
    # would be
    cache_directory/github.com/mobz/elasticsearch-head/archive/master.zip

We also want HTTP error codes to be reproduced. A quick hackish way to allow
our PoC to do that is to symlink the file to the error code. For example:

    # for apt
    http://debian.saltstack.com/debian/dists/wheezy-saltstack-2014-07/main/i18n/Translation-en.lzma
    # would be a symlink to the non-existent 404 file
    cache_directory/debian.saltstack.com/debian/dists/wheezy-saltstack-2014-07/main/i18n/Translation-en.lzma -> 404


### Implementation

So, we're going to implement:

- url to download path in the caching directory two-way conversion,
- convert urls ending with a slash to `/index.html`,
- be able to fix urls which are used without trailing slashes, but which
  the server will redirect to trailed-slash form (hello pip and pypi),
- serve static files from WSGI, with python's static module 

There you go:

<script src="https://gist.github.com/jpic/d8e163adcb9ace8d4c34.js"></script>

### Known bug

I've noticed that some times mitmproxy hangs during an `apt-get update`
call. I'm waiting for this to be reproducible again to debug it, but this
might have to do with the IP stack.

### Conclusion

It seems like all our tests are passing with this (our job matrix - deployment
of 13 major products - is still running at the time of writing).

I like this kind of solution because it's:

- easy to manage the cache directory, 
- fix quirks (ie.  pip/pypi trailing slash issue),
- have one single generic caching proxy which all developers can use,
- at the office, they are all using the same internet connection, so it matters
  a lot and is very efficient,
- we can build even if our internet connection is down, as long as no new
  dependency that is not cached is pulled in,
- if a new dependency is pulled in, and internet is down, then the developer
  may upload the package he's been using on the caching proxy and voila, it'll
  just work.

The downsides are:

- not sure how well mitmproxy scales so far, once my new CI server comes in
  we'll be able to run the 13 jobs in parallel and put it to a real test. If it
  doesn't scale so well then I'll have to find another way to do lazy SSL
  certificate generation or pre-generate them.
- it requires setting a couple of iptables rules and installing the root
  certificate in containers, which may be a bit hard for many users, but your
  test script can do that for them though.

I think I'm going to continue on this path to make an awesome generic caching
proxy for CI purposes.
