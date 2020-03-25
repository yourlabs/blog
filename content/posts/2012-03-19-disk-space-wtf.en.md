+++
date = "2012-03-19T11:30:58+00:00"
draft = false
tags = ["linux"]
title = "Disk space WTF"
author = "jpic"
+++

What do you think is the problem when vim starts complaining that it can't
write swap files, postgresql starts complaining that there is no disk space
left, when df output is:

    >>> df 
    Filesystem     1K-blocks     Used Available Use% Mounted on
    udev               10240        4     10236   1% /dev
    run                10240      156     10084   2% /run
    /dev/md1        10403064  1298596   8580184  14% /
    shm              8188088        0   8188088   0% /dev/shm
    tmpfs            8188088      124   8187964   1% /tmp
    /dev/md2       105366664 62467912  37588548  63% /home

This post also credits the awesomeness of Open Source and particularly community driven support

On BetSpire, we use GlobalSportMedia API a lot. For performance and quality
reasons, we cache each HTTP response from the API into a file, which name is a
hash of the URL.

Apart from the obvious performance reason, this also allows to be up when the
API is down.

So before our server makes an HTTP query, it checks if there is a file which
name matches the url hash. If such a file is found, its age is checked. If the
file is too old, it is removed and replaced by a fresh version.

Can you identify the problem we ran into at this point ? If you do well done !

First it seemed strange, but vim was complaining on :w that it couldn't write
swap files. Then the website started crashing for reason: Caught DatabaseError
while rendering: could not create temporary file
"base/pgsql_tmp/pgsql_tmp3370.0": No space left on device

But it seemed like there was plenty of space:

    >>> df 
    Filesystem     1K-blocks     Used Available Use% Mounted on
    udev               10240        4     10236   1% /dev
    run                10240      156     10084   2% /run
    /dev/md1        10403064  1298596   8580184  14% /
    shm              8188088        0   8188088   0% /dev/shm
    tmpfs            8188088      124   8187964   1% /tmp
    /dev/md2       105366664 62467912  37588548  63% /home

But fear not, #archlinux fantastic community driven support channel user brain0 asked the output of command df -i:

    >>> df -i
    Filesystem      Inodes   IUsed   IFree IUse% Mounted on
    udev           2045578     596 2044982    1% /dev
    run            2047022     388 2046634    1% /run
    /dev/md1        655360   50876  604484    8% /
    shm            2047022       1 2047021    1% /dev/shm
    tmpfs          2047022      23 2046999    1% /tmp
    /dev/md2       6643712 6643712       0  100% /home

**The server was not lacking of disk space. It was lacking of inodes.**

The directory that holds the cached files endend containing ~6.4 milions of
files. Which is more or less the maximum number of inodes of the ext4
filesystem by default.

The solution was to cron such a command: find /whereever -mtime +2 -delete.
This will delete files which are at least 2 days old.

The real point of this post is that I wanted to credit the insanely talented
hackers who helped me on #archlinux channel of freenode:

- **brain0**: support, also nailed the inode issue in no time
- **Florian Pritz**: support, also suggested the find command
- **FBI**: support, also suggested options to make a new filesystem with more
  inodes (btrfs has unlimited inodes, but it's not known as a stable FS)

On the behalf of BetSpire team, I want to thank you very much for your help.
