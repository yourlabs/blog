+++
date = "2015-05-15T00:50:31+00:00"
draft = false
tags = ["ci", "saltstack", "travis-ci"]
title = "Testing SaltStack formulas on Travis-ci"
author = "jpic"
+++

[SaltStack](http://saltstack.com) is an [Open
Source](http://github.com/saltstack/salt)
[DevOp](http://en.wikipedia.org/wiki/DevOps) tool to automate administration of
a computer (server or desktop) infrastructure, typically but not limited to,
developing in-house [PaaS](http://en.wikipedia.org/wiki/Platform_as_a_service).
[Travis-ci](http://travis-ci.com) is an [Open
Source](https://github.com/travis-ci/travis-ci) [Continuous
Integration](http://en.wikipedia.org/wiki/Continuous_integration) platform and
online-hosted for [free for Open Source projects](http://travis-ci.org).

This article targets SaltStack formula developers who wants to have CI enabled
- and of course every SaltStack user should be a formula developer wanting CI.

## Overview

First things first, we have to test the [`/pillar.example` file located at the
top of the formula
repository](http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html#usage).
Unfortunately, it's not straightforward, I've [started a discussion on
salt-users](https://groups.google.com/forum/#!topic/salt-users/nm7LqA4RSQw) in
case we find a way to improve that.

So, we'll have to make a test pillar directory. Then, organise a [travis
configuration file](http://docs.travis-ci.com/user/build-configuration/) to run
our various states and check idempotence.

## Setting up the test pillar directory

This is the anatomy of our test pillar directory:

    test/
    test/pillar   -----------> Pillar used for tests
    test/pillar/top.sls  ----> Includes example only
    test/pillar/example.sls -> Symlink to /pillar.example

In our case, we're testing with the [`/pillar.example` file located at the top
of the formula
repository](http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html#usage).
The trick here is to include it in a `top.sls`.

So our `test/pillar/top.sls` contains:

    base:
      '*':
        - example

And we created the symlink with:

    [env] 15/05 2015 02:07:19 jpic@lue ~/work/novapost/rsyncd-formula () 
    ln -sfn ../../pillar.example test/pillar/example.sls 

Result:

    [env] 15/05 2015 02:07:19 jpic@lue ~/work/novapost/rsyncd-formula () 
    $ ls -l test/pillar/example.sls
    lrwxrwxrwx 1 jpic superadmin 20 May 15 02:07 test/pillar/example.sls -> ../../pillar.example

Now we have a test pillar directory including the example. Don't forget to add
the symlink to your git repo !

### `travis.yml`

Our humble testing plan is to test each state with the example pillar:

- Run `state.show_sls` to ensure that it parses properly and have some
  debugging output,
- Run `state.sls` to run the state we're on,
- Run `state.sls` again, capturing output, asserting that `^Not Run:` is not
  present in the output, because if it is then it means that a state cannot
  detect by itself whether it has to be run or not and thus is not idempotent.

Example:

<script src="https://gist.github.com/jpic/a9e2a3d869addd3be624.js"></script>

## Best practice

Note that we're not using anything like [serverspec](http://serverspec.org/) or
[envassert](https://pypi.python.org/pypi/envassert). In most case, it's not
worth mirroring the actual code in test code just for coverage. Rather, I
believe that each formula should install **and run** its healhchecks at the end
of each deployment in-place of a serverspec behaviour test.

## That's all folks !

As you can see, we have a [proper test matrix set
up](https://travis-ci.org/martinhoefling/rsyncd-formula/builds/62636375) !

Please let me know if there's anything we can improve.
