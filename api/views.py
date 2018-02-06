from django.shortcuts import render
from api.models import DiGraph
from api.serializers import DiGraphSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json

def home(request):
    return render(request, 'api/index.html')


class DiGraphList(APIView):

    def get(self, request, format=None):
        graphs = DiGraph.objects.all()
        serializer = DiGraphSerializer(graphs, many=True)
        return Response(serializer.data)


def add_node(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data['name']
        graph = DiGraph.objects.get(pk=data['graph'])
        graph.add_node(name)
        return JsonResponse({'message': 'success'})
    return JsonResponse({status: status.HTTP_400_BAD_REQUEST})
