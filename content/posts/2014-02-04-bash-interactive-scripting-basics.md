+++
date = "2014-02-04T01:20:00+00:00"
draft = false
tags = ["linux", "bash"]
title = "Bash interactive scripting basics"
+++
A variable looks like this:

<pre class="sh_shell">
    export FOO=bar
</pre>

To get a variable in your interactive shell, source the script that contains it
as such:

<pre class="sh_shell">
    source script_that_contains_FOO
    echo $FOO
</pre>

A function looks like this:

<pre class="sh_shell">
    function foo() {
        echo foo
    }
</pre>

To run a function in your interactive shell, source the script and call the
function like this:

<pre class="sh_shell">
    source script_that_contains_foo
    foo
</pre>

To debug something that's wrapped in a bash function or script, set the `-x` option. To de-activate debugging, set `+x`. Example:


<pre class="sh_shell">
    [env] 04/02 2014 02:17:26 jpic@etta /home/jpic 
    $ source script_that_contains_foo 

    [env] 04/02 2014 02:17:29 jpic@etta /home/jpic 
    $ set -x; foo; set +x
    + foo
    + echo bar
    bar
    + set +x
</pre>

Lines prefixed with a `+` sign are those that are executed by bash. Lines without `+` prefix correspond to output.

Ok, now you can use shell scripting like an interactive framework.
