# Generated by Django 4.1.2 on 2022-10-12 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Name')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('order', models.PositiveSmallIntegerField(default=99, null=True, verbose_name='Order')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='ItemManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250, verbose_name='Name')),
                ('item_description', models.TextField(blank=True, default='', verbose_name='Item Description')),
                ('price', models.DecimalField(decimal_places=0, default=0, max_digits=12, verbose_name='Price')),
                ('active', models.BooleanField(db_index=True, default=False, verbose_name='Active')),
                ('is_featured', models.BooleanField(db_index=True, default=False, verbose_name='Featured')),
                ('featured_image', models.CharField(blank=True, max_length=150, null=True, verbose_name='Featured image')),
                ('order', models.PositiveSmallIntegerField(default=99, null=True, verbose_name='Order')),
                ('categories', models.ManyToManyField(blank=True, to='products.category', verbose_name='Categories')),
            ],
            options={
                'verbose_name': 'Menu',
                'verbose_name_plural': 'Menu',
                'ordering': ['order'],
            },
        ),
    ]
