from django.db import models
from django_dag.models import node_factory, edge_factory, NodeNotReachableException
from django.contrib.auth.models import User


class TaskNode(node_factory('TaskEdge')):
    name = models.CharField(max_length=32)
    in_degree = models.IntegerField(editable=False, null=True)
    out_degree = models.IntegerField(editable=False, null=True)
    graph = models.ForeignKey('DiGraph', related_name='nodes', null=True, blank=True, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Tasks'

    def save(self, *args, **kwargs):
        super(TaskNode, self).save()
        self.in_degree = len(self.ancestors_set())
        self.out_degree = len(self.descendants_set())
        super(TaskNode, self).save()

    def __str__(self):
        return self.name


class TaskEdge(edge_factory(TaskNode, concrete=False)):
    name = models.CharField(max_length=32, blank=True, null=True)
    graph = models.ForeignKey('DiGraph', null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Dependencies'

    def save(self, *args, **kwargs):
        super(TaskEdge, self).save()
        self.graph = self.parent.graph
        super(TaskEdge, self).save()


class DiGraph(models.Model):
    name = models.CharField(max_length=32)
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Workflow graphs'

    def save(self, *args, **kwargs):
        if not self.pk:
            super(DiGraph, self).save()
            r = TaskNode(name='root', graph=self)
            r.save()
        else:
            for n in self.nodes.all():
                n.save()
        super(DiGraph, self).save()

    # def nodes(self):
    #     # return a queryset of TaskNode objects
    #     return TaskNode.objects.filter(graph=self)

    def edges(self):
        # return a queryset of TaskEdge objects
        return TaskEdge.objects.filter(parent__graph=self)

    def next(self):
        # returns a queryset of TaskNode objects with and in degree of 1.
        return self.nodes.all().filter(in_degree=1)

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
        parents = []
        children = []
        if node in self.nodes.all():
            for p in node.parents():
                parents.append(p)
            for c in node.children.all():
                children.append(c)
            node.delete()
        else:
            print('Node {} does not exist.'.format(node))
        for p in parents:
            print(str(p) + ' is the parent')
            for c in children:
                print(str(c) + ' is a child')
                try:
                    p.path(c)
                except NodeNotReachableException:
                    self.add_edge(p, c)
                    p.save()
                    c.save()

    def remove_edge(self, a, b):
        # assume that a and b are nodes on this graph and there exists an edge a --> b
        print('remove edge ran')
        for u in self.edges():
            if u.parent == a and u.child == b:
                print('the edge exists')
                u.delete()
                a.save()
                b.save()
                print('the edge was deleted')

    def add_edge(self, a, b):
        # assuming that a and b are nodes on this graph, add an edge a --> b
        if not a in b.ancestors_set():
            a.add_child(b)
            print('an edge was created')
            a.save()
            b.save()
            for i in a.ancestors_set():
                if b in i.descendants_set():
                    print('The edge {}, {} should be removed'.format(i,b))
                    self.remove_edge(i, b)
                    i.save()
                    b.save()
                    print('The edge {}, {} was removed.'.format(i,b))
        else:
            print('{} is already an ancestor of {}'.format(a,b))

    def __str__(self):
        return self.name
