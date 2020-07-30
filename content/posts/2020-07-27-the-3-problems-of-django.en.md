+++
date = "2020-07-27T13:37:00+00:00"
draft = false
tags = ["python", "django", "crud", "iommi", "crudlfap", "best-practice", "framework"]
title = "The 3 problems of Django"
author = "jpic"
+++

# Why Django feels "unfinish"

## 1. Non admins ?

The problem is pretty obvious: Django admin provides barely anything that's
usable for non-admin, not even working base templates and sane default features
such as searchable lists with some kind of row level security.

## 2. No templates ?

For your internet users, Django only generates basic
HTML forms without even a default template that calls `{{ form }}` and `{{
form.media }}` and `{% csrf_token %}`.

For example, Django would need to have a base.html that can display a
`View.title` attribute, exactly like in all CMS and frameworks that exist on
top of Django, and that [Iommi](https://docs.iommi.rocks) solves with a
**beautiful python API for generating HTML**, because of the problem with
templates (see below), or [Ryzom](https://yourlabs.io/oss/ryzom) which also
provide data-binding with django-channels.

## 3. No menus ?

This one you would think I have added for the lulz because let's be honest: who has never tried to code a menu in Python and then went back to doing it in HTML templates and just tell others to live with it ? Well the real problem here is not just having a navigation menu, but also different menus such as the one in the object detail view, or the one in the object list item view that you will see per item on the list page.

Let's be honest, Django has almost all it needs to generate a menu: it knows the urls, the views, what models the views are for, and so on, it just needs a view attribute for the names of the menus that the view should display in ... as well as some hat tricks:

## Performant view-per-object security

To generate menus efficiently: you need to be able to code permission code that does not hit the database, which is actually possible with a nice little trick possible by executing views on a target object with the same authenticated request prior to adding a link for this view in this object:

```python
for view in Controller.for_object(object).for_menu('object_list'):
    if view.clone(request=request, object=object).has_perm():
        yield view.as('a')
```

## The problem with Templates

Ultimately I would like to reach the level where this is possible:

```python
class IommiView:
    template = BaseTemplate(
        title=html.h1('Your Title'),
        content=html.div(
            SomeModelTable(),   # a Table object for some model
            cls="large",
        )
    )
```

### Glorifying the Decorator pattern

Obviously, I believe all 1337 h4x0|2z will agree on eliminating templates, not
even for being slower than pure python, but just to move on to Decorator based
patterns for generating some tag-based HTML source code, just like we would for
any GUI according to the GoF on Decorator patterns.

## The problem with generic views

Anyway, all your CRUD code would be MUCH better with a Controller layer, that
sits between a model and it's set of CRUD views to form the MVC that makes
modifying the admin so pleasant.

Take this example of registering a full CRUD with the MVC pattern just like the
Admin:

```python
crudlfap.Controller(
    Artist,
    fields='__all__',
).register()
```

This must enable a working CRUD view that is **superuser only** by default. You
override your Controller.get_queryset which all of the views will call so that
it is **secure by default** (which default CBV **are not**), overriding the
Controller is a lot of fun just like in the admin because it is the result of a
standard **refactor of the code in-between Models and Views**.

## MVC

This part of the article is proven by [CRUDLFA+](https://yourlabs.io/oss/crudlfap).

### Example Controller

To sit in between our view classes and our model, we make a Controller which is the same as a ModelAdmin, DRF ViewSet or a django SmartView. It should centralize the base queryset filter code for all the views of this controller and register just like a ModelAdmin:

```python
class UserController(crudlfap.Controller):
    views = [
        # some view defined above in crud.py:
        ImportView,
        # a working from imported from mvc.auth
        PasswordResetView,
        UserUpdateView,
        UserCreateView,
        # same but overriding a view kwarg
        BecomeUser.clone(
            allowed_groups=['Admin'],
        ),
        # with default template with fields/exclude on DetailView
        crudlfap.DetailView.clone(
            exclude=[
                'password',
                'permissions',
            ]
        ),
        UserListView,
    ]
    permissions = [GroupRequired(ADMIN|SUPERVISOR)]
    material_icon = 'person'
    model = User
    urlfield = 'pk'


    # You want all your views to get the base queryset from the controller
    # wich is awesome it centralize your crud
    # queryset filtering for permissions

    def get_queryset(self, view):
        user = view.request.user

        if user.profile == 'admin':
            return self.model.objects.all()
        elif user.profile == 'superviseur':
            return self.model.objects.filter(
                caisses__in=view.request.user.caisses.all()
            ).exclude(
                groups__name__in=('Superviseur', 'Admin')
            ).distinct()

        # STILL secure by default
        return self.model.objects.none()

# Easier register() call
UserController().register()
```

## Example secure custom object action

But you will reach your full potential when you can add your own
`ObjectFormView` with custom allowance based on properties of the object, ie:
can't validate a model instance with status='accepted'

```python
class MRSRequestRejectView(EmailViewMixin,
                           MRSRequestStatusMixin,
                           crudlfap.ObjectFormView):

    # Show in detail view only, this would be menus = ['object_row', 'object_detail'] by default
    menus = ['object_detail']  # show reject menuitem for object menu of the detail page only !


    view_label = 'Rejeter'  # should be "reject" by default
    material_icon = 'do_not_disturb_on' # used in menu
    color = 'red' # used for menu item color
    action_flag = MRSRequest.STATUS_REJECTED # for the mrsstatus mixin

    # this puts data-modal="bottom" in the link,
    # causing links to this view to spawn in a modal,
    # note that they also work from outside modals: directly with the url
    link_attributes = BOTTOM_MODAL

    # this will secure the view from being used against arbitrary objects
    # STILL call super().get_queryset() to get a secure queryset from the controller
    def get_queryset(self):
        return super().get_queryset().filter(status__in=(
            self.model.STATUS_NEW, self.model.STATUS_INPROGRESS
        ))

    # CHERRY ON THE TOP
    # define your permission code on an object here, the list view will call this
    # method prior to showing the menu item for the object:
    # in a list of objects with mixed statuses, each will have different menuitems
    # without hitting the db at all, check it out, the link component will call
    #      MRSRequestRejectView.clone(request=self.request, object=self.object).has_perm()
    # ZERO db hit, what a 1333337 trick
    def has_perm(self):
        if super().has_perm():
            return self.object.status in (
                self.model.STATUS_NEW,
                self.model.STATUS_INPROGRESS
            )
```

# Epic Conclusion

h4x0|2z out there will just go down the rabbit hole of refactoring their HTML code built on bare Django, like Django itself was made, it's legacy will live on.

[Discussion on Django forum](https://forum.djangoproject.com/t/the-3-problems-of-django/3625)

EPIC
