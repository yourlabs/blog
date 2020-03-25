+++
date = "2015-03-08T19:52:33+00:00"
draft = false
tags = ["arch", "linux", "postgresql"]
title = "YourLabs Arch Linux Package Repository"
author = "jpic"
+++

Today is the grand openning of our Arch Linux package repository, with the release of postgresql-bdr. It's a patched PostgreSQL server with BiDirectionnal Replication which seems too good to be true. I ran split brain tests and it reacted amazingly well, although it needs all nodes to be up for schema updates which is ok to me because I won't be running upgrades while I have a broken node: I'll be working on fixing it.

Anyway, don't take my word for it and try it for yourself, something like this would probably work from an Arch box:

    pip install ansible
    sudo pacman-key --recv-keys 1CD82FF6
    sudo pacman-key --lsign 1CD82FF6
    sudo ansible-galaxy install soplakanets.hosts
    sudo ansible-galaxy install jpic.pacman
    sudo ansible-galaxy install jpic.gpg
    git clone https://github.com/jpic/jpic.pg.git
    cd jpic.pg
    vagrant up bdr1 bdr2
