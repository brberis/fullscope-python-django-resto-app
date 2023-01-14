# Generated by Django 4.1.4 on 2023-01-14 04:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100, null=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('special_discount', models.CharField(blank=True, max_length=250, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_client', to='contacts.person')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('unit_price', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('qty', models.IntegerField(default=1)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_item', to='orders.order')),
            ],
        ),
    ]
