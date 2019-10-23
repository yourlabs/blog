+++
date = "2012-04-10T08:01:00+00:00"
draft = false
tags = ["django", "migrations"]
title = "Django schema migrations: nashvegas vs. South vs. evolution"
+++
Schema migration consists of altering a database structure. For example, adding
a column, an index ...

When creating a Django model, running the syncdb command can create the tables.
But syncdb doesn't support schema migrations. So when modifying a Django model,
reflecting the changes on to the database is left as an exercice for the
sysadmin.

### Django-extensions

If you don't speak fluent SQL, use the [sqldiff
command](http://packages.python.org/django-extensions/sqldiff.html) from
[django-extensions](http://packages.python.org/django-extensions/index.html).
It compares the database structure with the actual models for an app, and
output SQL migration code. Installing the sqldiff command is really easy:

 - run: pip install django_extensions
 - add to settings.INSTALLED_APPS: 'django_extensions'

Why doesn't django_extensions provide a command to directly apply the generated
SQL ?

 - it tries to force to actually read the SQL
 - adding a non null column to a table containing existing data is another problem

Don't forget to [document
migrations](https://github.com/eldarion/biblion/blob/multi-blog/CHANGELOG) in
the CHANGELOG file.

### Django-evolution

[django-evolution](http://code.google.com/p/django-evolution/) provides the
"evolve" command which basic usage is:

 - modify a model
 - check if it sees the modifications correctly: manage.py evolve --hint
 - apply the modifications on the database structure: manage.py evolve --hint --execute

django-evolution is great to learn about migrations because it's very easy to
use. The installation process is the same as for django_extensions mentionned
above, except that it has models so it requires to run syncdb after
installation. Note that you should not do model changes before
django-evolution's models are installed.

### nashvegas

[nashvegas](http://nashvegas.readthedocs.org/en/latest/) is slightly more
evolved. It allows for example to combine SQL and
python migrations. For example, if you add an "author" column to your Blog
model and want it set to your user by default, then you can combine SQL and
python for the same migration.

Nashvegas is as easy to install as any django app:

 - run: pip install nashvegas
 - add to settings.INSTALLED_APPS: 'nashvegas'

All nashvegas cares about is the files in a subdirectory of the project root
called "migrations". Each file is a migration, migrations are ordered by file
name: 0001_initial.sql, 0002_populate.py, 0003_add_column_foo.sql ...

To apply missing migrations with nashvegas, run:

    ./manage.py upgradedb -e

### South

[South](http://south.aeracode.org/) is the most advanced schema
migration available. It has a the highest [learning
curve](http://south.aeracode.org/docs/tutorial/index.html), and provides a lot
of features that might be out of the scope for daily usage, like rolling back a
migration. It may look like a good idea but if you have deadlines then it's
definitively better to pass temporarely on that solution.

South is also easy to install. For an app to be managed by south, a
subdirectory called "migrations" is created in it's root directory. Again, each
file in the "migrations" is a migration (duh!). The first migration is a
migration from 0 table to the initial structure. Creating it is takes a special
command line:

    ./manage.py schemamigration yourapp --initial

If the tables don't exist (ie. you haven't called syncdb yet or are ready to
drop the table), then you can apply it normally:

    ./manage.py migrate yourapp

But you can't do that if the tables already exist and that you don't want to
drop them. "[Converting an app to
south](http://south.aeracode.org/docs/convertinganapp.html#converting-an-app)"
is documented. Basically you have to "fake" the migration. "Faking" a
migration, is telling south that it's done, without actually doing any
modification to the database:

    ./manage.py migrate yourapp --fake

### More

There is also a [Django wiki page about schema
migrations](https://code.djangoproject.com/wiki/SchemaEvolution).
