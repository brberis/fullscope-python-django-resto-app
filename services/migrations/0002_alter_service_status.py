# Generated by Django 4.1.4 on 2023-01-18 04:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='status',
            field=models.CharField(choices=[('Unconfirmed', 'Unconfirmed'), ('Confirmed', 'Confirmed'), ('Suspended', 'Suspended'), ('Finished', 'Finished'), ('Cancelled', 'Cancelled')], default='Unconfirmed', max_length=50),
        ),
    ]
