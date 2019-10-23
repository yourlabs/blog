+++
date = "2018-04-12T23:39:54+00:00"
draft = false
tags = ["python", "django", "crudlfap"]
title = "CRUDLFA+ 0.3 Series"
+++
[CRUDLFA+](https://github.com/betagouv/mrs) is an expirement (read: pre-alpha state) of what Django could be if:

- generic views provided templates and javascript for a rich experience out of the box,
- class based views leveraged OOP a bit more to add DRY goodness,
- leveraged externals apps from the Django ecosystem.

Let's compare it side by side. Consider this simple model:

```
class Email(models.Model):
    email = models.EmailField()
    caisse = models.ForeignKey('Caisse', on_delete=models.CASCADE)

    def __str__(self):
        return self.email
```

This admin.py:

```
class EmailAdmin(admin.ModelAdmin):
    list_display = ('email', 'caisse')


admin.site.register(Email, EmailAdmin)
```

Ported to CRUDLFA+, in the case where we only want a list view, becomes (crudlfap.py):

```
crudlfap.Router(
    Email,
    material_icon='contact_mail',
    views=[
        crudlfap.FilterTables2ListView.clone(
            table_sequence=('email', 'caisse'),
        ),
    ]
).register()
```

Now, consider a bit more complete model as such:

```
class Caisse(models.Model):
    code = models.CharField(max_length=9)
    name = models.CharField(
        verbose_name='nom',
        max_length=50,
    )           
    number = models.CharField(
        max_length=3,
        verbose_name='numéro',
        validators=[validate_caisse_number],
    )       
    liquidation_email = models.EmailField(
        verbose_name='email du service de liquidation',
        blank=True,
        null=True
    )
    active = models.BooleanField(
        verbose_name='activé',
        default=False,
    )
    score = models.PositiveIntegerField(default=0)
            
    class Meta:
        ordering = ['code']

    def __str__(self):
        return self.name
```

We have admin.py like:

```

class CaisseAdmin(admin.ModelAdmin):
    readonly_fields = ('score',)
    list_display = ('code', 'name', 'number', 'active', 'score')
    search_fields = ('code', 'name', 'number')
    list_filter = ('active', 'score')


admin.site.register(Caisse, CaisseAdmin)
```

Then crudlfap.py would have:

```
crudlfap.Router(
    Caisse,
    material_icon='domain',
    views=[
        crudlfap.CreateView,
        crudlfap.DeleteView,
        crudlfap.UpdateView,
        crudlfap.DetailView,
        crudlfap.FilterTables2ListView.clone(
            table_sequence=(
                'code',
                'name',
                'number',
                'active',
                'score'
            ),
            search_fields=(
                'code',
                'name',
                'number',
            ),
            filter_fields=(
                'active',
            )
        ),
    ]
).register()
```

Another example from admin.py:

```
class EmailTemplateAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'subject',
        'requests',
        'active',
    ]
    list_display_links = ['name']

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            requests=Count('mrsrequest'))

    def requests(self, obj):
        return obj.requests
    requests.admin_order_field = 'requests'
    requests.short_description = 'Demandes'

    def has_delete_permission(self, *args, **kwargs):
        return False

admin.site.register(EmailTemplate, EmailTemplateAdmin)
```

To crudlfap.py:


```
class EmailTemplateListView(crudlfap.FilterTables2ListView):
    table_sequence = (
        'name',
        'subject',
        'requests',
        'active',
    )

    table_columns = dict(
        requests=tables.Column(
            accessor='requests',
            verbose_name='Demandes',
            order_by=['requests'],
        )
    )

    def get_queryset(self):
        return super().get_queryset().annotate(requests=Count('mrsrequest'))


crudlfap.Router(
    EmailTemplate,
    material_icon='mail',
    views=[
        EmailTemplateListView,
        crudlfap.CreateView,
        crudlfap.UpdateView,
    ]
).register()
```

For our last example, we have a bigger admin to port:

```
class MRSRequestAdmin(admin.ModelAdmin):
    form = MRSRequestAdminForm
    list_display = (
        'creation_datetime',
        'display_id',
        'insured_first_name',
        'insured_last_name',
        'insured_nir',
        'status',
        'institution',
        'caisse',
    )
    search_fields = (
        'insured__first_name',
        'insured__last_name',
        'insured__email',
        'insured__nir',
        'institution__finess',
        'display_id',
        'caisse__name',
        'caisse__number',
        'caisse__code',
    )
    list_filter = (
        'status',
        'institution',
        'caisse',
    )
    readonly_fields = (
        'expense',
        'distance',
        'display_id',
    )
    autocomplete_fields = ['insured']

    def insured_first_name(self, obj):
        if obj.insured:
            return obj.insured.first_name
    insured_first_name.admin_order_field = 'insured__first_name'
    insured_first_name.short_description = "Prénom"

    def insured_last_name(self, obj):
        if obj.insured:
            return obj.insured.last_name
    insured_last_name.admin_order_field = 'insured__last_name'
    insured_last_name.short_description = "Nom"

    def insured_nir(self, obj):
        if obj.insured:
            return obj.insured.nir
    insured_nir.admin_order_field = 'insured__nir'
    insured_nir.short_description = "NIR"

    def has_add_permission(self, request):
        return False
admin.site.register(MRSRequest, MRSRequestAdmin)
```

Becomes, in CRUDLFA+:

```
from .views import MRSRequestRejectView, MRSRequestValidateView
from .models import MRSRequest


class MRSRequestListView(crudlfap.FilterTables2ListView):
    filter_fields = (
        'status',
        'institution',
        'caisse',
    )

    table_columns = dict(  # our extra columns
        first_name=tables.Column(
            accessor='insured.first_name',
            verbose_name='Prénom',
            order_by=['insured__first_name'],
        ),
        last_name=tables.Column(
            accessor='insured.last_name',
            verbose_name='Nom',
            order_by=['insured__last_name'],
        ),
        nir=tables.Column(
            accessor='insured.nir',
            verbose_name='NIR',
            order_by=['insured__nir'],
        ),
    )

    table_sequence = (
        'creation_datetime',
        'display_id',
        'first_name',
        'last_name',
        'nir',
        'status',
        'institution',
        'caisse',
    )

    search_fields = (
        'insured__first_name',
        'insured__last_name',
        'insured__email',
        'insured__nir',
        'institution__finess',
        'display_id',
        'caisse__name',
        'caisse__number',
        'caisse__code',
    )

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.select_related('caisse', 'insured')
        return qs

crudlfap.Router(
    MRSRequest,
    material_icon='insert_drive_file',
    views=[
        crudlfap.DeleteView,
        crudlfap.DetailView,
        # we're adding a couple of views of our own
        MRSRequestValidateView,
        MRSRequestRejectView,
        MRSRequestListView,
    ]
).register()
```

That's all for today !

Wasted human resource ? Hard feelings ? Let us know !

With love, from Poitou Charente, France.