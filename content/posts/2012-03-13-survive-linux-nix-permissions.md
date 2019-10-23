+++
date = "2012-03-13T17:23:00+00:00"
draft = false
tags = []
title = "Survive linux (*nix) permissions"
+++
It is common for junior developers and system administrators to be blocked
because of permissions. This article describes how to identify and fix a
permission issue, as this is a FAQ on StackOverflow.

#### Identifying permission issues

Here a self explaining case, probably the easiest, which happens when trying to
access something which is directly blocked by the lack permissions:

    >>> mkdir /mnt/foo
    mkdir: cannot create directory `/mnt/foo': Permission denied

Now a more obscure cases. In this example, "james" is the owner of the hello
file and thus should be able to read and write it:

    <<< root@germaine!10017 env
    >>> ls -l /mnt/foo/bar 
    total 0
    -rw-rw-r-- 1 james james 0 2012-03-12 09:55 hello

But it "doesn't work":

    <<< james@germaine!10018 env
    >> cat /mnt/foo/bar/hello
    Cat: /mnt/foo/bar/hello: Permission denied

If you know the solution to this problem then you can probably skip this
article. Else, click "read more".

#### A little theory

There are three basic permission bits. It is important to fully understand
their roles on the file system and particularly for folders as it is pretty
obvious for files.

Each of this three basic permission bits can be set for three different actors:

 - the owner of the file/directory
 - a member of the group which owns the file/directory
 - everybody

Three basic bits per three actors, that's nine basic permission bits that can
be displayed by ls -l:

    >>> ls -l /tmp | grep test
    drwxr-x--x 2 root    admins        4096 2012-03-12 10:18 test

The first character, 'd', indicates that the kind of the file /tmp/test is a
directory - remember that everything is a file on unix ? well directories are
files too.

The next three characters, 'rwx', show the permission bits for the owner, root. The
owner has read, write and execute bits set.

The next three characters, 'r-x', show the permission bits for the group, admins. The
group has read and execute permission bits set but not the write permission bit
which is represented by a dash placeholder: -
This means that any member of the group 'admins' can enter the directory and
read the list of files (names, sizes, permissions, etc, etc) that are in there.

The last three characters, '--x', indicate that everybody has the permission to
traverse the directory. A non root, non member of 'admins', can enter the
directory, but not read the list of files in it.

##### On files

 - r: open a file for reading (e.g. with the cat command)
 - w: write a file (e.g. use sed -i (inplace) on it)
 - x: execute a file

It is important to note that a script can be executed even by a user who
doesn't have the execute permission on it. Passing a python script path to the
python executable will cause python to open the file for reading and then
interpret it. So it is not safe to rely on the executable permission for
security. This goes for php, perl, ruby, javascript, etc, etc ... e.g.:

    <<< root@germaine!10028 E:1 env
    >>> ./hello.sh
    zsh: permission denied: ./hello.sh
    <<< root@germaine!10029 E:126 env
    >>> sh hello.sh 
    hello

##### On folders

 - r: read **only the names** of the files in the directory
 - w: create and **delete** of the files in the directory
 - x: **traverse** the directory

The last one is can be particularly useful for security. Here is an example of
how 'james' can enter /tmp/test, but cannot read the files in that directory:

    <<< james@germaine!10035 env
    >>> ls -l /tmp | grep test
    drwxrwx--- 2 root    root        4096 2012-03-12 10:18 test
    <<< james@germaine!10035 env
    >>> cd /tmp/test 
    cd:cd:1: permission denied: /tmp/test
    <<< james@germaine!10036 env
    >>> sudo chmod +x /tmp/test 
    >>> ls -l /tmp | grep test
    drwxrwx--x 2 root    root        4096 2012-03-12 10:18 test
    <<< james@germaine!10037 env
    >>> cd /tmp/test 
    <<< james@germaine!10038 env
    >>> ls
    ls: cannot open directory .: Permission denied

#### Fixing permission issues

Back to our little problem, where root gave permission of /mnt/foo/bar/hello to
james, but james can't access it:

    <<< root@germaine!10017 env
    >>> ls -l /mnt/foo/bar 
    total 0
    -rw-rw-r-- 1 james james 0 2012-03-12 09:55 hello

    <<< james@germaine!10018 env
    >> cat /mnt/foo/bar/hello
    Cat: /mnt/foo/bar/hello: Permission denied

To find the source of the problem, check that the user has read and execute
permissions for each directory in the path, that is /mnt, /mnt/foo,
/mnt/foo/bar in the case of /mnt/foo/bar/hello. For example:

    <<< root@germaine!10024 E:1 env
    >>> ls -l /mnt | grep foo
    drwxr-x--- 3 root root 4096 2012-03-12 09:55 foo

See that /mnt/foo is owned by user root and group root (known as "root:root").
Thus, james cannot get into that directory. There are several solutions:

 - change /mnt/foo group to a group james is member of
 - add the executable bit to everybody on that directory

#### Changing to executable bit to everybody

Let's add the executable bit to everybody on /mnt/foo:

    <<< james@germaine!10041 env
    >>> sudo chmod +x /mnt/foo 
    <<< james@germaine!10042 env
    >>> ls -l /mnt | grep foo
    drwxr-x--x 3 root root 4096 2012-03-12 09:55 foo

User james can now enter that directory:

    <<< james@germaine!10043 env
    >>> cd /mnt/foo 
    <<< james@germaine!10043 env
    >>>

Now to check if james can read the hello file:

    <<< james@germaine!10047 env
    >>> cat /mnt/foo/bar/hello
    cat: /mnt/foo/bar/hello: Permission denied

Still no luck. Let's check the permissions for /mnt/foo/bar now:

    <<< root@germaine!10048 env
    >>> ls -l /mnt/foo/ | grep bar
    drwxr-x--- 2 root root 4096 2012-03-12 09:55 bar

Can you spot the problem ? james is not root, neither in group root, so the
permissions for everybody apply and there are none: '---'.

#### Changing the group of a directory

Let's say that james should be allowed to enter that directory and read its file
list, but not everybody. The solution is to change the owner group to a group
james is member of:

    >>> id james
    uid=1000(james) gid=1000(james) groups=1000(james),4(adm),20(dialout),24(cdrom),46(plugdev),116(lpadmin),118(admin),124(sambashare)

Note the group 'james'. Very often, adding a user creates a group named after
the user, specifically for that user. This sounds like the best group to use
for /mnt/foo/bar:

    <<< james@germaine!10048 E:1 env
    >>> sudo chgrp james /mnt/foo/bar
    <<< james@germaine!10051 env
    >>> cat /mnt/foo/bar/hello  
    hello

We made it !

#### Dig deeper

Here is a list of links to dig deeper in the subject:

 - [chown](http://en.wikipedia.org/wiki/Chown)
 - [chgrp](http://en.wikipedia.org/wiki/Chgrp)
 - [chmod](http://en.wikipedia.org/wiki/Chmod)
 - [Unix file types](http://en.wikipedia.org/wiki/Unix_file_types)
 - [Filesystem permissions](http://en.wikipedia.org/wiki/Filesystem_permissions)
