from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('active', "Active"),
        ('canceled', 'Canceled'),
        ('finished', 'Finished'),
    ]
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active',
    )
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def update_status(self):
        if self.status == 'active':
            self.status = 'canceled'
        else:
            self.status = 'finished'
        self.save()
