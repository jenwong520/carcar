from .views import (
    api_list_technicians,
    api_technician,
    api_list_appointments,
    api_appointment,
    cancel_appointment,
    finish_appointment,
)
from django.urls import path

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_appointment, name="api_appointment"),
    path("appointments/<int:id>/cancel/", cancel_appointment, name="cancel_appointment"),
    path("appointments/<int:id>/finish/", finish_appointment, name="finish_appointment"),
]
