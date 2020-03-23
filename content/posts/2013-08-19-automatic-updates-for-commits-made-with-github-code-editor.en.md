+++
date = "2013-08-19T12:02:00+00:00"
draft = false
tags = ["python", "django", "github"]
title = "Automatic updates for commits made with GitHub code editor"
author = "jpic"
+++

For development, we host the project on some small server. It is running via `./manage.py runserver` just for our customer to be able to see what's going on. Also, this enables our designer to hack the project via SFTP without having to deploy the website locally.

Currently we are working with a new designer who found out that GitHub's editor was pretty cool because it saves him from doing backups himself.

When pushing his template/css updates himself on the dev server, changes are de-facto deployed. But I was still pulling my own changes from GitHub manually on the dev server.

To let the designer work directly in GitHub, we had to enable automatic pulls from the dev server. To do so:

- create an ssh key with no passphrase,
- add it to GitHub's project `Settings -> Deploy keys`,
- add a secret url like `http://your-dev-site/post-update-hook/SOME-SECRET/` to GitHub's project `Settings -> Service Hooks -> WebHook URLs`,
- add to `urls.py`:

<script src="https://gist.github.com/jpic/6268352.js" type="text/javascript"></script>
