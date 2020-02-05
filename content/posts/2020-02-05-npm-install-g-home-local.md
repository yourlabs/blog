+++
date = "2020-02-05T13:33:37+00:00"
draft = false
tags = ["nodejs", "npm", "linux"]
title = "Use npm install -g in ~/.local non-root"
+++

This articles presents the most convenient way to deal with global node
packages as non-root user.

By default, `npm install -g` tries to write a root-writable directory and
greets you with:

```
$ npm install -g cypress
[..................] \ fetchMetadata: sill resolveWithNewModule cypress@3.8.3 checking in
[..................] | fetchMetadata: sill resolveWithNewModu
[..................] / fetchMetadata: sill resolveWithNewModule figures@1.7npm
WARN checkPermissions Missing write access to /usr/lib/node_modules
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/lib/node_modules
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, access '/usr/lib/node_modules'
npm ERR!  [Error: EACCES: permission denied, access '/usr/lib/node_modules'] {
npm ERR!   stack: "Error: EACCES: permission denied, access '/usr/lib/node_modules'",
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/lib/node_modules'
npm ERR! }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.
```

You might even try with sudo, then it may work or:

```

$ sudo npm install -g cypress
/usr/bin/cypress -> /usr/lib/node_modules/cypress/bin/cypress

> cypress@3.8.3 postinstall /usr/lib/node_modules/cypress
> node index.js --exec install

Cypress cannot write to the cache directory due to file permissions

See discussion and possible solutions at
https://github.com/cypress-io/cypress/issues/1281

----------

Failed to access /root/.cache/Cypress:

EACCES: permission denied, mkdir '/root/.cache/Cypress'

----------

Platform: linux (Arch Linux - )
Cypress Version: 3.8.3
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! cypress@3.8.3 postinstall: `node index.js --exec install`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the cypress@3.8.3 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /root/.npm/_logs/2020-02-05T21_00_35_648Z-debug.log

```

It's time to copy the practice Python users have with ``pip install --user``
which deploys in ``~/.local``

``~/.local`` is a directory commonly used to store package files without
polluting ``/`` which is not supposed to be writable by non-root users. It will
contain directories such as ``/bin``, `/lib`, `/share`, `/etc`, `/include`,
`/man` ...

The only trick is to bend npm with the `$npm_config_prefix` environment variable
and change `$PATH` and `$NODE_PATH` as such:

```
export PATH=$HOME/.local/bin:$PATH
export NODE_PATH=$HOME/.local/lib/node_modules:$NODE_PATH
export npm_config_prefix=$HOME/.local
```

Then, both `npm install -g` and `pip install --user` will work as your normal
user: you're executing dependencies you've downloaded from internet, you'd like
not to run them as root after all.

```
npm_config_prefix=$HOME/.local npm install -g cypress
```

Then, the cypress command will work, also tried the eslint package and it seems
to work.

Have fun adding nodejs packages to your userland !
