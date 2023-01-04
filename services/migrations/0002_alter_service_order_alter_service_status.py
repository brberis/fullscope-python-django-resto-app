# Generated by Django 4.1.4 on 2023-01-04 03:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.order'),
        ),
        migrations.AlterField(
            model_name='service',
            name='status',
            field=models.CharField(choices=[('Unconfirmed', 'Unconfirmed'), ('Confirmed', 'Confirmed'), ('Suspended', 'Suspended'), ('Finished', 'Finished'), ('Cancelled', 'Cancelled')], default='Active', max_length=50),
        ),
    ]
