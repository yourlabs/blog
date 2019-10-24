+++
date = "2014-04-13T22:01:54+00:00"
draft = false
tags = ["linux", "gdb", "security"]
title = "GDB debugging basics"
+++
### Introduction

[GDB](http://en.wikipedia.org/wiki/Gdb) is a debugger for executables "objects" on Linux. It will use source code
and "debug symbols" if available:

- source code to display the code ie. corresponding to a specific frame at
  runtime,
- debug symbols to display variables and functions names like in the code.

What's the relation between security and GDB ? Well it will help finding security bugs which may be vulnerabilities to [buffer overflow](http://en.wikipedia.org/wiki/Buffer_overflow).

### Debugging with sources and debug symbols

Consider the following C source code example for hello world:


{{< highlight c>}}
    #include<stdio.h>

    int YourGlobalVariable;

    main()
    {
        int YourLocalVariable;

        printf("Hello World\n");

        return 0;
    }
{{< / highlight >}}


#### Compile with debug symbols with `-ggdb`:

    gcc main.c -ggdb -o main

#### Now you can easely debug with `gdb`:

    $ gdb main
    GNU gdb (GDB) 7.7
    Copyright (C) 2014 Free Software Foundation, Inc.
    License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
    This is free software: you are free to change and redistribute it.
    There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
    and "show warranty" for details.
    This GDB was configured as "x86_64-unknown-linux-gnu".
    Type "show configuration" for configuration details.
    For bug reporting instructions, please see:
    <http://www.gnu.org/software/gdb/bugs/>.
    Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.
    For help, type "help".
    Type "apropos word" to search for commands related to "word"...
    Reading symbols from main...done.

#### List source files with `(gdb) info sources`

    (gdb) info sources
    Source files for which symbols have been read in:
    
    /home/jpic/main.c
    
    Source files for which symbols will be read in on demand:
    
#### Show variables with `(gdb) info variables`

    (gdb) info variables
    All defined variables:
    
    File main.c:
    int YourGlobalVariable;
    
    Non-debugging symbols:
    0x00000000004005b0  _IO_stdin_used
    0x00000000004006e8  __FRAME_END__
    0x00000000006006f0  __frame_dummy_init_array_entry
    0x00000000006006f0  __init_array_start
    0x00000000006006f8  __do_global_dtors_aux_fini_array_entry
    0x00000000006006f8  __init_array_end
    0x0000000000600700  __JCR_END__
    0x0000000000600700  __JCR_LIST__
    0x0000000000600708  _DYNAMIC
    0x00000000006008e0  _GLOBAL_OFFSET_TABLE_
    0x0000000000600910  __data_start
    0x0000000000600910  data_start
    0x0000000000600918  __dso_handle
    0x0000000000600920  __TMC_END__
    0x0000000000600920  __bss_start
    0x0000000000600920  _edata
    0x0000000000600920  completed
    0x0000000000600928  _end

#### Show functions with `(gdb) info functions`

    (gdb) info functions
    All defined functions:
    
    File main.c:
    int main();
    
    Non-debugging symbols:
    0x00000000004003a8  _init
    0x00000000004003e0  printf@plt
    0x00000000004003f0  __libc_start_main@plt
    0x0000000000400400  __gmon_start__@plt
    0x0000000000400410  _start
    0x0000000000400440  deregister_tm_clones
    0x0000000000400470  register_tm_clones
    0x00000000004004b0  __do_global_dtors_aux
    0x00000000004004d0  frame_dummy
    0x0000000000400530  __libc_csu_init
    0x00000000004005a0  __libc_csu_fini
    0x00000000004005a4  _fini

#### Show local variables with `(gdb) info scope`

    (gdb) info scope main
    Scope for main:
    Symbol YourLocalVariable is a complex DWARF expression:
         0: DW_OP_fbreg -20
    , length 4.

#### Break on a function with `(gdb) b`

    (gdb) b main
    Breakpoint 1 at 0x400505: file main.c, line 7.

#### Run the object in gdb with `(gdb) run`

Run the object, it will break on `main()` (see above):

    (gdb) run
    Starting program: /home/jpic/main 
    warning: Could not load shared library symbols for linux-vdso.so.1.
    Do you need "set solib-search-path" or "set sysroot"?
    
    Breakpoint 1, main () at main.c:7
    7       int YourLocalVariable=6;

#### Continue to next line on break with `(gdb) n`

    (gdb) n
    9       printf("Hello %i World\n", YourLocalVariable);

#### Print a variable with `(gdb) print`

    (gdb) print YourLocalVariable
    $1 = 6

### Continuing normal execution with `(gdb) c`

    (gdb) c
    Continuing.
    Hello 6 World
    [Inferior 1 (process 17984) exited normally]
    (gdb) 

### Debugging without debugging symbols

Without debugging symbols, gcc does not know where a function is defined:

    (gdb) info functions
    All defined functions:

    Non-debugging symbols:
    0x00000000004003a8  _init
    0x00000000004003e0  puts@plt
    0x00000000004003f0  __libc_start_main@plt
    0x0000000000400400  __gmon_start__@plt
    0x0000000000400410  _start
    0x0000000000400440  deregister_tm_clones
    0x0000000000400470  register_tm_clones
    0x00000000004004b0  __do_global_dtors_aux
    0x00000000004004d0  frame_dummy
    0x00000000004004fd  main
    0x0000000000400520  __libc_csu_init
    0x0000000000400590  __libc_csu_fini
    0x0000000000400594  _fini

### Debugging without source code

Listing the source code does not work:

    (gdb) list
    No symbol table is loaded.  Use the "file" command.

### Further reading

- [GNU Binutils](http://en.wikipedia.org/wiki/GNU_Binutils)
- [Debugging stripped binaries](http://felix.abecassis.me/2012/08/gdb-debugging-stripped-binaries/)
