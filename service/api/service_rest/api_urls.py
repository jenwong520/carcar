from .views import api_list_technicians, api_technician
from django.urls import path

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_show_technician"),
]
