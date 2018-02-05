from django.shortcuts import render
from api.models import DiGraph, TaskNode, TaskEdge
from api.serializers import DiGraphSerializer, NodeSerializer, EdgeSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.http import Http404


def home(request):
    return render(request, 'api/index.html')


class DiGraphList(APIView):

    def get(self, request, format=None):
        graphs = DiGraph.objects.all()
        serializer = DiGraphSerializer(graphs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DiGraphSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SingleGraphView(APIView):
#     def get_object(self, pk):
#         try:
#             return DiGraph.objects.get(pk=pk)
#         except DiGraph.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         graph = self.get_object(pk)
#         serializer = DiGraphSerializer(graph)
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         graph = self.get_object(pk)
#         serializer = DiGraphSerializer(graph, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         graph = self.get_object(pk)
#         graph.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
# class NodeDetail(APIView):
#     def get_node(self, pk):
#         try:
#             return TaskNode.objects.get(pk=pk)
#         except TaskNode.DoesNotExist:
#             raise Http404
#
#     def get_graph(self, node):
#         try:
#             return DiGraph.objects.get(pk = node.graph.pk)
#         except DiGraph.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         node = self.get_node(pk)
#         serializer = NodeSerializer(node)
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         node = self.get_node(pk)
#         graph = self.get_graph(node)
#
#
#     def delete(self, request, pk, format=None):
#         node = self.get_node(pk)
#         graph = self.get_graph(node)
#         graph.delete_node(node)
#
#
# class EdgeDetail(APIView):
#     pass
#
# class UserDetail(APIView):
#     pass
