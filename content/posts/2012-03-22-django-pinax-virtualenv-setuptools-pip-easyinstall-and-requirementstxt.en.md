+++
date = "2012-03-22T08:50:00+00:00"
draft = false
tags = ["django", "pinax", "python", "virtualenv", "best-practice"]
title = "Django, Pinax, virtualenv, setuptools, pip, easy_install and requirements.txt"
author = "jpic"
+++

This article describes how to build project dependencies with virtualenv. It is appliable to [Pinax](http://pinaxproject.com/).
Pinax uses [virtualenv](http://pypi.python.org/pypi/virtualenv) by default. It lets the developer have a project-specific python directory, including binaries, packages etc … OpenSuse for example supplies very bad Pinax packages which allows the user to mess with his operating system. It is much better to isolate project dependencies from a project to another for more granular control of the maintenance cost; for example if a package upgrade breaks the user project.

[pip](http://pypi.python.org/pypi/pip) installs python packages, it replaces easy_install. It is recommanded for Django and Pinax development because it is more flexible and natively supports requirement scripts. pip is complementary with virtualenv, and it is encouraged that you use virtualenv to isolate your installation.

A working toolchain (particularely gcc, glibc, binutils) is needed for python modules implemented in C, like mysql-python module.

#### Virtualenv usage

Use the virtualenv command to create a virtualenv as such:

    virtualenv my_env_name

Activate a virtualenv as such:

    source my_env_name/bin/activate.sh

Now your "python" command should be the one from my_env_name/bin/python. And every package you install with the virtualenv activated will install in the virtualenv and not mess with the OS.

If you want to avoid conflicts with the system-wide site-packages, you might as well use the (*update*: now default)`--no-site-packages` option to create the virtualenv.


{{< highlight  sh >}}
    Pip
    Usage
    pip help
    Usage: pip COMMAND [OPTIONS]

      # [snip]

      bundle: Create pybundles (archives containing multiple packages)
      download: Download packages
      freeze: Output all currently installed packages (exact versions) to stdout
      help: Show available commands
      install: Install packages
      unzip: Unzip individual packages
      zip: Zip individual packages
{{< / highlight>}}


#### Simple package installation

Install the latest django-extensions release in the virtualenv:

    pip install django-extensions

#### Simple package upgrade

The pip install command option to upgrade a package in the virtaulenv:

    -U, --upgrade         Upgrade all packages to the newest available version

Upgrade to the latest django-extensions release in the virtualenv:

    pip install -U django-extensions

#### Simple package installation from a VCS

The pip checkout option:

    -e VCS+REPOS_URL[@REV]#egg=PACKAGE, --editable=VCS+REPOS_URL[@REV]#egg=PACKAGE
                            Install a package directly from a checkout. Source
                            will be checked out into src/PACKAGE (lower-case) and
                            installed in-place (using setup.py develop). You can
                            run this on an existing directory/checkout (like pip
                            install -e src/mycheckout). This option may be
                            provided multiple times. Possible values for VCS are:
                            svn, git, hg and bzr.

For example, to install Django trunk:

    pip install -e git+git://github.com/django/django#egg=django

The “egg” argument is required, but the user is free to use whatever name it judges good. The most important is to keep egg names unique per package.

By default, pip will checkout in your my_env_name/src/egg_name directory, and run setup.py install in the resulting directory.

It is important to hardcode the revision that the project needs in the requirements file, ways and reasons to do it are explained in the next section of this article.

#### Requirements file

    pip help install
    Usage: pip install [OPTIONS] PACKAGE_NAMES...

      # [snip]

      -r FILENAME, --requirement=FILENAME
                            Install all the packages listed in the given
                            requirements file.  This option can be used multiple
                            times.

Basically, pip will prefix each line of the requirements plain text file with “pip install “. Consider this example requirements.txt:

    --find-links=http://pypi.pinaxproject.com

    django-email-confirmation==0.1.3
    django-mailer==0.1.0
    django-announcements==0.1.0
    django-pagination==1.0.5.1

Running:

    pip install -r requirements.txt

Is equivalent to making a shell script with:

    pip install --find-links=http://pypi.pinaxproject.com
    pip install django-email-confirmation==0.1.3
    pip install django-mailer==0.1.0
    pip install django-announcements==0.1.0
    pip install django-pagination==1.0.5.1

Pinax copied requirements.txt to your project root when cloning a project. Now it uses requirements/project.txt. Each additionnal package that you install should be appended to requirements/project.txt. It is easier to run pip install -r requirements.txt than to install all dependencies manually, or using svn:externals or git submodules.

It is important to specify the version of each package because it is common to break backward compatibility in the Python world. It is important to add “barpack==1” instead of just “barpack” in requirements.txt pf a project depends on function barfunc provided by barpack version 1, because installing “barpack” later might install version 1.1 which might break backward compatibility. Hardcoding versions in the requirements file works around backward compatibility breaks. It allows granular deployement and maintenance resource management.

#### Use case: Django release upgrade for Pinax

Pinax 0.9 ships a dependency to Django 1.3.1. Django 1.2 for example should be upgraded through pip if the project requires it. The pip install command option to upgrade is -U:

    pip install -U django==1.3.1

#### Use case: install and develop from your branch of an app

The pip install option for checkout (-e) is convenient for development because it installs the package in the env/src directory in which you can edit the code, push commits and so on.

For example:

    pip install -e hg+ssh://hg@bitbucket.org/jpic/django-authority/#egg=django-authority
    cd env/src/django-authority

Any change done in env/src/django-authority is directly useable in the virtualenv and by mercurial in that case, making development convenient.

The requirements file should be set up normally:

- without --no-install
- with a hardcoded revision identifier.

#### Credits

Thanks **Brian Rosner** shared his experience on the #pinax channel.
