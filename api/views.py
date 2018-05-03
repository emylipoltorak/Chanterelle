from django.shortcuts import render
from api.models import DiGraph, Ta skNode
from api.serializers import DiGraphSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status, generics
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.core.exceptions import ValidationError


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

@api_view(["POST"])
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

@api_view(["POST"])
def edit_node(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data['name']
        description = data['description']
        node = TaskNode.objects.get(pk=data['node'])
        node.name = name
        node.description = description
        node.save()
        return JsonResponse({'message': 'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

@api_view(["POST"])
def delete_node(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        graph = DiGraph.objects.get(pk=data['graph'])
        node = graph.nodes.all().get(pk=data['node'])
        graph.delete_node(node)
        graph.save()
        return JsonResponse({'message': 'deleted'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})


@api_view(["POST"])
def add_edge(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        graph = DiGraph.objects.get(pk=data['graph'])
        parent = graph.nodes.get(pk=data['parent'])
        child = graph.nodes.get(pk=data['child'])
        try:
            graph.add_edge(parent, child)
            graph.save()
            return JsonResponse({'message': 'success'})
        except ValidationError:
            return JsonResponse({'message': 'Circular dependency detected. Edge not created.'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

@api_view(["POST"])
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

@api_view(["POST"])
def add_workflow(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        user = request.user
        name = data['name']
        description = data['description']
        new_graph = DiGraph(name=name, description=description, owner = user)
        new_graph.save()
        return JsonResponse({'message':'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

@api_view(["POST"])
def edit_workflow(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        user = request.user
        name = data['name']
        description = data['description']
        graph = DiGraph.objects.get(pk=data['workflow'])
        graph.name=name
        graph.description=description
        graph.save()
        return JsonResponse({'message':'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

@api_view(["POST"])
def delete_workflow(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        workflow = DiGraph.objects.get(pk=data['workflow'])
        workflow.delete()
        return JsonResponse({'message': 'deleted'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})


def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        password = data['password']
        user = User.objects.create_user(username=username, password=password)
        user.save()
        graph = DiGraph(name="{}'s Tasks".format(username), owner=user)
        graph.save()
        return JsonResponse({'message': 'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

def check_username(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        try:
            User.objects.get(username=username)
            return JsonResponse({'available': 'false'})
        except:
            return JsonResponse({'available': 'true'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})

@api_view(["POST"])
def logout_user(request):
    logout(request.user)
    return JsonResponse({'message': 'user was logged out'})
