# Generated by Django 4.1.4 on 2023-01-21 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_alter_event_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='category',
            field=models.CharField(choices=[('Catering', 'Catering'), ('Other Services', 'Other Service'), ('PayRoll', 'PayRoll'), ('Production', 'Production'), ('Others', 'Others')], default='Other Services', max_length=50),
        ),
    ]
