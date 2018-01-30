from rest_framework import serializers
from api.models import TaskNode, TaskEdge, DiGraph


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskNode
        fields = ('name', 'in_degree', 'out_degree', 'graph', 'owner')

class EdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEdge
        fields = ('parent', 'child', 'graph')

class DiGraphSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)
    edges = EdgeSerializer(many=True)
    class Meta:
        model = DiGraph
        fields = ('name', 'owner', 'nodes', 'edges')
