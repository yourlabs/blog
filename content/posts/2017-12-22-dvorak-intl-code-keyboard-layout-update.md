+++
date = "2017-12-22T18:20:13+00:00"
draft = false
tags = ["dvorak-intl-code"]
title = "Dvorak-intl-code Keyboard Layout Update"
+++
Dvorak-intl-code is a keyboard layout optimized for polyglot hackers I've started working on and using in 2008.

This article demonstrates how to easily create your own keyboard layout by extending an existing one, storing your config in your home directory and load it with a command which .xinitrc or whatever can call.

Just add a file in `~/.xkb/symbols`, for example I put mine in `/home/jpic/.xkb/symbols/code`, and looks as such:


// Dvorak variant for polyglot coder

partial alphanumeric_keys
xkb_symbols "dvorak-intl-code" {

    name[Group1]= "English (Dvorak alternative international no dead keys)";

    include "us(dvorak-alt-intl)"

    key <AE01> { [ exclam, 1 		]	};
    key <AE02> { [ at, 2		]	};
    key <AE03> { [ numbersign, 3	]	};
    key <AE04> { [ dollar, 4, EuroSign		]	};
    key <AE05> { [ ampersand, 5		]	};
    key <AE06> { [ braceleft, 6, dead_circumflex, dead_circumflex ]	};
    key <AE07> { [ braceright, 7	]	};
    key <AE08> { [ asterisk, 8	]	};
    key <AE09> { [ parenleft, 9, dead_grave]	};
    key <AE10> { [ parenright, 0	]	};
    key <AE11> { [ bracketleft,	asciicircum	]	};
    key <AE12> { [ bracketright, percent,  dead_tilde] };
    key <AB01> { [ colon,   semicolon, acircumflex ] };

    include "level3(ralt_switch)"
};


Then, such a command can load it:


setxkbmap -I ~/.xkb code -print | xkbcomp -I$HOME/.xkb - $DISPLAY


That's it, have fun creating your own perfect layout !