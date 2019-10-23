+++
date = "2012-03-30T08:00:00+00:00"
draft = false
tags = ["django", "contenttype"]
title = "Django generic relations and performances: solutions"
+++
[django-actream](https://github.com/justquick/django-activity-stream) is a
fresh and fantastic pluggable application for django. This article presents the
solution to a simple performance issue: selecting followers and users who
follow me through a generic foreign key … This article targets django users.

#### The model

At the time this article is written, this is what it looks like:

```
{{< highlight  python>}}
class Follow(models.Model):
    """ 
    Lets a user follow the activities of any specific actor
    """
    user = models.ForeignKey(User)

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField() 
    actor = generic.GenericForeignKey()

    class Meta:
        unique_together = ("user", "content_type", "object_id")
{{< / highlight >}}
```

The model has two relations:

 - to the user that does follow
 - to the model (of any class) that is followed

It is indeed basic and yet incredibly generic and useful.

#### The performance issue

Django and django-actstream combine perfectly to let you display the list of
actors followed by ‘user’, with their related profile, and without a single
line of python code:

```
{{<  highlight html>}}
{% for follow in user.follow_set.all.select_related %}
    <a href="{{ follow.actor.playlistprofile.get_absolute_url }}" 
       title="{{ follow.actor.playlistprofile }}">
        <img src="{{ follow.actor.playlistprofile.avatar_url }}" 
             alt="{{ follow.actor.playlistprofile }}" />
    </a>
{% endfor %}
{{< / highlight >}}
```

If actor wasn’t a generic foreign key, the above code would not cost more than
one database hit!  But actor is a generic key, which makes this snippet a
query-o-plenty bottleneck:

```
{{< highlight sql>}}
{% for follow in user.follow_set.all.select_related %} hits ->
SELECT 
    "actstream_follow"."id",
    "actstream_follow"."user_id",
    "actstream_follow"."content_type_id",
    "actstream_follow"."object_id",
    "auth_user"."id",
    "auth_user"."username",
    "auth_user"."first_name",
    "auth_user"."last_name",
    "auth_user"."email",
    "auth_user"."password",
    "auth_user"."is_staff",
    "auth_user"."is_active",
    "auth_user"."is_superuser",
    "auth_user"."last_login",
    "auth_user"."date_joined",
    "django_content_type"."id",
    "django_content_type"."name",
    "django_content_type"."app_label",
    "django_content_type"."model" 
FROM "actstream_follow" 
INNER JOIN "auth_user" ON ("actstream_follow"."user_id" = "auth_user"."id") 
INNER JOIN "django_content_type" ON 
    ("actstream_follow"."content_type_id" = "django_content_type"."id") 
WHERE "actstream_follow"."user_id" = 175319;



    {{ follow.actor.playlistprofile.get_absolute_url }} hits TWICE ->
    SELECT "auth_user"."id",
         "auth_user"."username",
         "auth_user"."first_name",
         "auth_user"."last_name",
         "auth_user"."email",
         "auth_user"."password",
         "auth_user"."is_staff",
         "auth_user"."is_active",
         "auth_user"."is_superuser",
         "auth_user"."last_login",
         "auth_user"."date_joined" 
    FROM "auth_user" 
    WHERE "auth_user"."id" = 305209;

    SELECT "playlist_playlistprofile"."id",
         "playlist_playlistprofile"."user_id",
         "playlist_playlistprofile"."user_location",
         "playlist_playlistprofile"."tiny_playlist_id",
         "playlist_playlistprofile"."last_playlist_id",
         "playlist_playlistprofile"."avatar_url" 
    FROM "playlist_playlistprofile" 
    WHERE "playlist_playlistprofile"."user_id" = 305209;
{{< / highlight >}}
```

That is, 1 query for the {% for %}, and 2 per loop:

 - one for follow.actor
 - one for follow.actor.playlistprofile

That would be 101 database hits for 50 results. As stated earlier, the only
reason for this bottleneck is going through .actor which is a generic foreign
key.

That said, isn’t it fantastic that django lets you achieve the result
without any code anyway ?

How this kind of bottleneck can be identified is another story. For the record,
the fantastic django-debugtoolbar pluggable application allowed to find what
code caused which database hit.

#### Solutions

##### Old school: raw query, raw results fetching

It is of course possible to reduce this crap in one raw sql query. Using a
single raw SQL query means not using models. And not using models means not
using model methods get_absolute_url() and avatar_url().

The advantage of using one raw query is performances. The cons of using one raw
query and fetching raw results are:

 - defy Django’s classic design pattern
 - cause logic duplication (from get_absolute_url() and avatar_url())
 - tie-in the database structure with the views
 - requires to decide (define) another intermediary structure between the model and the view
 - requires manual pagination

##### Quick hack: pre-fetching the ids

The problem is still the “actor” relation. The quick hack consists of manually
making one query on the left side and one on the right side of this relation.
The quick hack looks like:

```
{{< highlight python>}}
# query for the left side: just selecting ids
follows_users_ids = []
cursor = connection.cursor()
cursor.execute(
    'select object_id from actstream_follow where user_id = %s and object_id != %s', 
    [user.pk, user.pk]
)
for row in cursor.fetchall():
    follows_users_ids.append(row[0])

# query for the right side: using classic django queryset
follows_qs = User.objects.filter(id__in=follows_users_ids) \
                         .select_related('playlistprofile')
{{< / highlight >}}
```
The con of this quick hack is that it uses two queries, and thus, is less
performant than using one single query.

On the other hand, the advantages of this hack are based around consistency and
laziness:

 - get_absolute_url() and avatar_url() works out of the box because it’s regular model instances
 - all other attributes and methods of User and PlaylistProfile work out of the box
 - works out of the box with {% autopaginate %} because it’s a regular queryset
 - works out of the box with anything expecting classical model instances or querysets

##### The really elegant solution, by rozwell@#django

Even rozwell, one of the most talented hacker of the #django IRC channel,
started stating the worst:

    rozwell| jpic: well in the case of generic keys, no, there's probably not a way to achieve it in one queryset

Anyway, in the end, he found a brilliant solution to generate this query in
pure django:

```
{{< highlight sql>}}
SELECT 
    "auth_user"."id",
    "auth_user"."username",
    "auth_user"."first_name",
    "auth_user"."last_name",
    "auth_user"."email",
    "auth_user"."password",
    "auth_user"."is_staff",
    "auth_user"."is_active",
    "auth_user"."is_superuser",
    "auth_user"."last_login",
    "auth_user"."date_joined",
    "playlist_playlistprofile"."id",
    "playlist_playlistprofile"."user_id",
    "playlist_playlistprofile"."user_location",
    "playlist_playlistprofile"."tiny_playlist_id",
    "playlist_playlistprofile"."last_playlist_id",
    "playlist_playlistprofile"."avatar_url" 
FROM "auth_user" 
LEFT OUTER JOIN "playlist_playlistprofile" 
    ON ("auth_user"."id" = "playlist_playlistprofile"."user_id") 
WHERE "auth_user"."id" IN (
    SELECT U0."object_id" 
    FROM "actstream_follow" U0 
    WHERE (U0."user_id" = 175319 AND NOT (U0."object_id" = 175319 ))) 
LIMIT 2
{{< / highlight >}}
```

This is the python code used by rozwell to defeat the generic key relation
bottleneck:

```
{{< highlight python>}}
follows_users_ids = Follow.objects.filter(user=user) \
                                  .exclude(object_id=user.pk) \
                                  .values_list('object_id', flat=True)
follows_qs = User.objects.filter(id__in=follows_users_ids) \
                         .select_related('playlistprofile')
{{< / highlight >}}
```
Note that the content type is not used in the filters, it is left as an exercise for the reader.

#### Conclusion

Django’s marvelous community astonished me again. How come without any prior
knowledge of one-shot solutions for this kind of issue, rozwell found a way to
outcome everybody’s expectations.

Django’s fantastic ORM didn’t get in our way: i could just do the template code
and let our designer finish the job; while i was looking for a solution with
the help of #django.

Django-actstream didn’t even cost me a couple of hours even though it provides
our project with tons of features that just work out of the box.

Finding the bottleneck code with django-debugtoolbar was as easy as doing a
double click. Seriously, if you’re not already using django-debugtoolbar then
go ahead: it just takes on pip command and 3 settings changes!
