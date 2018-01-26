from django.contrib import admin
from api.models import TaskEdge, TaskNode

# Register your models here.
admin.site.register(TaskNode)
admin.site.register(TaskEdge)