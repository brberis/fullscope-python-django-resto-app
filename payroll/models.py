from django.db import models
from contacts.models import Person

# Create your models here.
from django.db import models

class Employee(models.Model):
    person = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    job_title = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    hire_date = models.DateField()
    is_active = models.BooleanField(default=True)
   
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class PayrollPeriod(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    processed_date = models.DateField()
    processed_by = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"{self.start_date} - {self.end_date}"

class Paycheck(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    payroll_period = models.ForeignKey(PayrollPeriod, on_delete=models.CASCADE)
    gross_pay = models.DecimalField(max_digits=10, decimal_places=2)
    net_pay = models.DecimalField(max_digits=10, decimal_places=2)
    deductions = models.DecimalField(max_digits=10, decimal_places=2)
    taxes = models.DecimalField(max_digits=10, decimal_places=2)
   
    def __str__(self):
        return f"{self.employee} - {self.payroll_period}"
