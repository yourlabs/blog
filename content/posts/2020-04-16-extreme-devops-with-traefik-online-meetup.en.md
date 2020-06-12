+++
date = "2020-04-16T13:37:00+00:00"
draft = false
tags = []
title = "Practice of eXtreme DevOps Demo @ Traefik Online Meetup"
author = "jpic"
+++

How weak is a Continuous Deployment when you can't just deploy the master
branch to production at any time? Merging unfinished patches to publish them
on a staging deployment blocks production deployment of the master branch...

eXtreme DevOps is the practice of an extremely aggressive Continuous Delivery
strategy where each patch push deploys an ephemeral deployment such as
branchname.ci.example.com. Of course, this would be quite hard to achieve with
configuration files, even with NGINX and Ansible.

But, with Traefik it becomes so easy that we couldn't resist and make it the
standard practice for all our developments, from private companies of all
sizes, and to government organizations. In this session, James demos and
discusses his expertise using Traefik to practice eXtreme DevOps for his
customers.

<!--more-->

{{< rawhtml >}}
<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'>
<iframe
    frameborder="0"
    allowfullscreen
    src="https://www.youtube.com/embed/DPuVNNemEuM"
></iframe>
</div>
{{< /rawhtml >}}
