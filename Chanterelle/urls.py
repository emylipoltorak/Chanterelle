from django.contrib import admin
from django.urls import path
from api import views as a_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', a_views.home, name='home'),
    path('api/', a_views.DiGraphList.as_view()),
    path('add-node/', a_views.add_node),
    path('add-edge/', a_views.add_edge)
]
