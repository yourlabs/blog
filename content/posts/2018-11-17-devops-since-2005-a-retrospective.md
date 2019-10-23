+++
date = "2018-11-17T16:30:25+00:00"
draft = false
tags = ["python", "ansible", "best-practice"]
title = "DevOps since 2005: a  retrospective"
+++
This article shares some history of DevOps testing in France during the last few years. How it looked like when I started in the industry in 2004 and almost 15 years later today.

## Background

Just a 1337c0d3 that somehow made it so far with the help of a lot of shadow hacking, now somewhat known as "DevOps" in some places ...

### Pre-DevOps era: the obscurity

In 2004 i was hacking for [Jouve](https://www.jouve.com/) which had high tech digital printers which meant that they could make small batches of books, at the time where the market was filled with offset printers that made the minimal batch have to be 1500 or something.

Under the lead of Juan Arias, coaching from Jerome Saada, I coded a PHP website in 3 months where visitors could make their own quote to autopublish their book in small quantities. 

Needless to say, it was with the help of hundreds of hackers answering my questions on internet. So, that explains why I still give back to the great internets and answer questions myself - and I'm still pretty active on git :)

Anyway, the last day, we send a zip folder with the source code and then it was online after a little time. I had absolutely no idea of what was happening being the email. After I was assigned on WinDev development and after a while decided to quit and start to practice exclusively with Open Source Software and their community !

In 2005 it was the time where [Dedibox](https://online.net) started to offer dedicated servers for 15 bucks a month or something. I was already using Linux and compiling kernels because some pirate told me to use Debian, and then to not try Gentoo Linux because I was a noob, I said oh ok I will Gentoo Linux you !!!!! 

### Freelance: Bashworks on Gentoo

At some point with the help of [@neofutur](http://github.com/neofutur) (who is now with YourLabs !), and another hacker called m3t4ph4z3, and after spending sometimes a week installing a Gentoo Linux server, I had a little hosting business going on hardened gentoo with grsecurity and linux vserver, which meant sometimes merging the patches myself to get latest version of Linux+GrSec+VServer ... at 19 years old without any college degree it sure meant lots of determination even though I learned C at 9 years old, I was honnestly a big noooob :D

I had a build server building [binpkgs](https://wiki.gentoo.org/wiki/Binary_package_guide) for three distros derived from Gentoo:

- one for my laptops
- one for the host server
- one for the vserver guests

In 2009 ended up refactoring my bash scripts into a [mini framework](https://github.com/jpic/bashworks) with a bunch of modules (including [one for cracking wifis lawls](https://github.com/jpic/bashworks/blob/master/wepcrack/functions.sh)) and of course: [one for dealing with my little VPS](https://github.com/jpic/bashworks/blob/master/vps/functions.sh), that repo had only one pull request and wow, what a PR, I guess I had no idea how to comment back then and just merged it when I could without understanding most of it :D

### Chef to Ansible

The first deployment integration testing framework I used was [test-kitchen](https://kitchen.ci/) when I was doing [Chef](https://www.chef.io/chef/) code at a hosting provider back in early 2014s.

The developer experience was amazing with Chef cookbooks, they have rubocop, test-kitchen, and also cookbooks can be unit tested with mocks and the like. After a month, I hadn't find a good way to orchestrate Chef in Chef for some reason and at that time our coworkers suggested using chef-metal but not yet because it wasn't ready.

That's how I ended using Ansible to automate deployment for all OpenStack services + my own (NATaas, Firewallaas, LBaas, VPNaas were the 4 services I had developed based on Numergy's specifications for high security). In my first month in Ansible, I had coded the infra based on the configuration that other level 3 were maintaining on a wiki.

Unfortunnately, the rest of the level 3 team didn't keep up and decided to veto the first of a month-full planning of deployments that we had baked with the level 2 team. Also there was a policy to use Chef despite that nobody could orchestrate it as well as a Human being or Ansible would.

Ansible really gave me the passion for automation, and I started automating everything even for my own laptop, I would do everything in a playbook and apply it. Today I recon this was large overkill, but that was so much fun I can't regret it !

Anyway, a couple of years later they invited me to a party ! and level 2 friend told me they had acheived to have the same software versions and configurations on both production and staging ... thanks to the playbooks ! you can't imagine how much joy I had for them to make it to have a "preprod iso prod" !

Another anecdote from this wicked party about shadow IT. A friend from sales told me they loved a software that I did in "shadow" back then, which means without receiving a specific order for that software, it just automated my own work ... a command line to manage the customer infrastructure, users, projects/tenants. Like the 4 OpenStack agents I developed there (NATaaS, FWaaS, LBaaS, VPNaaS), it was inheriting from the OpenStack Python API like a framework, with our overrides, to create/update/drop complete tenants with a single command. And the drop one took care of the dependencies in the appropriate order ... (tenant networks, interfaces, vms...).

### From SaltStack to Ansible

In late 2015 I joined PeopleDoc, one of the most hacker-friendly companies in France, with the mission to maintain a core Continuous Delivery pipeline given a SaltStack recipe repository. The stack: jenkins, saltstack, LXC which I was also in charge of [training the hackers in the company for](https://tech.people-doc.com/lxc-demystification-fr.html).

After a couple of months we had a CI server and a pipeline to test every role against LXC, and I kept adding optimization and documentation over time. I believe we took the situation we had as far as possible, with notable help from a dear friend and former collegue, one of the best hackers I know. That means, we had wrapped SaltStack in our own command to ensure there would be no false-positive nor false-negatives in production pipelines and reached 99.9% of success in that, "the truthness of pipeline outcome".

But we were somewhat still blocked for several reasons:

- SaltStack's master/minion mode required that every contributions would update the master, the repo contained recipes for all the products in the company and there were hundreds of contributors,
- deployment for all products was all too tightly coupled which means a patch someone wanted to push for their product could break deployment of another product,
- this made iterations super slow because of that tight coupling, one could not push new features if, for a reason or another, all recipes were passing, otherwise the other product that had an impediment on their deploy code would not be able to update in production anymore ...
- Little orchestration features / strategies, we had already started using salt-run in masterless mode and foreground to at least be able to have some orchestration in Bash. We also had configured salt reactor but quite frankly it was spawning jobs as background processes which made it not easy to deal with.

So, I investigated amongst happy salt users I had the chance to meet at conferences. One demonstrated code they have to make an HTTP API to orchestrate salt-runs, that had shell-injection vulnerabilites (but they told me it was ok because the API consumers will sanitize input for them ...)

Anyway, back at PeopleDoc I proposed to write a simple web service to monitor Salt runs and orchestrate them, because that seemed to be the only way to move forward. We didn't proceed with this proposal, and instead started orchestrating our salt-runs with Ansible itself ...

An interresting anecdote is that one saltstack core-dev I pushed to hire as a contractor was maintaining his PaaS in Salt, but he was still there when we started orchestrating our salt in Ansible ... 

Needless to say, he's migrated what he most maintains to Ansible and appears to have left the SaltStack core development team.

## Testing Ansible

So, at this point we kept on moving forward to adopting ansible: I would visit each product team one by one and pair code with one of them to migrate their salt call from the company-wide recipe repository into their own project repository.

Of course we wanted to keep having deployment pipelines over several environments. There was no test tool at the time, well, except Molecule that was 1 month old or something like that. We already had an LXC infrastructure to actually do the work, and the [official Ansible Testing Strategies guide](https://docs.ansible.com/ansible/latest/reference_appendices/test_strategies.html) describes the concepts for testing Ansible with Ansible, but does not demonstrate a specific pattern, except in Ansible's own test code. 

So I put together a [quick ansible role](http://github.com/peopledoc/ansible-role-boot) that would create system containers with [LXC on the fly](https://github.com/peopledoc/ansible-boot-lxc/), and another one [for lxd](https://github.com/peopledoc/ansible-boot-lxd/) that works as such, with a test.yml file containing:

```
---

- hosts: localhost
  become: true
  become_user: root
  become_method: sudo
  pre_tasks:
  - add_host: name=testboot.lxd lxd_alias={{ lookup('env', 'LXD_ALIAS', 'alpine/3.4/amd64' ).strip(',') }}
  roles:
  - peopledoc.boot-lxd

- hosts: testboot
  roles:
  - yourroletotest
```

Note that instead of "yourroletotest" you can have a relative path, such as "." if the above test.yml playbook is at the root of a role to test.

In the [talk about Molecule](https://www.ansible.com/infrastructure-testing-with-molecule) they make the following list of pros and cons for Testing Ansible with Ansible (minute 18 of the talk):

Benefits: 
- as flexible and powerful as you need it to be.

Issues:

- high development cost ("not invented here"),
- assertions in production code can lead to unexpected failures
- Ansible can't detect bugs in Ansible
- need to write your own provisionner.

I have to say that I don't find it very persuasive to be honest.

### "Assertions in production can lead to unexpected failures"

For me, your deployment code should always try to prevent failure, or fail without leaving the infra broken. So there's two things:

- preflight check tasks
- grouping tasks, ie.: preflight, backup, setup, deploy, healthchecks, display logs

### Ansible can't detect bugs in Ansible

In this case two solutions are possible, implement another engine, or use different modules from the engine to validate previous module execution.

Of course, there are still chances that all modules are bugged, but there's less chance to have a bug overall because there is less code involved with only Ansible.

That's specially a why deployment should [repeat healthcheck until they work and display logs anyway](https://yourlabs.io/oss/playlabs/blob/master/playlabs/roles/project/tasks/main.yml#L156-217).

BTW, I love the feature of displaying logs after the healthchecks, this has saved me so much time because most of the time the error is in the logs, so having them in your deployment job output is awesome. I suggest you try and let me know how that works for you ;)

### "high development cost" / Need to write your own provisionner

The cost of developing Ansible is un-cuttable, and so is the cost of supporting containerized deployment since that's what we used for developer machines. 

As such, running the playbooks on containerized hosts in CI has an extra cost of 0. It's all about repeating the interface you have when deploying in production, if it's an SSH server then an SSH server in LXD will do fine.

#### Little cost compare

To compare the cost of using Molecule overall and testing Ansible with Ansible, let's overview the SLOC number for each solution.

Consider a [hundred SLOCs provisionner role](https://github.com/peopledoc/ansible-boot-lxd/blob/master/tasks/main.yml):

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
YAML                             6             23              1            180
-------------------------------------------------------------------------------
SUM:                             6             23              1            180
-------------------------------------------------------------------------------
```

Well, there's just requirement for the boot role method: have ansible and lxc or lxd working, for which we had a standalone bash script that works both to setup a developer machine, a control host, or to provision CI, with custom ansible versions or branches, and that contained so dirty optimisations that could easily have been dropped by the next maintainer, in 239 SLOC:

```
$ cloc ansible-setup 
       1 text file.
       1 unique file.                              
       0 files ignored.

github.com/AlDanial/cloc v 1.80  T=0.00 s (231.2 files/s, 77899.2 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Bourne Again Shell                1             51             47            239
--------------------------------------------------------------------------------
```

Another requirement is to have a functional ssh-agent, but that's something for another mini role [peopledoc.ssh-agent](https://github.com/peopledoc/ansible-ssh-agent) in 90 SLOCs:

```
github.com/AlDanial/cloc v 1.80  T=0.00 s (1133.5 files/s, 24257.6 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
YAML                             5             15              2             90
-------------------------------------------------------------------------------
SUM:                             5             15              2             90
-------------------------------------------------------------------------------
```

Compare to Molecule:

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Python                          70           2101           3837           5107
YAML                            31            130             71           1113
Markdown                         1             14              0             34
JSON                             4              1              0             27
Ruby                             1              1              1              5
-------------------------------------------------------------------------------
SUM:                           107           2247           3909           6286
-------------------------------------------------------------------------------
```

Talking about development cost, we're comparing a 180+239+90=509 SLOC solution composed of three loosely coupled components that made sense on their own, with a tightly coupled 6286 SLOC solution, that's an x12 ratio for the test stack, without counting testinfra.

So from that perspective it seems testing ansible with ansible is still relevant.

#### Comparing test code

But that's only for the testing tool. We have the chance that Molecule was added to that provisioning role that was used both for development and automated testing in a little role: [peopledoc.boot-lxc](https://github.com/peopledoc/ansible-boot-lxc/), we will study this use case too. 

This case is a little bit particular because we're testing the provisionner itself, this is what we had, a test.yml:

```
----

- hosts: localhost
  become: true
  become_user: root
  pre_tasks:
  - add_host:
      name: testboot.lxc
      groups: testboot
      lxc_container_config:
      - "lxc.mount.entry={{ playbook_dir }} srv none defaults,bind,create=dir,uid=0 0 0"
  roles:
  - .

- hosts: testboot
  tasks:
  - name: Check that bind mount works, with a bit of inception
    shell: grep inception /srv/test.yml
```

So, at the end of execution we test that we can SSH on the host that we created, and that we can find the word "inception" that comes from the "grep inception" itself. Then, test.yml was removed and instead we can see in the repo, a whole molecule/default directory:

```
$ tree
.
├── create.yml
├── destroy.yml
├── INSTALL.rst
├── molecule.yml
├── playbook.yml
├── prepare.yml
├── setup_dnsmasq.sh
└── tests
    ├── canary
    └── test_default.py
```

``create.yml`` configures molecule:

```
---
- name: Create
  hosts: localhost
  connection: local
  gather_facts: false
  no_log: "{{ not lookup('env', 'MOLECULE_DEBUG') | bool }}"
  vars:
    molecule_file: "{{ lookup('env', 'MOLECULE_FILE') }}"
    molecule_ephemeral_directory: "{{ lookup('env', 'MOLECULE_EPHEMERAL_DIRECTORY') }}"
    molecule_scenario_directory: "{{ lookup('env', 'MOLECULE_SCENARIO_DIRECTORY') }}"
    molecule_yml: "{{ lookup('file', molecule_file) | molecule_from_yaml }}"
  tasks: []
```

``destroy.yml`` as well:

```
---
- name: Destroy
  hosts: localhost
  connection: local
  gather_facts: false
  no_log: "{{ not lookup('env', 'MOLECULE_DEBUG') | bool }}"
  vars:
    molecule_file: "{{ lookup('env', 'MOLECULE_FILE') }}"
    molecule_instance_config: "{{ lookup('env', 'MOLECULE_INSTANCE_CONFIG') }}"
    molecule_yml: "{{ lookup('file', molecule_file) | molecule_from_yaml }}"
  tasks: []
```

The molecule.yml file defines a couple of linter calls that could as well just have been added to .travis-ci.yml:

```
$ cat molecule.yml
---
dependency:
  name: galaxy
driver:
  name: delegated
  options:
    ansible_connection_options:
      connection: local
lint:
  name: yamllint
  enabled: False
platforms:
  - name: delegated-travis-instance
provisioner:
  name: ansible
  options:
    vvv: True
  inventory:
    host_vars:
      delegated-travis-instance:
        ansible_connection: local
  lint:
    name: ansible-lint
    enabled: False
scenario:
  name: default
verifier:
  name: testinfra
  lint:
    name: flake8
```

In playbook.yml, we find the test.yml code again that shows the role tasks execution:

```
---
- name: Converge
  hosts: all
  become: yes
  pre_tasks:
    - add_host:
        name: delegated-travis-instance
        ansible_python_interpreter: '/home/travis/virtualenv/python2.7/bin/python'
      changed_when: False

    - add_host:
        name: testboot.lxc
        groups: testboot
        lxc_container_config:
        - "lxc.mount.entry={{ playbook_dir }} srv none defaults,bind,create=dir,uid=0 0 0"
      changed_when: False
  roles:
    - role: ansible-boot-lxc
```

A whole new prepare.yml file is also present to replace ansible-setup which had the advantage of being able to test against a specific branch of ansible in a virtualenv like tox.

This allowed to have test matrix with multiple ansible versions including devel. I prefer to test against current stable **and** master, so that you can fix BC breaks as they arrive in master, and you are ready when the new release is out.

Note that the new prepare.yml also calls a new bash script to finish LXC setup.

Next, there is a test directory, which contains a test written in Python:

```
# -*- coding: utf-8 -*-
import os

import yaml

import testinfra


def test_lxc_container():

    # testinfra uses a plain file for Ansible inventory: create it
    updated_inventory = '%s.new.yml' % os.environ['MOLECULE_INVENTORY_FILE']

    inventory = {
        'all': {
            'children': {
                'lxc': {
                    'hosts': {
                        'testboot.lxc': {
                            'ansible_user': 'root'
                        }
                    }
                },
                'ungrouped': {}
            }
        },
    }

    with open(updated_inventory, 'w') as output:
        output.write(yaml.dump(inventory))

    host = testinfra.get_host('ansible://testboot.lxc?ansible_inventory=%s' %
                              updated_inventory)

    f = host.file('/srv/tests/canary')

    assert f.exists
    assert f.contains("inception")
    assert not f.contains("not there")
```

So it also works, all this to replace the following maybe was a bit overkill:

```
- hosts: localhost
  pre_tasks:
  - add_host: name=testboot.lxd lxd_alias={{ lookup('env', 'LXD_ALIAS', 'alpine/3.4/amd64' ) }}
  roles:
  - peopledoc.boot-lxd
  
- hosts: testboot
  tasks:
  - name: Check that bind mount works, with a bit of inception
    shell: grep inception /srv/test.yml
```

## Testing Ansible in Ansible or Molecule for Ansible testing ?

My golden rules for ansible testing, is more about a practice than a tool, have a deployment in this order:

- preflight checks or fail,
- backup or fail,
- setup or fail,
- deploy or fail,
- healthcheck or fail,
- show logs anyway, with some grep-fu to make it nice and relevant

When you have this, testing on containers, with Molecule, or Ansible, it doesn't matter as long as you take preventive action when you discover new errors during the life of your pipeline.

Molecule is also pretty nice, so is ansible-container, but at the end of the day only the practice of CI/CD on CI/CD code itself matters.

So, having an Open Source test-kitchen in Python is cool of course, but they are going to have to pull more tricks to attract people that weren't using test-kitchen despite that they had no problem with Ruby.

## Playlabs

In 2017 I decided I wanted to use Ansible as a container orchestrator to deal with immutable images as suggested by Bruno Dupuis (dear friend and former PeopleDoc collegue) rather than maintain live hosts: Pet vs. Cattle. 

I started using Ansible as an orchestrator for Docker, which means that all existing roles that were setting up a host, with config files became useless: it was time to deploy containers with env vars as much as possible.

After Summer 2018 I had rewriten the playbooks in an Open Source version. It's still pretty early and most roles have not been patched for the update yet. But the update makes it a lot cleaner, we have an ansible CLI wrapper that deploys roles with like `playlabs install docker,nginx,netdata,firewall user@host somevar=foo`. 

From the CLI wrapper emerged two core products, processmanager a Python 3 POSIX compatible alternative to pexpect, and clitoo a simple CLI to execute python callabs ie. `clitoo your.mod:callback.name yourkwarg=1 arg0 --foo --bar=test` to call `your.mod:callback.name("arg0", yourkwarg=1)` with a `clitoo.context.args` of `['foo']` and a `clitoo.context.kwargs` of `{'bar': 'test'}`.

From clitoo emerged another product call djcli, which is simply a full featured CRUD for Django, that does not require any installation besides pip install ... and of course it's also part of the yourlabs/python distribution so we can always have it in CI.

- it is designed around the user inventory, trying to make something clean that makes sense and in a reusable pattern accross products with the same sets of playbooks, and that's really good for lone wolves / shadow hackers like us ;)
- it's the tool that I use to initialize my user on any new server I'm given `playlabs init user@host` for example will setup my user, with ssh key etc ... all automatically
- got a CLI wrapper for ansible that makes sense for my usage, `playlabs install` to deploy roles, `playlabs deploy` to execute the "project" role, playlabs backup/restore/logs ...

Note that playlabs is not ready for public use yet, it deserves another epic iteration on tests and documentation ! it's a lot of work and keeps challenging me to pull new tricks ! I want to get rid of pexpect in favor of processmanager, remove the CLI parser in it and call clitoo instead just like djcli which is also unfinished because ... well I have to deliver just a bit more features on the webdev part I'm currently doing get that backlog back under control...

## Future of DevOps

Well, Kubernetes of course ! It won't solve all your problems, but i find that the "Mastering Kubernetes" book gives a good idea of what k8s is and what it is not.

We have our own containerized distribution of Python built on kubernetes that [includes ansible](https://yourlabs.io/oss/python-container/blob/master/requirements.txt), as well as [Playlabs, our distribution of Ansible (wip!!!)](https://yourlabs.io/oss/playlabs). This integrates very well with any CI that runs commands in containers, such as GitLab-CI, CircleCI, Drone-CI ...

Playlabs also [supports k8s](https://yourlabs.io/oss/playlabs/tree/master/playlabs/roles/k8s/tasks), and has such as a `playlabs install k8s` command to automate creation of users/certificates/project namespaces based on a versioned inventory ... so far validated by what I happen to have read in "Mastering Kubernetes", I'm glad to finnaly be on the right path to not ever write HA/ZDD orchestration in Ansible again, but use Ansible for infra network automation only, k8s being part of that network ...

Looking forward to write the next chapter of that story in 2019 and propose an alternative to [k8s for hobbyists](https://github.com/hobby-kube/guide) that should serve me during the following 15 years in my **practice** of CD ;)

Yours Sincerely

Shadow Hacking to serve you since 2005

With LOVE

From POITOU CHARENTE !