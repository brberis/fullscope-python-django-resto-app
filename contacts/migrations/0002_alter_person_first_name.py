# Generated by Django 4.1.4 on 2023-01-16 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='first_name',
            field=models.CharField(max_length=100, verbose_name='First Name'),
        ),
    ]
