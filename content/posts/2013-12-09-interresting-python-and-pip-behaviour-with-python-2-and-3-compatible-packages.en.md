+++
date = "2013-12-09T14:36:00+00:00"
draft = false
tags = ["python", "selenium", "pip"]
title = "Interresting Python and pip behaviour with Python 2 and 3 compatible packages"
author = "jpic"
+++

In this article we'll explore a gotcha with Python 2 and 3 support on the long run, using Selenium as an example.

Selenium is an automated testing tool enabling the tests to control a temporary browser GUI - Firefox by default. You can use it to automate functional testing.

Selenium 2.37 had Python 2 and 3 support. But a little before the 2.38 release, some non-Python3-compatible code [was commited](https://code.google.com/p/selenium/source/detail?r=93dc1284534330866). This was released in selenium 2.38 and the package was still registered as Python3-compatible.

So, installing selenium looked like this:

    $ pip install selenium
    Downloading/unpacking selenium
      Downloading selenium-2.38.1.tar.gz (2.5MB): 2.5MB downloaded
      Running setup.py egg_info for package selenium

    Installing collected packages: selenium
      Running setup.py install for selenium

          File "/tmp/foo/lib/python3.3/site-packages/selenium/webdriver/firefox/firefox_profile.py", line 226 
            print "(skipping) failed to json.loads existing prefernce:", matches.group(1), matches.group(2)
                                                                      ^
        SyntaxError: invalid syntax

    Successfully installed selenium
    Cleaning up...

It is interesting to note that:

- pip reports: Successfully installed selenium
- exit code was 0 (success)

But of course, running that selenium version on Python 3 would fail ie. with:

    ImportError: No module named 'httplib'

What happens is that pip doesn't know that this file is supposed to byte-compile to Python 3: pip allows to have Python 2 or 3 specific files in a package. Also, we're lucky to have a comment by one the world's top pip experts [Donald Stufft](https://github.com/dstufft) on this page (scroll down to read it).

As for Selenium, it's a story that ends well: [Luke Inman-Semerau](https://github.com/lukeis), contributed [Python 3 support is back in Selenium 2.38.3](https://code.google.com/p/selenium/source/detail?r=41441f8). 

FTR, upgrading to selenium 2.38.3+ is as easy as usual:

    pip install -U selenium

And I'll use this opportunity to thank all the Selenium and Pip contributors, keep up the good work !
