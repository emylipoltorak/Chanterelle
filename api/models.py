from django.db import models
from django_dag.models import node_factory, edge_factory


class TaskNode(node_factory('TaskEdge')):
    name = models.CharField(max_length=32)
    in_degree = models.IntegerField(editable=False, null=True)
    graph = models.ForeignKey('DiGraph', null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Tasks'

    def save(self):
        super(TaskNode, self).save()
        self.in_degree = len(self.ancestors_set())
        super(TaskNode, self).save()

    def __str__(self):
        return self.name


class TaskEdge(edge_factory(TaskNode, concrete=False)):
    name = models.CharField(max_length=32, blank=True, null=True)
    graph = models.ForeignKey('DiGraph', null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Dependencies'


class DiGraph(models.Model):
    name = models.CharField(max_length=32)

    class Meta:
        verbose_name_plural = 'Workflow graphs'

    def save(self, *args, **kwargs):
        if not self.pk:
            super(DiGraph, self).save()
            r = TaskNode(name='root', graph=self)
            e = TaskNode(name='end', graph=self)
            r.save()
            e.save()
        super(DiGraph, self).save()

    def nodes(self):
        # return a queryset of TaskNode objects
        return TaskNode.objects.filter(graph=self)

    def edges(self):
        # return a queryset of TaskEdge objects
        return TaskEdge.objects.filter(parent__graph=self)

    def add_node(self, node):
        # if node is a TaskNode instance, this will add node to the graph.
        # if node is a string, this will create a new TaskNode and add it to the graph.

        while not isinstance(node, TaskNode):
            if isinstance(node, str):
                node = TaskNode(name=node, graph=self)
                node.save()
            else:
                print('Not a string or TaskNode instance')
                break
        root = TaskNode.objects.get(name='root', graph=self)
        if not node.graph == self:
            node.graph = self
            node.save()
        root.add_child(node)
        root.save()
        node.save()

    def delete_node(self, node):
        # removes node from the graph while maintaining dependencies between
        # the node's parents and children.

        if node in self.nodes():

            for p in node.parents():
                for c in node.children.all():
                    if not p.path(c):
                        self.add_edge(p, c)
                        p.save()
                        c.save()
            node.delete()
        else:
            print('Node {} does not exist.'.format(node))

    def remove_edge(self, a, b):
        # assume that a and b are nodes on this graph and there exists an edge a --> b
        for u in self.edges():
            if u.parent == a and u.child == b:
                u.delete()
                a.save()
                b.save()

    def add_edge(self, a, b):
        # assuming that a and b are nodes on this graph, add an edge a --> b
        a.add_child(b)
        a.save()
        b.save()
        for i in a.ancestors_set():
            if b in i.descendants_set():
                # imagine we have a method remove_edge(a,b)
                self.remove_edge(i, b)
                i.save()
                b.save()

    def __str__(self):
        return self.name
