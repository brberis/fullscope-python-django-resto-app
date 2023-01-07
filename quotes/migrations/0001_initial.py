# Generated by Django 4.1.4 on 2023-01-04 03:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(default=0)),
                ('tax', models.DecimalField(decimal_places=2, default=0, max_digits=2)),
                ('date', models.DateField(auto_now_add=True)),
                ('due_date', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('Draft', 'Draft'), ('Sent', 'Sent'), ('Approved', 'Approved'), ('Disapproved', 'Disapproved'), ('Cancelled', 'Cancelled')], default='Draft', max_length=50)),
                ('notes', models.TextField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quote_client', to='contacts.person')),
            ],
        ),
        migrations.CreateModel(
            name='QuoteOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_quote', to='orders.order')),
                ('quote', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quote_order', to='quotes.quote')),
            ],
        ),
        migrations.CreateModel(
            name='QuoteItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('unit_price', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('qty', models.IntegerField(default=1)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('quote', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quote_item', to='quotes.quote')),
            ],
        ),
    ]