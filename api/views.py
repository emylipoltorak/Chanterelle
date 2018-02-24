from django.shortcuts import render
from api.models import DiGraph
from api.serializers import DiGraphSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status, generics
from django.http import JsonResponse
import json
from django.contrib.auth.models import User


def home(request):
    return render(request, 'api/index.html')

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)

class DiGraphList(APIView):

    def get(self, request, format=None):
        graphs = DiGraph.objects.all()
        serializer = DiGraphSerializer(graphs, many=True)
        return Response(serializer.data)

class DiGraphByUser(APIView):
    def post(self, request, format=None):
        graphs = DiGraph.objects.filter(owner__username = request.user.username)
        serializer = DiGraphSerializer(graphs, many=True)
        return Response(serializer.data)

class DiGraphByID(APIView):
    def post(self, request, format=None):
        graphs = DiGraph.objects.get(pk=request.data['id'])
        serializer = DiGraphSerializer(graphs, many=False)
        return Response(serializer.data)

def add_node(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data['name']
        description = data['description']
        graph = DiGraph.objects.get(pk=data['graph'])
        graph.add_node(name, description=description)
        graph.save()
        return JsonResponse({'message': 'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})


def delete_node(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        graph = DiGraph.objects.get(pk=data['graph'])
        node = graph.nodes.all().get(pk=data['node'])
        graph.delete_node(node)
        graph.save()
        return JsonResponse({'message': 'deleted'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})


def add_edge(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        graph = DiGraph.objects.get(pk=data['graph'])
        parent = graph.nodes.get(pk=data['parent'])
        child = graph.nodes.get(pk=data['child'])
        graph.add_edge(parent, child)
        graph.save()
        return JsonResponse({'message': 'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})


def delete_edge(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        graph = DiGraph.objects.get(pk=data['graph'])
        parent = graph.nodes.all().get(pk=data['parent'])
        child = graph.nodes.all().get(pk=data['child'])
        graph.remove_edge(parent, child)
        graph.save()
        return JsonResponse({'message': 'deleted'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        password = data['password']
        user = User.objects.create_user(username=username, password=password)
        user.save()
        graph = DiGraph(name="{}'s Tasks".format(username.title()), owner=user)
        graph.save()
        return JsonResponse({'message': 'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

def logout_user(request):
    logout(request.user)
    return JsonResponse({'message': 'user was logged out'})
