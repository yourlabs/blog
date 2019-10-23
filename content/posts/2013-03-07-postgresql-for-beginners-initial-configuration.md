+++
date = "2013-03-07T04:21:00+00:00"
draft = false
tags = ["postgresql", "linux"]
title = "PostgreSQL for beginners: Initial configuration"
+++
Those are notes taken from the talk ["PostgreSQL when it is not
your job"](http://klewel.com/conferences/djangocon-2012/index.php?talkID=3) by
[Christophe Pettus](http://thebuild.com/blog/) from 
[PostgreSQL Experts Inc.](http://www.pgexperts.com/) at 
[DjangoCon Europe 2012](http://klewel.com/conferences/djangocon-2012/).

This article describes how to make a basic PostgreSQL configuration:

- logging,
- memory,
- checkpoints,
- planner.

Note: this article is mostly a transcript from the talk by Christophe Pettus:
so send all the cookies to him. Thanks !

That's around 12 configuration options and you're done.

### Logging

Starting with logging is a good idea because it's the best way of getting
information for configuring the other settings.

- be generous with logging; it's very low-impact on the system,
- it's your best source of information for finding performance problems

#### Where to log

Three options:

- syslog, if you have a syslog infrastructure you like already,
- standard format to files - if you're using tools that need standard format,
- otherwise, CSV format to files,

#### What to log ?

Christophe Pettus recommends this configuration, which you can copy and paste
in your postgresql.conf:

    log_destination = 'csvlog'
    log_directory = 'pg_log
    # enable file rotator
    logging_collector = on
    log_filename = 'postgres-%Y-%m-%d_%H%M%S'
    log_rotation_age = 1d
    log_retation_size = 1GB
    # log statements that take more than 250ms
    log_min_duration_statement = 250ms
    log_checkpoints = on
    log_connections = on
    log_disconnections = on
    log_lock_waits = on
    log_temp_files = 0
    
### Memory configuration

Three things you have to tweak:

- shared_buffers,
- work_mem,
- maintenance_work_mem,

#### shared_buffers

- below 2GB of RAM, set to 20% of total system memory,
- below 32GB, set to 25% of total system memory,
- avec 32GB, set to 8GB,

#### work_mem

- start low: 32-64MB,
- then wait until there is some server load (simulated or real),
- look for 'temporary file' lines in logs,
- it will say "I'm creating temporary file of this size",
- set work_mem to 2-3x the largest temp file you see.

This can be a **huge** spped-up if set properly ! This is probably **the**
setting that has the most impact on postgresql performance !

**But** if you find yourself setting this super high like 8GB, you probably
don't want to set it that high. Because every time someone does an operation
in postgres like a SORT, it could potentially use that amount of memory per
planner.

If you're having problems of memory exhaustion problems, this is the best
setting to back off.

#### maintenance_work_meme

This is the amount of memory that PostgreSQL uses for indexing or vacuum
operations.

- 10% of system memory, up to 1GB,
- Maybe even higher if you are having VACUUM problems,

#### effective_cache_size

Unlike other parameters we've seen, this one won't actually allocate any
memory.

- set to the amount of file system cache available,
- if you don't know, set it to 50% of total system memory,

### Checkpoints

- A checkpoint is a complete flush of dirty buffers to disk.
- Potentially a lot of I/O (Input/Output),
- Done when the first of two thresholds are hit:
  - A particular number of WAL (Write-Ahead-Log) segments have been written ...
    basically you don't have to worry about that, it's when a certain amount of
    database activity has happened.
  - A timeout occurs.

#### Settings part I

    # that's the right value according to Chripstophe
    wal_buffers = 16MB
    checkpoint_completion_target = 0.9
    checkpoint_timeout = 10m-30m, # Depends on the restart time

The trade off about checkpoint_timeout is: the higher it goes, you'll generally
get better performance, but the longer it will take postgresql to restart after
a crash.

#### Settings part II

- Look for checkpoint entries in the logs
- Is it happening more often than checkpoint_timeout ?
- Then adjust checkpoint_segments so that checkpoints happen due to
  timeouts rather than filling segments,

#### Settings part III, warnings

- The WAL can take up to 3*16MB*checkpoint_segments on disk, so the higher that
  number goes the more space on disk it will be using ... but on modern disks
  it's not really that much disk,
- Restarting PostgreSQL can take up to checkpoint_timeout (but usually less,
  like 20% of that),

### Planner settings

- effective_io_concurrency, set to the number of I/O channels; otherwise ignore
  it. For example if you have a stack of hard drives or an SSD drive that has
  32 channels then set it to the number of channels.
- random_page_cost, 3.0 for a typical RAID10 array, 2.0 for a SAN, 1.1 for
  Amazon EBS, else don't tweak it.