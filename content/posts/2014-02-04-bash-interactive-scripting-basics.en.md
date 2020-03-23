+++
date = "2014-02-04T01:20:00+00:00"
draft = false
tags = ["linux", "bash"]
title = "Bash interactive scripting basics"
author = "jpic"
+++

A variable looks like this:


{{< highlight bash>}}
    export FOO=bar
{{< / highlight>}}


To get a variable in your interactive shell, source the script that contains it
as such:


{{< highlight bash>}}
    source script_that_contains_FOO
    echo $FOO
{{< / highlight>}}


A function looks like this:


{{< highlight bash>}}
    function foo() {
        echo foo
    }
{{< / highlight >}}


To run a function in your interactive shell, source the script and call the
function like this:


{{< highlight bash>}}
    source script_that_contains_foo
    foo
{{< / highlight>}}


To debug something that's wrapped in a bash function or script, set the `-x` option. To de-activate debugging, set `+x`. Example:



{{< highlight bash>}}
    [env] 04/02 2014 02:17:26 jpic@etta /home/jpic 
    $ source script_that_contains_foo 

    [env] 04/02 2014 02:17:29 jpic@etta /home/jpic 
    $ set -x; foo; set +x
    + foo
    + echo bar
    bar
    + set +x
{{< / highlight >}}


Lines prefixed with a `+` sign are those that are executed by bash. Lines without `+` prefix correspond to output.

Ok, now you can use shell scripting like an interactive framework.
