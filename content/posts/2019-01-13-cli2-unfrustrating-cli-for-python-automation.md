+++
date = "2019-01-13T14:19:31+00:00"
draft = false
tags = ["python", "cli2"]
title = "cli2: unfrustrating CLI for Python automation"
+++
Sometimes I just want to execute a python callback and pass args/kwargs on the CLI, and not have to define any custom CLI entry point of any sort, nor change any code, typically when automating stuff, [cli2](https://pypi.org/project/cli2/) unfrustrates me (pun intended):

```
    cli2 yourmodule.yourcallback somearg somekwarg=foo
```

Sometimes I just want to define a new command and expose all callables in a module and I can't just do it with a one-liner. [cli2](https://yourlabs.io/oss/cli2) unfrustrates me again:

```
   console_script = cli2.ConsoleScript(__doc__).add_module('mymodule')
   # then i add console_script entrypoint as such: mycmd = mycmd.console_script
```

I also like when readonly commands are in green, writing commands in yellow and destructive commands in red, I find the commands list in the help output more readable, and directive for new users of the CLI:

```
   @cli2.config(color=cli2.RED)
   def challenge(dir):
      '''The challenge command dares you to run it.'''
      os.exec('rm -rf ' + dir)
```

Of course then there's all this code I need to have coverage for and I'm
[still](https://pypi.org/project/django-dbdiff) so lazy that I still [don't write most of my test code myself](https://pypi.org/project/django-responsediff/), so I throwed an autotest function in cli2 that I can use as such:

```
   @pytest.mark.parametrize('name,command', [
       ('cli2', ''),
       ('help', 'help'),
       ('help_debug', 'help debug'),
       # ... bunch of other commands
       ('debug', 'debug cli2.run to see=how -it --parses=me'),
   ])
   def test_cli2(name, command):
       cli2.autotest(
           f'tests/{name}.txt',
           'cli2 ' + command,
       )
```

This got me to 86% coverage in 3 minutes. How so ?

Well, it will execute the command and compare with the contents in the test text file with GNU or busybox diff and fail if there's a diff. If the file doesn't exist then it will create it and fail because it created the fixture. I can just rm -rf my tests dir and run pytest again, and use git diff to see what has changed.

You should be able tho pip install cli2 and start using the cli2 command, or cli2.ConsoleScript to make your own commands.

[![asciicast](https://asciinema.org/a/221137.svg)](https://asciinema.org/a/221137)

Njoy yet another choice for CLI in Python :)