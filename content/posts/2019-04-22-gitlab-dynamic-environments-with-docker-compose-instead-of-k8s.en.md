+++
date = "2019-04-22T07:34:26+00:00"
draft = false
tags = ["gitlab", "continuous-delivery", "best-practice"]
title = "GitLab Dynamic Environments with Docker-Compose instead of K8S"
author = "jpic"
+++

[Dynamic Environment](https://docs.gitlab.com/ee/ci/environments.html#configuring-dynamic-environments) is when your pipeline creates a branchname.example.com deployment, for integration tests or manual review. 

Gitlab in autodevops mode and with Kubernetes lets you enjoy this kind of stuff by just starting projects from their template images. Note that YourLabs offers consulting if you need help to setup/maintain your baremetal K8S or GitLab instance to do this kind of thing. (Please forgive [horrible sound recording in our demo](https://www.youtube.com/watch?v=tAsg0AgTaMk))

This article however, demonstrates how to acheive dynamic environments for integration testing and reviews with the product team with just docker-compose and nginx-proxy.

Our dynamic enviroment deployment, in this case for PHP, looks as such in .gitlab-ci.yml:


{{< highlight docker>}}
    test:
      # The dynamic enviromnent definition, used by GitLab to provision the
      # user interface
      environment:
        name: test/$CI_COMMIT_REF_NAME
        url: http://$CI_COMMIT_REF_SLUG.yourproject.yourci.example.com

      # Use a shell Gitlab-CI executor
      tags: [shell]

      # Cache Composer dependencies (PHP package manager)
      cache:
        key: ${CI_COMMIT_REF_SLUG}
        paths:
        - www/vendor
        - jev.fr/vendor

      script:
      # For debug purposes
      - echo $CI_ENVIRONMENT_URL

      # Some variable that nginx-proxy depends on to auto-update its
      # configuration, we're going to rely on it as well
      - export VIRTUAL_HOST=${CI_COMMIT_REF_SLUG}.yourproject.yourci.example.com

      # This secures the deployment with basic auth, so that bots will not
      # reference those domains (for nginx-proxy), requires the following in sudoers:
      # gitlab-runner ALL=(ALL) NOPASSWD: /bin/cp /home/nginx/htpasswd/jev.ci.yourlabs.io /home/nginx/htpasswd/*
      - sudo cp /home/nginx/htpasswd/reference /home/nginx/htpasswd/$VIRTUAL_HOST

      # Also cool to have if your project support it
      - export SENTRY_DSN=$DEV_SENTRY_DSN

      # We have nginx-proxy, so copy our compose that works with our
      # nginx-proxy deployment to extend the base compose that we have in this
      # repository
      - cp docker-compose.nginx.yml docker-compose.override.yml

      # This is a command of mine, that you can replace by chaining
      # docker-compose commands pull,build,down,up -d,logs,ps
      - compoctl apply

      # Ok so this example is a PHP-spaggetti code that we decided to quickly
      # cover with tests by combining pytest+requests+requests-html
      - pip3 install -U --user -r tests/requirements.txt

      # Wait for the project to be up, in our case production is on a shared
      # PHP host (lol) so it's the dockerfile cmd that installs the vendor and
      # stuff that takes a while to load, hopefuly with a modern codebase you
      # won't have such poison to deal with
      - i=150; until [ $i = 0 ]; do i=$((i-1)); if docker-compose logs php | grep '+ apache2-foreground'; then break; fi; sleep 1; done; [ $i != 0 ]

      # This will execute our tests on $VIRTUAL_HOST
      - ~/.local/bin/py.test --showlocals --full-trace -s -vv tests
{{< / highlight >}}


For the record as this is a closed source project I can't just link to, we have a README that says, for localhost to have this
docker-compose.override.yml, which has the sole purpose to port forward:


{{< highlight docker>}}
    version: '3.5'
    services:
      php:
        ports:
        - target: 80
          published: 80
          mode: host
{{< / highlight >}}


And of course for dynamic enviromnents we have a
[nginx-proxy](https://github.com/jwilder/nginx-proxy) docker-compose deployment on a shared docker network called "nginx". It watches docker.sock for new containers that have VIRTUAL_HOST env var, so the docker-compose.nginx.yml refered above has the sole purpose of connecting containers with the "nginx" docker network, it contains the following::


{{< highlight docker>}}
    version: '3.5'

    services:
      php:
        networks:
        - nginx
        - site

      mysql:
        networks:
        - site

    networks:
      nginx:
        external:
          name: nginx
      site:
{{< / highlight>}}


As you can see, we got dynamic environments with integration tests for pretty cheap, compare the cost of a hosted K8S infra that you would use just for testing, and the cost of a simple baremetal box running a gitlab-ci executor. 

We also use review environment so that the product team can validate before even sending to staging. That works well with an offensive CD strategy which means that staging should spend most of its time being only one feature being production and not for long.

One last thing: gitlab-ci is going to want to clean the build dir, where docker may have caused write of files that gitlab-runner does not have permission to clean up. Our solution for this is:

    /usr/bin/setfacl -R -m u:gitlab-runner:rwx /var/lib/gitlab-runner/
    
Read more about [Linux ACL](https://wiki.archlinux.org/index.php/Access_Control_Lists).
