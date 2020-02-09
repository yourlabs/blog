+++
date = "2020-02-08T13:37:00+00:00"
draft = false
tags = []
title = "BigSudo eXtreme DevOps: Hacking Operations"
+++

**[BigSudo](https://pypi.org/project/bigsudo/)** is a command line generator
wrapping around [Ansible](https://ansible.com): the excellent tool for
automating operations which has proven itself in an extremely heterogenic
ecosystem over the course of the last years, and currently maintained by [Red
Hat](https://redhat.com).

**eXtreme DevOps** is when code traditionnaly known as network and infrastructure
operations automation meet continuous integration, merges with continuous
delivery, made it almost trivial to deploy per-branch ephemeral deployments on
each git push, say on `test-$GIT_BRANCHNAME.ci.example.com`, so that the
product team can review a feature during development without forcing the
developer to merge unfinished code into master, in order to keep the master
branch clean and deployable at any moment.

**Hacking Operations** on network and infrastructure means that we are going to
integrate bash scripts into an orchestrator with many expendable strategies.
The orchestrator itself proposes an amazing number of plugins natively and has
a thriving hacking ecosystem: you can even start from a code copy of many of
our BigSudo Ansible roles.

## Plan of operations

This article focuses on a practice where 99.9% uptime is plenty enough and as
such no HA layer is introduced, although HA compatibility is not impossible to
do with a bit of code: not the worries of our current userbase anyway.

However, we adopt eXtreme Programing basics plus custom research or development
in the field, because we need fast and efficient iterations to create more and
faster than competition, or just to spend more time hacking on personal
projects !

Our plan:

- deploy ci (Continuous Integration) server
- deploy production (Live Customers) server
- ensure lifecycle

The CI server is meant to be used by the team, and when reviewing with the
product team. It should have one persistent production-like deployment called
"staging". "Staging" is not meant to be more stable than the CI server itself,
so if the product / business team is going to show the software outside of
production then that deployment should be persistent and happen on the
production server.

## System architecture

The complete installation must be completely automated to keep both CI and
production servers as symmetric as possible, despite their usage will be
different: production needs more disk space, but development needs to be
faster.

As such, the partitioning has to be done manually on both servers unless the
disks are the same size. Using fdisk, mdadm and btrfs on the command line is
perfect.

- `/var/lib/docker`: the btrfs partition volume for Docker, might not be
  necessary, but this is ended becoming a regular automation so I would advise
  going through btrfs on /var/lib/docker

- `/home`: all human user (bob, alice) and project deployment (test, staging,
  production...) data. This should be the largest partition in our setup.

- `/`: well, we don't need /boot because we're booting the default Linux kernel
  which probably shows the default config in /proc anyway so we benefit from no
  protection if `/boot` is not mounted, most likely in this setup 20G is plenty
  enough, but 5 should also work after only docker runs in this setup and data
  accumulates only in `/var/lib/docker` and `/home` as described above

- `swap`: you want disk-time before you can't SSH connect to your server
  anymore when memory becomes insufficient.

- `/backup`: in production, you would want your database to dump which involves a
  disk copy on a different raid array, especially if you have HDDs (production:
  for disk space rather than speed)

Choose a server with sufficient size for 6 months of production, based on
traffic estimates and the likes. You will need to be able to re-install a
server in 30 minutes, after 30 minutes have a definitive ETA (file copy in
progress from remote backup site ?).

## Network architecture

Both of your servers should run with the same domain name ("example.com"), and
different hostnames (`ci`, `production`). The **FQDN** (Fully Qualified Domain
Name) of each server will be composed of hostname dot domain: `ci.example.com`
and `production.example.com`, the latter might also be named `prod.example.com`
in which case it might stand for production. You might want to use the `bigsudo
yourlabs.fqdn @host` command to sort it out with an interacttive wizard.

### SSH

It does not really matter how you bootstrap your server as long as it's
reproducible. My favorite command something in the lines of `bigsudo
yourlabs.ssh someuser@somehost` does that:

- sshd: disable password login, root login
- create our user copy our ssh public key and grant sudo access without
  password

`yourlabs.ssh` also provides a command to add a user given a github username,
this is the command you could do to add me on your server for support:

    bigsudo yourlabs.ssh adduser usergroups=sudo username=jpic @somehost

If your user has a different username on github or published their private key
elsewhere, you will need to type a little more:

    bigsudo yourlabs.ssh adduser usergroups=sudo username=test key=https://gitlab.com/foobar.keys @somehost

Or, you can still do that manually, but doing the same operation manually over
and over might motivate you to script it.

### HTTP

The same load balancer should run on both servers. We use traefik because
it's really well made for the purpose of self configuring dynamically based on
container activity in docker.sock and triumphs of HTTPS thanks to LetsEncrypt.

Again it doesn't matter how you deploy as long as it's reproducible, here's how
i like to do it: `bigsudo yourlabs.traefik @somehost`, it does the following:

- confirm configuration prior to execution (interactive wizard)
- install a docker-compose file from a template into /etc/traefik

The only difference we want is that if we don't want to maintain a wildcard DNS
certificate from LetsEncrypt then the ci server will have not to redirect all
http to https: test deployments which url depend on branch name would otherwise
exhaust the LetsEncrypt monthly ratelimit for certificate generation if there's
a bit of development activity !

### Containers

Docker is used in this setup because it has a great userland, and we're going
to try to rely on default features as much as possible. If you have deployed
Traefik with `bigsudo yourlabs.traefik` then you already have a firewall and
docker is ready, because `yourlabs.docker` is a dependency of
`yourlabs.traefik` and was pulled as such.

`yourlabs.traefik` creates a docker network that you can also create manually,
named `web`, and starts traefik in that. As such, any container spawning in the
web network will become usable by traefik.<

We're going to split our configuration into multiple file so that we can
maintain and reuse them:

- `docker-compose.yml` for basic service configuration, core dependency of the
  following
- `docker-compose.traefik.yml` exposes the stack being the traefik LB
- `docker-compose.persist.yml` persists deployments (staging, production ...)
  on volumes and also enable restart on each service
- `docker-compose.override.yml` for local development, startup command
  overrides, mount source volumes ...
- `docker-compose.basicauth.yml` to enable HTTP basic auth (non-production)
- `docker-compose.maildev.yml` optionnal, adds maildev to the stack

So, the following combinations will be usable:

- production: docker-compose+traefik+persist
- staging: docker-compose+traefik+persist+basicauth+maildev
- ephemeral testing deployments: docker-compose+traefik+basicauth+maildev
- localhost: docker-compose+override

Persistent deployments will be done in a `/home` directory, but ephemeral ones
should not depend on having a directory. Since we still need the docker-compose
file to control ephemeral stacks, we store it somewhere such as
`~/.ephemeral-compose` or `~/.yourlabs.compose` if using `bigsudo
yourlabs.compose`.

Now for ephemeral deployments, you may add a cron or something to
clean old deployment, but otherwise just restarting the CI server and then
running `docker system prune -af` should clean it up because non-persistent
deployments should not have `restart: always` policy.

Still, `bigsudo yourlabs.compose` supports a `lifetime` argument which will
create a file `removeat` next to the copied compose backup with the timestamp
that it should be destructed after. `yourlabs.compose` will also deploy a
systemd timer (with the `yourlabs.timer` ansible role, thanks to bigsudo's
automatic dependency resolution) which will daily check for these lifetime
files on the system and destroy the stacks which lifetime has been reached,
example:

    #!/bin/bash -eu
    for home in /root /home/*; do
        [ -d $home/.yourlabs.compose ] || continue
        pushd $home/.yourlabs.compose &> /dev/null
        for project in *; do
            [ -f $project/removeat ] || continue
            if [[ $(date +%s) -gt $(<$project/removeat) ]]; then
                pushd $project
                docker-compose down --rmi all --volumes --remove-orphans
                popd &> /dev/null
                rm -rf $project
            fi
        done
        popd &> /dev/null
    done

### Infrastructure code

The ansible directory should contain a `deploy.yml` (you might find "site.yml")
playbook which orchestrates the deployment work:

- send a ChatOps notification (ie. Slack)
- add a logrotate configuration if necessary
- include the backup receipe to make a backup and update backup scripts
- generate a docker-compose file and spawn it on the server
- execute healthchecks

#### Backup receipe

It is based on a handful of scripts:

- `backup.sh`: dump data from container, add them to the encrypted backup repo,
  mirror repo
- `restore.sh`: download repo from mirror if repo is absent and print the list
  of backups,
- `restore.sh <backup-id>`: extract backup from repo, re-create containers and
  load data into them
- `prune.sh`: apply the retencion policy, cleans old backups.

So, obviously the backup receipe should install missing packages (restic ? lftp
?), create the persistent directories, generate and upload the backup lifecycle
management scripts. Also: automate a backup so that you can still rollback
after deploying a problematic data migration.

#### Check

A basic check at the end of a deployment will help eliminate false-positives,
ie.: container stack started, but service not actually starting right. This is
something we want to catch with a non-infinite loop at least with curl, so that
we can return the proper exit code from `deploy.yml` or whatever we name our
deployment script. The point is integration in the continuous integration
pipeline as such the return call is critical: work on eliminating false
results.

A nice technique is to generate a random id, add it to the URL we are going to
test, then your check receipe could grep it out of the load balancer logs: try
to automate as much as possible on your way. If you find yourself always doing
the same thing after a deployment fail result like connecting and grepping log:
go ahead and automate it too.

## Lifecycle

### Continuous Integration

As a developer, I am responsible for the deliveries I make myself to the
"production" platform in the hands of end users. As such, my work on a feature
finishes not after I push a patch in a branch, not after it has passed tests,
not after it was deployed into production, but after I have investigated on the
effects of my patch in production: did it cause significant performance
regression ? how can I measure the impact on the user base ?

But, prior to doing deployments, ensure that your systems have properly
integrated new upstream versions: do the package update and upgrade operations
and ensure services are functionnal after a reboot, first on the staging server
and once that succeeds fully then on the production server.

Deployments must be as small and often as possible (objective 10 deploys a
day), rather than big and once in a month or week.

When you write data migrations there will be a good chances you enjoy the
`restore.sh` script after an unexpected data migration input or something (ie.
we have injected legacy data in production).

In the pipeline, any breaks or step that takes more than 5 minutes should be
reviewed, considered as "impediments". A typical pipeline for a full project
should not exceed 25 minutes from master to production.

It's okay if you wrap the line that connects through SSH in a one-liner in a CI
script, something like this for example would be fine:

    mkdir -p ~/.ssh; echo "$SSH_KEY" > ~/.ssh/id_ed25519; echo "$SSH_FINGERPRINTS" > ~/.ssh/known_hosts; chmod 700 ~/.ssh; chmod 600 ~/.ssh/*

You can use the `yourlabs/ansible` image which contains ansible, bigsudo and
the whole [yourlabs role distribution](https://galaxy.ansible.com/yourlabs/).

### Continuous Deployment

The default stages proposed by GitLab are "build", "test" and "deploy": any job
can run in parallel in one stage, but one stage starts only if the previous one
completes with success. The system will be similar in all CI executors except
minor tradebacks: CircleCI has multi root pipeline but is proprietary for
example.

Instead, deploy a CI executor manually on the ci server which we already have
configured for btrfs. It doesn't matter if you deploy GitLab CI or Drone CI or
anything else: only the practice itself matters.

Sharing the docker instance between the many deployments happenning on the CI
server itself saves from a lot of network connections as thanks to
Copy-on-Write is pretty blazing fast:

- build image with server side, frontend and all other business loging and
  interface dependencies
- execute unit tests, qa, static analysis, dependency analysis of that image
- ephemeral (7 days) deployment to test-branchname.ci.example.com every push
- execution of browser tests (ie. cypress) on that deployment

On merge to master:

- build image, should benefit from cache from the above
- execute tests again to test the merge commit
- deploy persistent stack: staging.ci.example.com
- run browser tests on staging.ci.example.com
- push image to gitlab repo or other private registry
- shows "click to deploy to training" button

On click "deploy to training":

- deploy persistent stack: "training.example.com"
- show "click to deploy to production" button: that will be fast since the pull
  on the master server docker storage should have been provided by the
  "training" deployment

### System monitoring and alerting

It doesn't matter what you use as long as it's reproducible / scripted between
your two servers. I maintain my own in `bigsudo yourlabs.netdata @somehost`, it
will ask if you use something like Slack for your webhook URLs so that you can
get alerting from Slack and Telegram for example. Netdata will warn you if it
calculates that your disk drive will be full in 7 hours for example.

Ideally, you'd configure each netdata to monitor the other, then you don't need
an external uptime monitoring service. Netdata is great at alerting prior to
catastrophies, but how you respond to them is another story.

Netdata is great at discovering services running on a server: it will monitor
every postgresql database it finds. Note that it won't look for databases
inside containers, which is one of the reasons why you'd rather have postgresql
running on the host server for your production deployment.

### Database

Database process such as postgres are not ment for running inside containers,
they don't support being killed after N seconds which is what Docker does to
containers some times, so that's something to be pretty careful with. However,
this is never a problem in most projects so always be careful to verify your
backups prior to operating on a database or file system.

It's a bit tricky to setup monitoring on databases running inside docker too,
so you should favor not containerizing your production database.

## Source code

You can find source code matching this practice on github.com/betagouv/mrs

## Future

I'd like to have less configuration files in the future, if only I could have a
nice little Python framework to replace my Dockerfile and docker-compose files
which would support ephemeral deployments and backup/restore as well as custom
operations out of the box
... well that's what I'm currently working on in yourlabs.io/oss/podctl
