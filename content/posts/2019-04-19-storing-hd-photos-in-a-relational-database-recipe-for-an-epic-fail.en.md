+++
date = "2019-04-19T08:28:10+00:00"
draft = false
tags = ["devops"]
title = "Storing HD photos in a relational database: recipe for an epic fail"
author = "jpic"
+++

Storing files in the database has already been [demonstrated as not an efficient trade-off here](https://softwareengineering.stackexchange.com/questions/150669/is-it-a-bad-practice-to-store-large-files-10-mb-in-a-database), and in many pages on internet. As such, this post provides subjective stories about files in the database, rather than an objective compare.

Now Bob the manager has watched [Peter Chubb's talk](https://www.youtube.com/watch?v=wN6IwNriwHc) and decides that you will store uploaded PDFs and HD photos in the database when that doesn't even matter when people are going to upload files in AJAX, **before** they submit their form, during HTTP requests that occur **before** that request that causes a relational data write. If Bob the manager justifies with "it's going to make backup easier" then this article will demonstrate how wrong he is.

Many great software already do receive data from network and store it in files with generated names on the file system OpenStack, git, Docker ... Generating the paths with something supposed to be unique per request such as UUIDs to secure runtime from collisions. For administrative tasks, a cli can relate relational data input to file system operations, ie. "delete all from customer 123". And you should be good to go, your backup software should be designed to deal efficiently with the file system api after all.

Are you going to do "research on storing files in the DB with Peter Chubb", or are you going to "maintain a production environment with Bob the manager" ?

Imagine this ridiculous situation where you want to dump 12k user submitted forms from 3000 different users, of production relational data but it takes 32 minutes because dumping 35GB of uploaded photos happens the same time when using the db dump command. Imagine it, because that's what storing photos or videos in relational database binary blobs will get you. Dumping relational data from the relational database also dumps every uploaded photo or video every time over and over again even if it hasn't changed at all since last dump, dangerously raising 5.5 second disk write backlogs at the same time: the ever growing bottleneck in your continuous deployment pipeline. 

**What's it going to be when we have not 3000, but 300 000 users ? Is it going to take not 32 minutes, but 3 200 minutes ? and not 35G but 3.5TB of useless dump ? Is it going to take 53 hours to get a patch to production ?**

Disk space monitoring alarms will eventually start raising during backups on a regular basis. Don't keep going with current development waiting for Bob the manager to come back from holliday and get you a bigger server, which then in turn waits for a bureaucratic approval to use a some credit card from hierarchy or something.

As recurring incidents caused by lacking disk space will increase, and semi-automated (read: manual) palliative interventions will keep on buying time while you should better be extracting files from the database ... And as every single manual intervention makes up for a bit of free space to unblock "automated" deployments ... 

... until the point where there is just not enough free disk space for the db dump prior to a backup operation, there surely won't be enough disk space to migrate data from the database back into the filesystem, to remove the need of dumping old long binary data over and over again.

At this point, **production is now running without backups**. Is that a good thing ? Not in my practice, coding since 1995 I have lost data many times and surely spending weeks to make the custom code that will read your data out of a /dev/sda file is a fun, but definitely business affecting event.

Not to mention that the manual intervention needed to unblock deployments in case of backup failure **completely defeats** the point of automating deployments in the first place !

If you're doing estimates and when that moment will happen, note that ongoing business developments may cause an extra growth that's easy to miss on top of usage estimate based on the current rate of growth. This can be exponential for example, if the product team is deploying more regions at a faster pace over time. As such, prepare your estimate crash date to fall short because of exponential growth increase. 

In my case from 20%, but I would strongly advice for a 100% margin in the given deadline. Because even if your estimate was perfect, accounting for new external factors on the way to the dead server deadline. Meanwhile palliatives responses piling up at an increasingly regular pace will lead to filling up the server anyway, much more than if you hadn't to dump your files from the database to the filesystem to run backup over the dump file. That will happen because, your program is not the only of the OS that uses the disk for long term caching or transforming files. Otherwise, why not wait until a nightly backup fills up the disk space to do something about it while we're at it ?

Once the backup operation that copies the file from the relational database into the file system prior to calling the backup program fills up disk space, it's already too late to extract files from the database into the file system on this production server because you don't have enough space left anymore to copy all that binary data.

Next thing you know you'll be chanting some voodoo spells early in the morning sacrifying a chicken before you repartition a production RAID1 array thanks to the kind friends on freenode, adding 30Gb to /home shrinking 10Gb from root partition. The voodoo to repartition with mdadm, that I tested for both RAID1 and 5 goes like

    mdadm --grow /dev/mdX --bitmap=none # CLEAR bitmap blocks (or replace none with path for bitmap write-intent
    resize2fs /dev/mdX 10G
    mdadm --grow /dev/mdX --size=15G  # let extra space that for later fix
    mdadm --fail /dev/mdX /dev/sdYX # mark fail
    mdadm --remove /dev/mdX /dev/sdYX # pour sortir un disque du raid
    fdisk /dev/sdY # shrink like 20G, leaving enough margin
    # from now on use: sfdisk -d /dev/sdY /dev/sdZ to copy a partition table from a disk to another
    mdadmn --add /dev/mdX /dev/sdYX # back into raid
    # for every /dev/sd added wait for complete reconstruction
    mdadm --grow /dev/mdX --size=max # optimize RAID partition alignment
    resize2fs /dev/mdX # without extra argument will max out on 

If you don't clear bitmap blocks in the raid partition then mdadm --grow will pass, but mount will fail for "bad superblock, do you want to rewrite data ? y/n", **don't**: this causes data loss, which means reversing and starting stat step over again. 

Note that the metedata array version must work with the mdadm version: might not be the right version in different chroots.

Better yet, why not store file paths in string database variables instead of content in blobs or binary or base64 or whatever, then the db with 13k rows takes only a few MBs. Dumps and rollbacks of your **relational data** in and out of your **relationnal database** take a breeze because **paths strings** identify the **files** you store on the filesystem.

A backup operation for 35GB or even 350GB is just a read and files that haven't changed will be skipped in a breeze by any backup system, instead of dumping the whole file database for the backup process to re-read them which causes disk I/O backlog alerts thanks to [NetData Open Source monitoring](https://my-netdata.io/).

If you keep binary data in your relational database, you **will** need custom code to make in memory file handler from data from SQL to whatever server you're programing.

In the case where files can be writen once, and then served several times it's certain that storing file paths in your relational database is the best move, because then you can feed it directly into  [open()](http://man7.org/linux/man-pages/man2/open.2.html) system call and get a file handler in a variable that can be passed from the request or to the response is fantastic.

With binary files coming from the network are stored in the database you will be wasting energy on creating in-memory file handlers to move data from SQL API to storage or network API, because that's how this OS works, but you will also need to wait for read/write of all binary that never changed every time you backup/rollback your relational data.

Of course backup systems support the file system API perfectly by default, as does the userland, because that really boils down to basic operations. 

For freedom to refactor on a regular basis, there is no escape from coding automated relational data migration on a regular basis, as the users request features that require schema changes. Those changes may sometimes be constructive, but also some time destructive. 

As such, automatic backup of any relational data should be done before any kind of automated migration that's being pushed from a deployment automation pipeline, in case you want to rollback the deployment just to rewrite your migration, because you didn't like how it turned out on the staging server. 

Well, you could get away by using [Dynamic Environments](https://docs.gitlab.com/ee/ci/environments.html#configuring-dynamic-environments) which means deploying branch foo to foo.some.example.com. In which case you could test migration rewrite by just pushing to a new branch as that will create a new database server with an empty migrations table. But you wouldn't be testing the automated data restore script that you hope will work in production when you need it. I'm not saying not to use dynamic environments, it's a great feature and really easy to use with a Gitlab shell executor and docker-compose that's great to create integration testing or per branch temporary review environments.

Anyway, back to migration code itself: generators will usually code a forward/backward logic, but schema mutations quite often needs to have a data migration code with it that executes OAOO on a given server. That means, coding a backward operation you're 99% not going to need is an evitable cost, compared to a forward migration that you're going to need 100% of the time, not to mention when it's not even possible at all (refactoring, destructive operations).

Bugs in migration code can happen under various ways, as there's no perfect solution but always a trade offs. This affects deployment and [zwischenzugs](https://en.wikipedia.org/wiki/Zwischenzug) to choose between:

- shutting down the production service *before** the pre-deployment backup, so that nobody can write during that time,
- restarting the production service **after** the pre-deployment backup that's just before the migration automation.

The backup/restore operation that's supposed to secure the relational data migration costs a full read and write of all binary contents of your database that isn't even part of the migration. 

Release early, release often, spend time monitoring patches in production rather than surveilling SQL to file system complete dump and reload ... of relationnal data (good) and binary data (needless).

[PostgreSQL](https://postgresql.org) relationnal database works with blobs .. *you will have to wait for the all your binary data to move in/out any time you just want to backup/rollback relational data*. 

That's every time there is a nightly backup or a deployment ! 

Again: imagine all the custom code you'd have to deliver to reinvent what we can already do with a file system.

Exchange between the network and a dedicated server disk is pretty simple with a file handler that's already supported by both your network and storage API in most case.

When backup fill disk space the first time it's your best window to take a preventive operation: be brave and get the binary out of the database back in the file system, that's optimised for dealing disk space and file operations, particularily if you have a write-once policy on file storage plus a retention policy.

I somewhat feel a responsibility to share this story, 99% of incidents are a suite of predictible events, and mixing heavy media data binary such as photos or videos with relational data has been the source of a lot of the unnecessary troubble, recurring incidents ...

If you're going to practice eXtreme Programing / Continuous Delivery and the likes, then storing files in the database will become:

- the ever growing bottleneck in your deployment pipeline,
- the liability of your deployment pipeline, unless you decide it's ok to shut down the service for writes while the migration is waiting for the backup to finish.

Of course you can make all the operations described as best practice in this post to work in an optimized way, you could have a super specific backup/restore procedure that would be extremely optimized, but think of all the custom code that you will have to pay for instead of relying on ecosystem provided userland commands, if you're going to have backups that happen every time it matters.

Save yourself from needless trouble and leverage existing userland for dealing with file operations from a higher level perspective will save you time you need to work on what makes your product different.

Cheers
