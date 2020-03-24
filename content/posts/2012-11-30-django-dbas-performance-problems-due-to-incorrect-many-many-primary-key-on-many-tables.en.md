+++
date = "2012-11-30T06:00:00+00:00"
draft = false
tags = ["django", "django-developers"]
title = "Django & DBAs: \"Performance problems due to incorrect many-many primary key on many tables\""
author = "jpic"
+++

Extract from [a great thread](https://groups.google.com/forum/?fromgroups=#!topic/django-developers/KcWbZJsrUPA) on the django-developper mailing list started by Trey Raymond:

> I'm a DB engineer working for Yahoo, and we have a new product using django that I'm onboarding.  We see a variety of easily fixed issues, but one major one - there are 21 many-many tables here, yet they have auto increment primary keys

<pre class="sh_sql">
-- Example, existing:
CREATE TABLE `accounts_profile_starred_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profile_id` (`profile_id`,`group_id`),
  KEY `group_id_refs_id_e2f1545` (`group_id`)
) ENGINE=InnoDB;
-- Fixed:
CREATE TABLE `accounts_profile_starred_groups` (
  `profile_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`profile_id`,`group_id`),
  KEY `group_id_refs_id_e2f1545` (`group_id`)
) ENGINE=InnoDB;
</pre>

Looking forward to see how it goes !

Star [the thread](https://groups.google.com/forum/?fromgroups=#!topic/django-developers/KcWbZJsrUPA).
