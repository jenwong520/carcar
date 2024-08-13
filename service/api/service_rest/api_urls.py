from .views import api_list_technicians
from django.urls import path

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]
