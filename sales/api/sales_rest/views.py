import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Salesperson, Customer, Sale
from .encoders import (
    AutomobileVOEncoder,
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_saleperson(request, pk):
    if request.method == "GET":
        try:
            saleperson = Salesperson.objects.get(id=pk)
            return JsonResponse(
                saleperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            saleperson = Salesperson.objects.get(id=pk)
            saleperson.delete()
            return JsonResponse(
                saleperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            saleperson = Salesperson.objects.get(id=pk)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(saleperson, prop, content[prop])
            saleperson.save()
            return JsonResponse(
                saleperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["first_name", "last_name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        salesperson_id = request.GET.get('salesperson', None)
        if salesperson_id:
            sales = Sale.objects.filter(salesperson__id=salesperson_id)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)

            automobile = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile)
            content["automobile"] = automobile

            salesperson = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson)
            content["salesperson"] = salesperson

            customer = content["customer"]
            customer = Customer.objects.get(id=customer)
            content["customer"] = customer

            sale = Sale.objects.create(**content)

            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )

        except (AutomobileVO.DoesNotExist, Salesperson.DoesNotExist, Customer.DoesNotExist) as e:
            return JsonResponse({"message": str(e)}, status=400)

        except KeyError as e:
            print("Missing field:", str(e))
            return JsonResponse({"message": f"Missing field: {str(e)}"}, status=400)

        except Exception as e:
            print("General error:", str(e))
            return JsonResponse({"message": "An error occurred while creating the sale"}, status=400)


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(id=pk)

            if "automobile" in content:
                automobile = AutomobileVO.objects.get(vin=content["automobile"])
                sale.automobile = automobile

            if "salesperson" in content:
                salesperson = Salesperson.objects.get(id=content["salesperson"])
                sale.salesperson = salesperson

            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                sale.customer = customer

            if "price" in content:
                sale.price = content["price"]

            sale.save()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except (Sale.DoesNotExist, AutomobileVO.DoesNotExist, Salesperson.DoesNotExist, Customer.DoesNotExist) as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 404
            return response
