+++
date = "2013-02-15T12:30:26+00:00"
draft = false
tags = ["python", "vim"]
title = "Jedi-vim/rope takes too long"
+++
For those [using](https://github.com/jpic/dotfiles/tree/master/bundle) [jedi-vim](https://github.com/davidhalter/jedi-vim) are indirectly using [rope](http://rope.sourceforge.net/) refactoring library.

If you are also using a home-level virtualenv ie. in `~/env/` then your vim instance might take crazy long time.

First things first, rope creates a `.ropeproject` directory where it thinks the project root is. And it will scan every file in every sub directory. A quick and dirty solution is to create empty `.ropeproject` folders lower in the `$HOME` filesystem. Rope will automatically use this folder if it finds no other `.ropeproject` folder at a lower level.

But, if you want a home-level `.ropeproject`, then you should configure `~/.ropeproject/config.py`. It is well commented, you might end with something like this:

    # Custom source folders:  By default rope searches the project
    # for finding source folders (folders that should be searched
    # for finding modules).  You can add paths to that list.  Note
    # that rope guesses project source folders correctly most of the
    # time; use this if you have any problems.
    # The folders should be relative to project root and use '/' for
    # separating folders regardless of the platform rope is running on.
    # 'src/my_source_folder' for instance.
    prefs['source_folders'] = ['env/src']

    # You can extend python path for looking up modules
    prefs['python_path'] = '/home/jpic/env/lib/python2.7/site-packages/'
