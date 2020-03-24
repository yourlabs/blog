+++
date = "2012-04-27T08:26:33+00:00"
draft = false
tags = ["dvorak-intl-code"]
title = "Dvorak-intl-code"
author = "jpic"
+++

After upgrading Ubuntu, I had to redo my custom dvorak layout.

To enable it, the only way I've found is to add the layout to /usr/share/X11/xkb/us.

Then you can enable it through a GUI, or with command:

    setxkbmap us dvorak-intl-code

It is optimized for multilinguists and hackers:

    // Dvorak international with dead keys and optimisations for code
    // Olivier Mehani (shtrom-xorg@ssji.net) &amp; James Pic
    // Reproduce the per-key mapping of us(intl) for the dvorak layout
    // aka "I just swapped my keys over"
    // Symbols and numbers swapped for code
    // colon and semi colon swapped for vim
    partial alphanumeric_keys
    xkb_symbols "dvorak-intl-code" {

        name[Group1]= "English (Dvorak international with dead keys)";

        include "us(dvorak)"

        key <tlde> { [dead_grave, dead_tilde,         grave,       asciitilde ] };

        key <ae01> { [     exclam,     1,    exclamdown,      onesuperior ] };
        key <ae02> { [         at,     2,   twosuperior, dead_doubleacute ] };
        key <ae03> { [ numbersign,     3, threesuperior,      dead_macron ] };
        key <ae04> { [     dollar,     4,      currency,         sterling ] };
        key <ae05> { [    percent,     5,      EuroSign,     dead_cedilla ] };
        key <ae06> { [asciicircum,     6,    onequarter,  dead_circumflex ] };
        key <ae07> { [  ampersand,     7,       onehalf,    dead_horn ] };
        key <ae08> { [   asterisk,     8, threequarters,      dead_ogonek ] };
        key <ae09> { [  parenleft,     9, leftsinglequotemark, dead_breve ] };
        key <ae10> { [ parenright,     0, rightsinglequotemark, dead_abovering ] };
        key <ae11> { [ bracketleft,  braceleft,  guillemotleft, leftdoublequotemark ] };
        key <ae12> { [bracketright, braceright, guillemotright, rightdoublequotemark ] };

        key <ad01> { [ apostrophe,        quotedbl, dead_acute, dead_diaeresis ] };
        key <ad02> { [     comma,       less,      ccedilla,         Ccedilla ] };
        key <ad03> { [    period,    greater, dead_abovedot,       dead_caron ] };
        key <ad04> { [     p,          P,    odiaeresis,       Odiaeresis ] };
        key <ad05> { [     y,          Y,    udiaeresis,       Udiaeresis ] };
        // key <ad06> { [      f,   F       ]   };
        // key <ad07> { [      g,   G       ]   };
        key <ad08> { [     c,          C,     copyright,             cent ] };
        key <ad09> { [     r,          R,    registered,       registered ] };
        key <ad10> { [     l,          L,        oslash,         Ooblique ] };
        key <ad11> { [     slash,   question,  questiondown,        dead_hook ] };
        // key <ad12> { [     equal,       plus,      multiply,         division ] };

        key <ac01> { [     a,          A,        aacute,           Aacute ] };
        key <ac02> { [     o,          O,        oacute,           Oacute ] };
        key <ac03> { [     e,          E,        eacute,           Eacute ] };
        key <ac04> { [     u,          U,        uacute,           Uacute ] };
        key <ac05> { [     i,          I,        iacute,           Iacute ] };
        key <ac06> { [     d,          D,           eth,              ETH ] };
        // key <ac07> { [      h,   H       ]   };
        key <ac08> { [     t,          T,         thorn,            THORN ] };
        key <ac09> { [     n,          N,        ntilde,           Ntilde ] };
        key <ac10> { [     s,          S,        ssharp,          section ] };
        // key <ac11> { [     minus, underscore,           yen,    dead_belowdot ] };

        key <ab01> { [      colon, semicolon,     paragraph,           degree ] };
        key <ab02> { [     q,          Q,    adiaeresis,       Adiaeresis ] };
        // key <ab03> { [      j,   J       ]   };
        key <ab04> { [     k,          K,            oe,               OE ] };
        // key <ab05> { [      x,   X       ]   };
        // key <ab06> { [      b,   B       ]   };
        key <ab07> { [     m,          M,            mu,               mu ] };
        key <ab08> { [     w,          W,         aring,            Aring ] };
        // key <ab09> { [      v,   V       ]   };
        key <ab10> { [     z,          Z,            ae,               AE ] };

        key <bksl> { [ backslash,        bar,       notsign,        brokenbar ] };

        include "level3(ralt_switch)"
    }; </bksl></ab10></ab09></ab08></ab07></ab06></ab05></ab04></ab03></ab02></ab01></ac11></ac10></ac09></ac08></ac07></ac06></ac05></ac04></ac03></ac02></ac01></ad12></ad11></ad10></ad09></ad08></ad07></ad06></ad05></ad04></ad03></ad02></ad01></ae12></ae11></ae10></ae09></ae08></ae07></ae06></ae05></ae04></ae03></ae02></ae01></tlde>
