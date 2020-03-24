+++
date = "2018-06-13T16:25:15+00:00"
draft = false
tags = ["python", "pip"]
title = "Pip exception TypeError: parse() got an unexpected keyword argument 'transport_encoding'"
author = "jpic"
+++

I had an old html5lib installed with --user, that would break globally installed pip from my Arch Linux system. Posting the solution that worked for me here because i couldn't find it elsewhere:


pip uninstall html
Uninstalling html5lib-0.9999999:
  Would remove:
    /home/jpic/.local/lib/python3.6/site-packages/html5lib-0.9999999-py3.6.egg-info
    /home/jpic/.local/lib/python3.6/site-packages/html5lib/*
Proceed (y/n)? y
  Successfully uninstalled html5lib-0.9999999


Then, `pip install --user` worked again.

The full traceback was:


Traceback (most recent call last):
  File "/usr/lib/python3.6/site-packages/pip/_internal/basecommand.py", line 228, in main
    status = self.run(options, args)
  File "/usr/lib/python3.6/site-packages/pip/_internal/commands/install.py", line 291, in run
    resolver.resolve(requirement_set)
  File "/usr/lib/python3.6/site-packages/pip/_internal/resolve.py", line 103, in resolve
    self._resolve_one(requirement_set, req)
  File "/usr/lib/python3.6/site-packages/pip/_internal/resolve.py", line 257, in _resolve_one
    abstract_dist = self._get_abstract_dist_for(req_to_install)
  File "/usr/lib/python3.6/site-packages/pip/_internal/resolve.py", line 210, in _get_abstract_dist_for
    self.require_hashes
  File "/usr/lib/python3.6/site-packages/pip/_internal/operations/prepare.py", line 245, in prepare_linked_requirement
    req.populate_link(finder, upgrade_allowed, require_hashes)
  File "/usr/lib/python3.6/site-packages/pip/_internal/req/req_install.py", line 307, in populate_link
    self.link = finder.find_requirement(self, upgrade)
  File "/usr/lib/python3.6/site-packages/pip/_internal/index.py", line 484, in find_requirement
    all_candidates = self.find_all_candidates(req.name)
  File "/usr/lib/python3.6/site-packages/pip/_internal/index.py", line 442, in find_all_candidates
    for page in self._get_pages(url_locations, project_name):
  File "/usr/lib/python3.6/site-packages/pip/_internal/index.py", line 587, in _get_pages
    page = self._get_page(location)
  File "/usr/lib/python3.6/site-packages/pip/_internal/index.py", line 705, in _get_page
    return HTMLPage.get_page(link, session=self.session)
  File "/usr/lib/python3.6/site-packages/pip/_internal/index.py", line 833, in get_page
    inst = cls(resp.content, resp.url, resp.headers)
  File "/usr/lib/python3.6/site-packages/pip/_internal/index.py", line 753, in __init__
    namespaceHTMLElements=False,
TypeError: parse() got an unexpected keyword argument 'transport_encoding'
