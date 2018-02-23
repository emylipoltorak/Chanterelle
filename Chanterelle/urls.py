from django.contrib import admin
from django.urls import path, re_path
from api import views as a_views
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from api.views import UserViewSet
from django.conf.urls import url

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('favicon.ico/', RedirectView.as_view(url=staticfiles_storage.url('api/img/favicon.ico'))),
    path('admin/', admin.site.urls),
    path('', a_views.home),
    path('api/', a_views.DiGraphList.as_view()),
    path('api/graphs-by-username/', a_views.DiGraphByUser.as_view()),
    path('api/graph-by-id/', a_views.DiGraphByID.as_view()),
    path('add-node/', a_views.add_node),
    path('add-edge/', a_views.add_edge),
    path('delete-node/', a_views.delete_node),
    path('delete-edge/', a_views.delete_edge),
    path('register-user/', a_views.register_user),
    path('obtain-auth-token/', csrf_exempt(obtain_auth_token))
]

urlpatterns += router.urls

urlpatterns += [
    re_path(r'^.*/', TemplateView.as_view(template_name="api/index.html"))
]
