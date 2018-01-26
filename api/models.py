from django.db import models
from django_dag.models import *


class TaskNode(node_factory('TaskEdge')):
    name = models.CharField(max_length=32)
    in_degree = models.IntegerField(editable=False)

    def delete_self(self):
        for p in self.parents():
            for c in self.children.through():
                p.add_child(c)
        self.delete()

    def save(self):
        self.in_degree = len(self.ancestors_set())
        super(TaskNode, self).save()

class TaskEdge(edge_factory(TaskNode, concrete=False)):
    name = models.CharField(max_length=32, blank=True, null=True)