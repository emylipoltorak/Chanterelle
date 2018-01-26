from django.db import models
from django_dag.models import *


class TaskNode(node_factory('TaskEdge')):
    name = models.CharField(max_length=32)


class TaskEdge(edge_factory(TaskNode, concrete=False)):
    name = models.CharField(max_length=32, blank=True, null=True)