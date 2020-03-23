+++
date = "2012-11-28T08:50:54+00:00"
draft = false
tags = ["http", "hateoas", "api"]
title = "Django & ajax & HATEOAS: how to reverse urls in javascript (not)"
author = "jpic"
+++

This is the second article about reversing urls in javascript. The [previous article](http://blog.yourlabs.org/post/36514630158/django-ajax-how-to-reverse-urls-in-javascript-not) actually presented a bad idea.

### Github API v3

Github's API is undubitably quite suprising for a web developer that isn't aware of the HATEOAS concept, here's the kind of things you can see [for example](https://api.github.com/orgs/yourlabs/repos):

    [
      {
        "updated_at": "2012-11-27T14:42:24Z",
        "svn_url": "https://github.com/yourlabs/django-cities-light",
        "language": "Python",
        "milestones_url": "https://api.github.com/repos/yourlabs/django-cities-light/milestones{/number}",
        "downloads_url": "https://api.github.com/repos/yourlabs/django-cities-light/downloads",
        "subscription_url": "https://api.github.com/repos/yourlabs/django-cities-light/subscription",
        "teams_url": "https://api.github.com/repos/yourlabs/django-cities-light/teams",
        "full_name": "yourlabs/django-cities-light",
        "git_url": "git://github.com/yourlabs/django-cities-light.git",
        "git_tags_url": "https://api.github.com/repos/yourlabs/django-cities-light/git/tags{/sha}",
        "owner": {
          "login": "yourlabs",
          "organizations_url": "https://api.github.com/users/yourlabs/orgs",
          "followers_url": "https://api.github.com/users/yourlabs/followers",
          "starred_url": "https://api.github.com/users/yourlabs/starred{/owner}{/repo}",
          "following_url": "https://api.github.com/users/yourlabs/following",
          "avatar_url": "https://secure.gravatar.com/avatar/c0efe8e5c15bd268224fbc40a574329d?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-org-420.png",
          "repos_url": "https://api.github.com/users/yourlabs/repos",
          "subscriptions_url": "https://api.github.com/users/yourlabs/subscriptions",
          "url": "https://api.github.com/users/yourlabs",
          "events_url": "https://api.github.com/users/yourlabs/events{/privacy}",
          "gravatar_id": "c0efe8e5c15bd268224fbc40a574329d",
          "received_events_url": "https://api.github.com/users/yourlabs/received_events",
          "id": 1040547,
          "gists_url": "https://api.github.com/users/yourlabs/gists{/gist_id}"
        },

Wow, so many URLs... At first, this may look original, if not excentric. Why aren't they just documented ?

### HATEOAS

[Lee Wayne](http://www.slideshare.net/trilancer)'s presentation of [HATEOAS](http://www.slideshare.net/trilancer/why-hateoas-1547275) is amazingly easy to understand. So I'll just resume it.

### Clients should not reverse urls

From what I understand, there should be a gate url, that returns all urls and some data. Working with a non HATEOAS API looks like this:

- search documentation for the url you need,
- try to figure out how to "cook" urls to get what you need.

With the GitHub API it looks like this:

- find the gate url,
- use the returned data to generate URLs, don't hardcode any url.

### Credits

A thousand thanks to django-developers mailing list and particularely to Javier Guerra Giraldez for pointing me in the right direction.
