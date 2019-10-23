+++
date = "2012-09-19T00:36:00+00:00"
draft = false
title = "Handling relations between ZODB persistent objects, presentation of SubstanceD's pattern"
+++
[ZODB](http://zodb.org) is an object oriented database for Python, or "NoSQL" database. In one sentence it resumes as such:

> Don’t squeeze your objects into tables: store them in an object database.

It takes normal Python objects and make them persistent. ZODB has been there for more than ten years, it's mature, more than the new "NoSQL" stuff like CouchDB, MongoDB, etc, etc ... To be precise, it's been doing NoSQL ten years before NoSQL even existed !

And it's perfect for just python. So if you're looking for a NoSQL database for Python, or more precisely, if you're looking to store schemaless data in Python, then ZODB is likely to be the way to go.

Using ZODB as Django NoSQL backend requires quite some research, it is not something that has been tackled so much. There is [django-zodb](http://triveos.github.com/django-zodb/) but it doesn't support backwards (reverse) relations.

[SubstanceD](https://github.com/Pylons/substanced) is:
> A Zope2-like system built upon the Pyramid web application framework. It provides a user interface for managing ZODB content as well as libraries and utilities which make it easy to create applications.

Most importantly in our case, SubstanceD provides a simple and elegant way of handling relations between objects. This article attempts to describe how to reuse SubstanceD's low level relation manager.

It consists of 3 moving parts:

- [ReferenceSet](https://github.com/Pylons/substanced/blob/master/substanced/objectmap/__init__.py#L436), represents one type of relation, used to relate a target object id to a source object id,
- [ReferenceMap](https://github.com/Pylons/substanced/blob/master/substanced/objectmap/__init__.py#L402), is a registry of ReferenceSets,
- [ObjectMap](https://github.com/Pylons/substanced/blob/master/substanced/objectmap/__init__.py#L90), [maps object ids with actual objects](https://github.com/Pylons/substanced/blob/master/substanced/objectmap/__init__.py#L143),

SubstanceD uses integers as object ids, certainly for the integer specific optimizations. In most case, using integers for object ids is fine. However, if you want to use string object ids ie. UUIDs, to be able to relate objects across databases, then it takes a couple of modifications:

- change IF.BTree to OO.BTree,
- change IF.Set to OO.Set,
- change IO.BTree to OO.BTree,

Then, you can use ReferenceMap as such:

<pre class="sh_python">
    book1 = 'Book 1 UUID' # by Author 1 and Author 2
    book2 = 'Book 2 UUID' # by Author 2 only

    author1 = 'Author 1 UUID'
    author2 = 'Author 2 UUID' # has 2 books

    refname = 'authors_of_book' # name of the relation

    themap = ReferenceMap()

    # add to book1: author1 and author2
    themap.connect(book1, author1, refname)
    themap.connect(book1, author2, refname)

    # add to author2: book2
    themap.connect(book2, author2, refname)

    # book1 should have author1 and author2
    self.assertEqual(list(themap.targetids(book1, refname)),
            [author1, author2])

    # author1 should have book1
    self.assertEqual(list(themap.sourceids(author1, refname)), [book1])

    # author2 should have book1 and book2
    self.assertEqual(list(themap.sourceids(author2, refname)),
        [book1, book2])

    # book2 should have author2
    self.assertEqual(list(themap.targetids(book2, refname)),
            [author2])
</pre>

As you can see, relations are directional. This:

<pre class="sh_python">
    themap.connect(book1, author1, refname)
</pre>

Is different from:

<pre class="sh_python">
    themap.connect(author1, book1, refname)
</pre>

While this may seem like a problem at first, it is not a problem at a higher level, because you can:

- set book.authors,
- connect book to each author with a ReferenceMap,
- get authors of a book using book.authors,
- get books of an other through connections using ReferenceMap objects.

You should implement an ObjectMap that wraps that and handles UUIDs, but that's another (higher level) story.

Oh, I almost forgot to say:

- ZODB is great !
- Zope community supports ZODB as a standalone component !
- SubstanceD code looks really great !
- ZODB is great !

Credits to:

- Chris McDonough, author of SubstanceD
- supton#zope@irc.freenode.net
- #zope@irc.freenode.net
- #pyramid@irc.freenode.net