+++
date = "2020-07-27T13:37:00+00:00"
draft = false
tags = ["python", "django", "crud", "iommi", "crudlfap", "best-practice", "framework"]
title = "Django: generating HTML menus gone wrong"
author = "jpic"
+++

# Why Django feels "unfinish"

The problem is pretty obvious: Django admin provides barely anything that's
usable for non-admin, not even working base templates and sane default features
such as searchable lists with some kind of row level security, and only basic
HTML forms without even a default template that calls `{{ form }}` and `{{
form.media }}` and `{% csrf_token %}`.

For example, Django would need to have a base.html that can display a
`View.title` attribute, exactly like in all CMS and frameworks that exist on
top of Django, and that Iommi solves with a *beautiful python API for
generating HTML*.

## The problem with Templates

Personnally I'd be better off without templates at all, so ultimately I would
like to reach the level where this is possible:

```python
class IommiView:
    template = BaseTemplate(
        title='Your Title',
        content=[
            ... list of python components here
            ... and name of methods too
        ]
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

## Example Controller

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

## Example custom action

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

# 1337 Conclusion

h4x0|2z out there on the wild internet will just go down the rabbit hole of
refactoring their code built on bare Django to generate **HTML menu efficiently
and DRYly**, because, who never been trying to refactor how the generate HTML
menus in Django ? :D There are many refactors that gives a framework on top of
Django, based on providing you with you generic secure-by-default and
working-by-default CRUD frontend, such as Iommi, CRUDLFA+, and *many* others
even django-smartviews, and, well, generating HTML, which is better done with
Python than whatever template language (except maybe mako)

Keep up the gr8 work TriOptima !!!! Love it !!!!

EPIC
