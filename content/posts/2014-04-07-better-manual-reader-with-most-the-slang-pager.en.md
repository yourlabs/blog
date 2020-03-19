+++
date = "2014-04-07T11:30:24+00:00"
draft = false
tags = ["linux"]
title = "Better manual reader with most: the slang-pager"
+++
The default pager in most linux distributions is `more`. But it's not very colorful. This article presents a more fun alternative: `most`.

Your manual probably looks like this:

![](/img/2014-04-07-better-manual-reader-with-most-the-slang-pager/70f904254f1e90de3d01478727f5a7f98d14c0fde359820c198e802e31208470.png)

Not very awesome, wouldn't it be nicer to have it with colors ? like this:


![](/img/2014-04-07-better-manual-reader-with-most-the-slang-pager/2c2cb65fd979a2022b00bb46c8a8afa0c928d24d45abdebf7a9ca5343a6b1f35.png)

Then go ahead and install most, ie.:

    sudo apt-get install most

Try it out:

    MANPAGER=most man man

If you like it, set something like that in your `.bashrc`:

    export PAGER=most
    export MANPAGER=$PAGER