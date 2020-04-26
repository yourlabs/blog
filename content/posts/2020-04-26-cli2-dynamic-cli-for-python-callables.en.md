+++
date = "2020-04-26T13:37:00+00:00"
draft = false
tags = []
title = "cli2: Dynamic CLI for Python objects"
author = "jpic"
+++

[![image](https://yourlabs.io/oss/cli2/badges/master/pipeline.svg)](https://yourlabs.io/oss/cli2/pipelines)
[![image](https://codecov.io/gh/yourlabs/cli2/branch/master/graph/badge.svg)](https://codecov.io/gh/yourlabs/cli2)
[![image](https://img.shields.io/pypi/v/cli2.svg)](https://pypi.python.org/pypi/cli2)

Break free from the POSIX standard for more fluent CLIs, by exposing
simple Python functions or objects with a minimalist argument typing
style, or building your own command during runtime. For me, it's in between
[google/python-fire](https://github.com/google/python-fire),
[microsoft/knack](https://github.com/microsoft/knack), and Django.

## Demo

Before becoming a generic CLI framework, back 10 rewrites prior to the latest
release, cli2 was supposed to just bring Python callables on the CLI without
even a single line of code:

```
cli2 path.to.your.callable arg1 kwarg1=value
```

This command was implemented again in this 10th rewrite of the CLI
engine extracted from Playlabs, however this implementation features
something pretty funny: cli2 is a Group subclass which overrides the
default Group implementation based on the first argument passed on the
command line.

Basically, when you call `cli2 path.to.module`, it will load a Group of
name `path.to.module` which loads one Command per callable in
`path.to.module`.

When you call `cli2 path.to.function` it will execute the function.

When you call `cli2 path.to.object`, it will expose methods as sub-commands.

So, that's why "Dynamic CLIs for Python objects" defines cli2 pretty well !

Read on to get started making your own CLIs with the cli2 framework.

## Getting Started

You can either create a Command from a callable that can invoked
directly or via `console_script`:

```python
def yourcmd():
    """Your own command"""

# good enough for your console_script entry_point
console_script = cli2.Command(yourcmd)

# without entry_point, you can call yourself
console_script()
```

### Command group

In the same fashion, you can create a command Group, and add Commands to
it:

```python
# or create a command group group
console_script = cli2.Group()

# and add yourcmd to it
console_script.cmd(yourcmd)

# or add a Command per callables of a module
console_script.load(your.module)

# and/or add from an object to create a Command per method
console_script.load(your_object)
```

### Type-casting

Type hinting is well supported, but you may also hack how arguments are
casted into python values at a per argument level, set the
`cli2_argname` attribute to attributes that you want to override on the
generated Argument for `argname`.

You could cast any argument with JSON as such:

```python
def yourcmd(x):
    return x
yourcmd.cli2_x = dict(cast=lambda v: json.loads(v))

cmd = Command(yourcmd)
cmd(['[1,2]']) == [1, 2]  # same as CLI: yourcmd [1,2]
```

Or, override `Argument.cast()` for the `ages` argument:

```python
def yourcmd(ages):
    return ages
yourcmd.cli2_ages = dict(cast=lambda v: [int(i) for i in v.split(',')])

cmd = Command(yourcmd)
cmd(['1,2']) == [1, 2]  # same as CLI: yourcmd 1,2
```

If an argument is annotated with the list or dict type, then cli2 will
use json.loads to cast them to Python arguments, but be careful with
spaces on your command line: one sysarg goes to one argument:

```
yourcmd ["a","b"]   # works
yourcmd ["a", "b"]  # does not because of the space
```

However, space is supported as long as in the same sysarg:

```python
subprocess.check_call(['yourcmd', '["a", "b"]')
```

### Typeable syntax

Arguments with the list type annotation are automatically parsed as
JSON, if that fails it will try to split by commas which is easier to
type than JSON for lists of strings:

```
yourcmd a,b  # calls yourcmd(["a", "b"])
```

Keep in mind that JSON is tried first for list arguments, so a list of
ints is also easy:

```
yourcmd [1,2]  # calls yourcmd([1, 2])
```

A simple syntax is also supported for dicts by default:

```
yourcmd a:b,c:d  # calls yourcmd({"a": "b", "c": "d"})
```

The disadvantage is that JSON decode exceptions are swallowed, but by
design cli2 is supposed to make Python types more accessible on the CLI,
rather than being a JSON validation tool. Generated JSON args should
always work though.

### Boolean flags

Cast to boolean is already supported by type-hinting, or with json (see
above example), or with simple switches:

```python
def yourcmd(debug=True):
    pass

# prefixing dash not necessary at all
yourcmd.cli2_debug = dict(negate='-no-debug')

# or map this boolean to two simple switches
yourcmd.cli2_debug = dict(alias='-d', negate='-nd')
```

## Edge cases

Simple and common use cases were favored over rarer use cases by design.
Know the couple of gotchas and you'll be fine.

### Args containing `=` in Mixed `(*args, **kwargs)`

It was decided to favor simple use cases when a callable both have
varargs and varkwargs as such:

```python
def foo(*args, **kwargs):
    return (args, kwargs)
```

Call `foo("a", b="x")` on the CLI as such:

```
foo a b=x
```

**BUT**, to call `foo("a", "b=x")` on the CLI you will need to use an
asterisk with a JSON list as such:

```
foo '*["a","b=x"]'
```

Admittedly, the second use case should be **extremely** rare compared to the
first one, so that's why the first one is favored.

For the sake of consistency, varkwarg can also be specified with a
double asterisk and a JSON dict as such:

    # call foo("a", b="x")
    foo a **{"b":"x"}

### Calling with `a="b=x"` in `(a=None, b=None)`

The main weakness is that it\'s difficult to tell the difference between
a keyword argument, and a keyword argument passed positionnaly which
value starts with the name of another keyword argument. Example:

```python
def foo(a=None, b=None):
    return (a, b)
```

Call `foo(b='x')` on the CLI like this:

```
foo b=x
```

**BUT**, to call `foo(a="b=x")` on the CLI, you need to name the
argument:

```
foo a=b=x
```

Admitadly, that\'s a silly edge case. Protect yourself from it by always
naming keyword arguments ...

... Because the parser considers token that start with a keyword of a
keyword argument prioritary to positional arguments once the positional
arguments have all been bound.

Have fun !
