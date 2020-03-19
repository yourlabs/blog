+++
date = "2013-03-27T12:30:00+00:00"
draft = false
tags = ["linux", "php", "uwsgi", "nginx"]
title = "Drupal 7 with nginx and uwsgi-php example configuration"
+++
[Drupal](http://drupal.org) is a [CMS](http://en.wikipedia.org/wiki/Content_management_system) written in [PHP](http://php.net) which supports [PostgreSQL](http://postgres.org). It is made for [mod_php](http://php.net/mod_php) and [Apache](http://apache.org), thought it works with [uWGSI](http://projects.unbit.it/uwsgi/) and [Nginx](http://nginx.org).

When you have tried uWGSI you know why you want this.

Example nginx configuration:

    server {
        server_name drupal.example.com;
        root /srv/drupal/www/;

        error_log /tmp/nginx_drupal.log;

        index index.php index.html;

        location / { 
            try_files $uri @rewrite;
        }   

        location @rewrite {
            rewrite ^/(.*)$ /index.php?q=$1;
        }   
    
        location ~* files/styles {
            access_log off;
            expires 30d;
            try_files $uri @rewrite;
        }   

        location ~ .php$ {
            include uwsgi_params;
            uwsgi_modifier1 14; 
            uwsgi_pass unix:/tmp/uwsgi_drupal.sock;
        }   
    }   

And an example uwsgi configuration:

    [uwsgi]
    socket=/tmp/uwsgi_drupal.sock
    pidfile=/tmp/uwsgi_drupal.pid
    daemonize=/var/log/uwsgi/drupal.log
    plugins=php

    chdir=/srv/drupal
    cheaper=4
    close-on-exec=1
    harakiri=360
    max-requests=128
    processes=8
    master=1
    uid=drupal
    gid=drupal
    chmod=666
    log-5xx=1
    vacuum=1
    post-buffering=8192
