+++
date = "2013-02-01T13:13:43+00:00"
draft = false
tags = ["javascript", "jquery"]
title = "Lightweight jQuery plugin to drag'n'drop <table> columns"
+++
This plugin allows to drag'n'drop HTML table columns. It is rather light and consistent with usual jQuery plugin and javascript patterns.


This script doesn't assume that it is smarter than you are. All it does is enabling clean column drag'n'drop, and triggers an event on drop. You should implement the persistence you want by binding that event to your own function.

Nuff said, [here it is](https://gist.github.com/4691211).