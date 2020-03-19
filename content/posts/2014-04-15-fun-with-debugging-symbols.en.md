+++
date = "2014-04-15T22:01:29+00:00"
draft = false
tags = ["linux", "gdb", "security"]
title = "Fun with debugging symbols"
+++
This article follows up with [Basics of GDB debugging](http://blog.yourlabs.org/post/81871406431/basics-of-gdb-debugging), focus on symbols.

### List symbols with `nm`

Use the `nm` command to list symbols in a binary:

    $ nm main
    0000000000600920 B __bss_start
    0000000000600920 b completed.6330
    0000000000600910 D __data_start
    0000000000600910 W data_start
    0000000000400440 t deregister_tm_clones
    00000000004004b0 t __do_global_dtors_aux
    00000000006006f8 t __do_global_dtors_aux_fini_array_entry
    0000000000600918 D __dso_handle
    0000000000600708 d _DYNAMIC
    0000000000600920 D _edata
    0000000000600928 B _end
    00000000004005a4 T _fini
    00000000004004d0 t frame_dummy
    00000000006006f0 t __frame_dummy_init_array_entry
    00000000004006e8 r __FRAME_END__
    00000000006008e0 d _GLOBAL_OFFSET_TABLE_
                     w __gmon_start__
    00000000004003a8 T _init
    00000000006006f8 t __init_array_end
    00000000006006f0 t __init_array_start
    00000000004005b0 R _IO_stdin_used
                     w _ITM_deregisterTMCloneTable
                     w _ITM_registerTMCloneTable
    0000000000600700 d __JCR_END__
    0000000000600700 d __JCR_LIST__
                     w _Jv_RegisterClasses
    00000000004005a0 T __libc_csu_fini
    0000000000400530 T __libc_csu_init
                     U __libc_start_main@@GLIBC_2.2.5
    00000000004004fd T main
                     U printf@@GLIBC_2.2.5
    0000000000400470 t register_tm_clones
    0000000000400410 T _start
    0000000000600920 D __TMC_END__
    0000000000600924 B YourGlobalVariable

Here's a snippet from `man nm` which explains what we see here:

>  For each symbol, nm shows:
>
>·   The symbol value, in the radix selected by options (see
>    below), or hexadecimal by default.
>
>·   The symbol type.  At least the following types are used;
>    others are, as well, depending on the object file format.  If
>    lowercase, the symbol is usually local; if uppercase, the
>    symbol is global (external).  There are however a few
>    lowercase symbols that are shown for special global symbols
>    ("u", "v" and "w").
>
>    "A" The symbol's value is absolute, and will not be changed by
>        further linking.
>
>    "B"
>    "b" The symbol is in the uninitialized data section (known as
>        BSS).
>
>    "C" The symbol is common.  Common symbols are uninitialized
>        data.  When linking, multiple common symbols may appear
>        with the same name.  If the symbol is defined anywhere,
>        the common symbols are treated as undefined references.
>
>    "D"
>    "d" The symbol is in the initialized data section.
>
>    "G"
>    "g" The symbol is in an initialized data section for small
>        objects.  Some object file formats permit more efficient
>        access to small data objects, such as a global int
>        variable as opposed to a large global array.
>
>    "I" The symbol is an indirect reference to another symbol.
>
>    "N" The symbol is a debugging symbol.
>
>   [...] snipped for readability
>
>    "?" The symbol type is unknown, or object file format
>        specific.
>
> ·   The symbol name.

### List symbols with `readelf -Ws`

You can also use `readelf -Ws` to list symbols in an object:

    $ readelf -Ws main

    Symbol table '.dynsym' contains 4 entries:
       Num:    Value          Size Type    Bind   Vis      Ndx Name
         0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND 
         1: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND printf@GLIBC_2.2.5 (2)
         2: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@GLIBC_2.2.5 (2)
         3: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
    
    Symbol table '.symtab' contains 73 entries:
       Num:    Value          Size Type    Bind   Vis      Ndx Name
         0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND 
         1: 0000000000400200     0 SECTION LOCAL  DEFAULT    1 
         2: 000000000040021c     0 SECTION LOCAL  DEFAULT    2 
         3: 000000000040023c     0 SECTION LOCAL  DEFAULT    3 
         4: 0000000000400260     0 SECTION LOCAL  DEFAULT    4 
         5: 0000000000400280     0 SECTION LOCAL  DEFAULT    5 
         6: 00000000004002e0     0 SECTION LOCAL  DEFAULT    6 
         7: 0000000000400320     0 SECTION LOCAL  DEFAULT    7 
         8: 0000000000400328     0 SECTION LOCAL  DEFAULT    8 
         9: 0000000000400348     0 SECTION LOCAL  DEFAULT    9 
        10: 0000000000400360     0 SECTION LOCAL  DEFAULT   10 
        11: 00000000004003a8     0 SECTION LOCAL  DEFAULT   11 
        12: 00000000004003d0     0 SECTION LOCAL  DEFAULT   12 
        13: 0000000000400410     0 SECTION LOCAL  DEFAULT   13 
        14: 00000000004005a4     0 SECTION LOCAL  DEFAULT   14 
        15: 00000000004005b0     0 SECTION LOCAL  DEFAULT   15 
        16: 00000000004005c4     0 SECTION LOCAL  DEFAULT   16 
        17: 00000000004005f8     0 SECTION LOCAL  DEFAULT   17 
        18: 00000000006006f0     0 SECTION LOCAL  DEFAULT   18 
        19: 00000000006006f8     0 SECTION LOCAL  DEFAULT   19 
        20: 0000000000600700     0 SECTION LOCAL  DEFAULT   20 
        21: 0000000000600708     0 SECTION LOCAL  DEFAULT   21 
        22: 00000000006008d8     0 SECTION LOCAL  DEFAULT   22 
        23: 00000000006008e0     0 SECTION LOCAL  DEFAULT   23 
        24: 0000000000600910     0 SECTION LOCAL  DEFAULT   24 
        25: 0000000000600920     0 SECTION LOCAL  DEFAULT   25 
        26: 0000000000000000     0 SECTION LOCAL  DEFAULT   26 
        27: 0000000000000000     0 SECTION LOCAL  DEFAULT   27 
        28: 0000000000000000     0 SECTION LOCAL  DEFAULT   28 
        29: 0000000000000000     0 SECTION LOCAL  DEFAULT   29 
        30: 0000000000000000     0 SECTION LOCAL  DEFAULT   30 
        31: 0000000000000000     0 SECTION LOCAL  DEFAULT   31 
        32: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS init.c
        33: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS 
        34: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS crtstuff.c
        35: 0000000000600700     0 OBJECT  LOCAL  DEFAULT   20 __JCR_LIST__
        36: 0000000000400440     0 FUNC    LOCAL  DEFAULT   13 deregister_tm_clones
        37: 0000000000400470     0 FUNC    LOCAL  DEFAULT   13 register_tm_clones
        38: 00000000004004b0     0 FUNC    LOCAL  DEFAULT   13 __do_global_dtors_aux
        39: 0000000000600920     1 OBJECT  LOCAL  DEFAULT   25 completed.6330
        40: 00000000006006f8     0 OBJECT  LOCAL  DEFAULT   19 __do_global_dtors_aux_fini_array_entry
        41: 00000000004004d0     0 FUNC    LOCAL  DEFAULT   13 frame_dummy
        42: 00000000006006f0     0 OBJECT  LOCAL  DEFAULT   18 __frame_dummy_init_array_entry
        43: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS main.c
        44: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS crtstuff.c
        45: 00000000004006e8     0 OBJECT  LOCAL  DEFAULT   17 __FRAME_END__
        46: 0000000000600700     0 OBJECT  LOCAL  DEFAULT   20 __JCR_END__
        47: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS 
        48: 00000000006006f8     0 NOTYPE  LOCAL  DEFAULT   18 __init_array_end
        49: 0000000000600708     0 OBJECT  LOCAL  DEFAULT   21 _DYNAMIC
        50: 00000000006006f0     0 NOTYPE  LOCAL  DEFAULT   18 __init_array_start
        51: 00000000006008e0     0 OBJECT  LOCAL  DEFAULT   23 _GLOBAL_OFFSET_TABLE_
        52: 00000000004005a0     2 FUNC    GLOBAL DEFAULT   13 __libc_csu_fini
        53: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND _ITM_deregisterTMCloneTable
        54: 0000000000600910     0 NOTYPE  WEAK   DEFAULT   24 data_start
        55: 0000000000600920     0 NOTYPE  GLOBAL DEFAULT   24 _edata
        56: 00000000004005a4     0 FUNC    GLOBAL DEFAULT   14 _fini
        57: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND printf@@GLIBC_2.2.5
        58: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@@GLIBC_2.2.5
        59: 0000000000600910     0 NOTYPE  GLOBAL DEFAULT   24 __data_start
        60: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
        61: 0000000000600918     0 OBJECT  GLOBAL HIDDEN    24 __dso_handle
        62: 0000000000600924     4 OBJECT  GLOBAL DEFAULT   25 YourGlobalVariable
        63: 00000000004005b0     4 OBJECT  GLOBAL DEFAULT   15 _IO_stdin_used
        64: 0000000000400530   101 FUNC    GLOBAL DEFAULT   13 __libc_csu_init
        65: 0000000000600928     0 NOTYPE  GLOBAL DEFAULT   25 _end
        66: 0000000000400410     0 FUNC    GLOBAL DEFAULT   13 _start
        67: 0000000000600920     0 NOTYPE  GLOBAL DEFAULT   25 __bss_start
        68: 00000000004004fd    42 FUNC    GLOBAL DEFAULT   13 main
        69: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND _Jv_RegisterClasses
        70: 0000000000600920     0 OBJECT  GLOBAL HIDDEN    24 __TMC_END__
        71: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND _ITM_registerTMCloneTable
        72: 00000000004003a8     0 FUNC    GLOBAL DEFAULT   11 _init

### Extract symbols from a binary with `objcopy --only-keep-debug`

    objcopy --only-keep-debug main symbols
    nm symbols # print list of symbols

### Stripping debug symbols from an object with `objcopy -S`

Create another executable without symbols ie.:

    $ objcopy -S main main_without_symbols 

The new object, `main_without_symbols` will have harder to debug:

    $ readelf -Ws  main_without_symbols 
 
    Symbol table '.dynsym' contains 4 entries:
       Num:    Value          Size Type    Bind   Vis      Ndx Name
         0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND
         1: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND printf@GLIBC_2.2.5 (2)
         2: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@GLIBC_2.2.5 (2)
         3: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__

### Strip symbols off a binary with `--strip-unneeded`

    strip --strip-debug --strip-unneeded main

Symbols are not in the binary anymore:

    $ nm main
    nm: main: no symbols

### Load symbols from file with `(gdb) symbols-file`

    Reading symbols from main...(no debugging symbols found)...done.
    (gdb) info variables
    All defined variables:
    (gdb) symbol-file debug_symbols
    Reading symbols from debug_symbols...done.
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

### Add symbols back to a binary with `objcopy --add-gnu-debuglink=symbols_file`

    objcopy --add-gnu-debuglink=debug_symbols main

### Read symbols from a file with `nm`

Note that the above won't let `nm` find symbols in `main`, but it will be
able to list them from `debug_symbols`:

    $ nm debug_symbols 
    0000000000600920 B __bss_start
    0000000000600920 b completed.6330
    [...] snipped for readability