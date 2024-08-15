from django.urls import path

from .views import (
    api_saleperson,
    api_salespeople,
    api_customer,
    api_customers,
    api_sale,
    api_sales,
)

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:pk>/", api_saleperson, name="api_saleperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
]
