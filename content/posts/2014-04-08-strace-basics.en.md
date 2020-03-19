+++
date = "2014-04-08T22:01:47+00:00"
draft = false
tags = ["linux", "security", "strace"]
title = "Strace basics"
+++
This is the first of a series of articles on security and exploiting. For starters we'll cover basic debugging tools before we get into actual exploiting because the first step to exploiting is reverse-engineering most of the time.

The series targets experienced developers and tries to go straight to the point for them.  Every article in this series is tagged "security".

### Introduction

[strace](http://en.wikipedia.org/wiki/Strace) is a tool that prints system
calls like open, connect, etc ... and signals like INT, KILL, etc ... of a
process. It is very useful to know what a program is doing.

### `strace` as a wrapper

You can start a program using strace as a wrapper as such:

    $ strace ./main 
    execve("./main", ["./main"], [/* 43 vars */]) = 0
    brk(0)                                  = 0x1b7a000
    access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
    open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
    fstat(3, {st_mode=S_IFREG|0644, st_size=169727, ...}) = 0
    mmap(NULL, 169727, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7ff0770cd000
    close(3)                                = 0
    open("/usr/lib/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
    read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\20\34\2\0\0\0\0\0"..., 832) = 832
    fstat(3, {st_mode=S_IFREG|0755, st_size=2022349, ...}) = 0
    mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff0770cc000
    mmap(NULL, 3832336, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7ff076b2f000
    mprotect(0x7ff076ccd000, 2097152, PROT_NONE) = 0
    mmap(0x7ff076ecd000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x19e000) = 0x7ff076ecd000
    mmap(0x7ff076ed3000, 14864, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7ff076ed3000
    close(3)                                = 0
    mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff0770cb000
    mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff0770ca000
    arch_prctl(ARCH_SET_FS, 0x7ff0770cb700) = 0
    mprotect(0x7ff076ecd000, 16384, PROT_READ) = 0
    mprotect(0x7ff0770f7000, 4096, PROT_READ) = 0
    munmap(0x7ff0770cd000, 169727)          = 0
    fstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 5), ...}) = 0
    mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff0770f6000
    write(1, "Hello 6 World\n", 14Hello 6 World
    )         = 14
    exit_group(0)                           = ?
    +++ exited with 0 +++

### Filtering output with `-e`

Strace will probably output much more than you need. You could use the `-e`
option to filter calls:

    $ strace -e open,close,read,write ./main
    open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
    close(3)                                = 0
    open("/usr/lib/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
    read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\20\34\2\0\0\0\0\0"..., 832) = 832
    close(3)                                = 0
    write(1, "Hello 6 World\n", 14Hello 6 World
    )         = 14
    +++ exited with 0 +++

### Strace output to a file with `-o`

You'll note that strace outputs quite an amount of data for our little `main`
program, imagine how much it will output for a bigger program ... Way to much. 

Use the `-o` option to get strace to output to a file:

    strace -o /tmp/main.strace ./main 

### Attach to a running process with `-p`

Use something like `ps aux` or `pgrep` to find a process ID. Then you can
attach to it with `-p`:

    strace -o /tmp/postgresql -p 1234

You might have to do that as root:

    sudo strace -o /tmp/postgresql -p 1234

Else, you might have this error:

    strace: attach: ptrace(PTRACE_ATTACH, ...): Operation not permitted


### Timestamps with `-t` or `-r`

Use `-t` for time:

    $ strace -t ./main
    18:15:28 execve("./main", ["./main"], [/* 43 vars */]) = 0
    18:15:28 brk(0)                         = 0x24ac000
    18:15:28 access("/etc/ld.so.preload", R_OK) = -1 ENOENT (No such file or directory)
    18:15:28 open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
    18:15:28 fstat(3, {st_mode=S_IFREG|0644, st_size=169727, ...}) = 0
    18:15:28 mmap(NULL, 169727, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f8d7b716000
    18:15:28 close(3)                       = 0
    18:15:28 open("/usr/lib/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
    18:15:28 read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\20\34\2\0\0\0\0\0"..., 832) = 832
    18:15:28 fstat(3, {st_mode=S_IFREG|0755, st_size=2022349, ...}) = 0
    18:15:28 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f8d7b715000
    18:15:28 mmap(NULL, 3832336, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f8d7b178000
    18:15:28 mprotect(0x7f8d7b316000, 2097152, PROT_NONE) = 0
    18:15:28 mmap(0x7f8d7b516000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x19e000) = 0x7f8d7b516000
    18:15:28 mmap(0x7f8d7b51c000, 14864, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f8d7b51c000
    18:15:28 close(3)                       = 0
    18:15:28 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f8d7b714000
    18:15:28 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f8d7b713000
    18:15:28 arch_prctl(ARCH_SET_FS, 0x7f8d7b714700) = 0
    18:15:28 mprotect(0x7f8d7b516000, 16384, PROT_READ) = 0
    18:15:28 mprotect(0x7f8d7b740000, 4096, PROT_READ) = 0
    18:15:28 munmap(0x7f8d7b716000, 169727) = 0
    18:15:28 fstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 6), ...}) = 0
    18:15:28 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f8d7b73f000
    18:15:28 write(1, "Hello 6 World\n", 14Hello 6 World
    ) = 14
    18:15:28 exit_group(0)                  = ?
    18:15:28 +++ exited with 0 +++

And `-r` for relative time:

    $ strace -r ./main
         0.000000 execve("./main", ["./main"], [/* 43 vars */]) = 0
         0.000307 brk(0)                    = 0x1392000
         0.000108 access("/etc/ld.so.preload", R_OK) = -1 ENOENT (No such file or directory)
         0.000075 open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
         0.000056 fstat(3, {st_mode=S_IFREG|0644, st_size=169727, ...}) = 0
         0.000083 mmap(NULL, 169727, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f971f25d000
         0.000061 close(3)                  = 0
         0.000071 open("/usr/lib/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
         0.000078 read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\20\34\2\0\0\0\0\0"..., 832) = 832
         0.000091 fstat(3, {st_mode=S_IFREG|0755, st_size=2022349, ...}) = 0
         0.000050 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f971f25c000
         0.000044 mmap(NULL, 3832336, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f971ecbf000
         0.000034 mprotect(0x7f971ee5d000, 2097152, PROT_NONE) = 0
         0.000055 mmap(0x7f971f05d000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x19e000) = 0x7f971f05d000
         0.000053 mmap(0x7f971f063000, 14864, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f971f063000
         0.000064 close(3)                  = 0
         0.000053 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f971f25b000
         0.000031 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f971f25a000
         0.000032 arch_prctl(ARCH_SET_FS, 0x7f971f25b700) = 0
         0.000097 mprotect(0x7f971f05d000, 16384, PROT_READ) = 0
         0.000036 mprotect(0x7f971f287000, 4096, PROT_READ) = 0
         0.000027 munmap(0x7f971f25d000, 169727) = 0
         0.000069 fstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 6), ...}) = 0
         0.000053 mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f971f286000
         0.000058 write(1, "Hello 6 World\n", 14Hello 6 World
    ) = 14
         0.000058 exit_group(0)             = ?
         0.000063 +++ exited with 0 +++

### Prevent strace from truncating strings with `-s 1024`

Sometimes, strace will truncate strings to print which we might want to read. Use the `-s` option:

       -s strsize  Specify  the  maximum string  size to print (the default is  32).
                   Note  that  filenames are  not   considered strings    and    are
                   always   printed   in full.

### Get statistics with `-c`

    $ strace -c ./main
    Hello 6 World
    % time     seconds  usecs/call     calls    errors syscall
    ------ ----------- ----------- --------- --------- ----------------
      0.00    0.000000           0         1           read
      0.00    0.000000           0         1           write
      0.00    0.000000           0         2           open
      0.00    0.000000           0         2           close
      0.00    0.000000           0         3           fstat
      0.00    0.000000           0         8           mmap
      0.00    0.000000           0         3           mprotect
      0.00    0.000000           0         1           munmap
      0.00    0.000000           0         1           brk
      0.00    0.000000           0         1         1 access
      0.00    0.000000           0         1           execve
      0.00    0.000000           0         1           arch_prctl
    ------ ----------- ----------- --------- --------- ----------------
    100.00    0.000000                    25         1 total
