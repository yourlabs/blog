+++
date = "2019-02-14T09:04:20+00:00"
draft = false
tags = ["python", "devops", "ansible", "docker", "docker-compose"]
title = "ansible-compose: deploying docker-compose files over bare ssh"
+++
In kubernetes, we have the joy of applying configuration directly from maintainer repositories:

    kubectl apply -f https://raw.github.../setup.yml

This allows each repository to maintain its own infrastructure configuration as code, and maintaining a core devops framework in between. You will have to deal with particular credentials, that you should use something else to generate and so on.

On the other side of internet, happy docker-composers are also having a lot of fun maintaining them in repositories they contribute to. And there is a new command in town to get a warm automated feeling:

    web_image=your/image ansible-compose user@example.com/home/staging ./docker-compose.yml --sudo
    
So, the first time you deploy a compose in a directory it should be as root, so that it can install docker-compose and create the volume directories that it will have parsed from the docker-compose.yml that it generates.

Wait no more and check all the things this new giant sudo can do on [PyPi](https://pypi.org/project/ansible-compose/) ! It's not super well documented but who knows, maybe it works for you just like it works in [.gitlab-ci.yml](yourlabs.io/oss/ansible-compose/blob/master/.gitlab-ci.yml) !

Have a great day