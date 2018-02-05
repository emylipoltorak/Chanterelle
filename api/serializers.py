from rest_framework import serializers
from api.models import TaskNode, TaskEdge, DiGraph
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskNode
        fields = ('name', 'id', 'in_degree', 'out_degree')


class EdgeSerializer(serializers.ModelSerializer):
    parent = NodeSerializer(read_only=True)
    child = NodeSerializer(read_only=True)
    class Meta:
        model = TaskEdge
        fields = ('parent', 'child')


class DiGraphSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    nodes = NodeSerializer(many=True, read_only=True)
    edges = EdgeSerializer(many=True, read_only=True)

    class Meta:
        model = DiGraph
        fields = ('name', 'id', 'owner', 'nodes', 'edges')
