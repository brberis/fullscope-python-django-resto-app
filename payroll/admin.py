from django.contrib import admin
from .models import Employee, PayrollPeriod, Paycheck

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass

@admin.register(PayrollPeriod)
class PayrollPeriodAdmin(admin.ModelAdmin):
    pass
  
@admin.register(Paycheck)
class PaycheckAdmin(admin.ModelAdmin):
    pass