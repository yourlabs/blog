+++
date = "2015-04-13T14:13:44+00:00"
draft = false
tags = ["linux", "python", "security", "ci"]
title = "Scripted MITM AnyThing in Python with mitmproxy"
author = "jpic"
+++

This article describes how to get a working transparent HTTP/HTTPS proxy which
you can script in Python. I intend to use it to have custom caching and be able
to abstract away all HTTP/HTTPS connections made in my LXC containers which are
spawned by CI to be able to test deployment scripts even when internet is down.
A nice journey ;)

First, install [mitmproxy](https://mitmproxy.org) with pip:

    pip install mitmproxy

[mitmproxy documentation describes the iptables
commands](https://mitmproxy.org/doc/tutorials/transparent-dhcp.html) to
intercept Assuming you have LXC with Nat. Basically, we want iptables to route
all outgoing requests to port 80 (http) and 443 (https) to mitmproxy, it looks
like:

    # Replace lxcbr0 by the bridge interface used by your VMs or LXC containers
    # and 8080 by the port you want to run your mitmproxy on
    iptables -A PREROUTING -i lxcbr0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
    iptables -A PREROUTING -i lxcbr0 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 8080

Now, here's the script we're going to hook in [mitmproxy's inline script's
API](https://mitmproxy.org/doc/scripting/inlinescripts.html) which basically
responds with "Hello World" to every request:

<script src="https://gist.github.com/jpic/82ff94d64663fddece13.js"></script>

Now, run mitmproxy on the host with `-T` to enable transparent proxying and
`-s` to pass our script:

    mitmproxy -T -s yourscript.py 

Install the root ca-certificate on the VMs/containers you want:

    root@test_deb:/# curl -o /etc/ssl/certs/mitm.pem http://mitm.it/cert/pem            
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100   964  100   964    0     0   5507      0 --:--:-- --:--:-- --:--:--  5508
    root@test_deb:/# update-ca-certificates --fresh                               
    Clearing symlinks in /etc/ssl/certs...done.
    Updating certificates in /etc/ssl/certs... 173 added, 0 removed; done.
    Running hooks in /etc/ca-certificates/update.d....done.

Now we're able to intercept any http/https request in `catchall()`:

    root@test_deb:/# curl https://google.com
    Hello, World!
    root@test_deb:/# curl http://yourlabs.org
    Hello, World!
    
Have fun !
