+++
date = "2020-02-08T10:27:00+00:00"
draft = false
tags = []
title = "Python 3.8 AST updates"
+++
On this Friday night, I decided to give my mini Python to
pseudo-Michelson compiler [^1] a little polish. I remembered leaving it
working flawlessly, so that it'd be easy to get back grinding at it
anytime I so desired to. Using the Python AST module as a compiler
frontend, I was sure it'd be pretty stable, unlike Marshall code,
purposely left undocumented [^2].

So I gave my code a go, and somehow, my integration test wasn't working
anymore! What could possibly have gone wrong. I noticed I was using the
Python 3.8 interpreter and that I had only tested my code on Python 3.7.
Could this update contain breaking changes with respect to my code? I
figured if this had been the case, then surely it'd be in the AST
module. I compared the bytecode output I was getting with the one my
test expected and surprisingly, it was not the same! It wasn't pushing
my constants onto the stack when assigning them to variables. A little
more digging, with the help of Python's new `breakpoint()`, until I
noticed that my condition on `ast.Num`, to push a number on the stack,
had been replaced by `ast.Constant`... Hence the weird bug I was
noticing. A little Googling to find that indeed:

> Deprecated since version 3.8: Class ast.Constant is now used for all
> constants. Old classes ast.Num, ast.Str, ast.Bytes, ast.NameConstant
> and ast.Ellipsis are still available, but they will be removed in
> future Python releases. [^3]

Good thing it's now fixed :)

[^1]: <https://github.com/tbinetruy/py-mich>

[^2]: <https://docs.python.org/3/library/marshal.html>

[^3]: <https://docs.python.org/3/library/ast.html#ast.AST.end_col_offset>
