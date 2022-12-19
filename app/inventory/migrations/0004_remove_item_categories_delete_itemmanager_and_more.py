# Generated by Django 4.1.2 on 2022-12-06 02:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('production', '0003_alter_formula_ingredient_alter_formula_product_and_more'),
        ('inventory', '0003_item_for_sale'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='categories',
        ),
        migrations.DeleteModel(
            name='ItemManager',
        ),
        migrations.AlterField(
            model_name='inventory',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventory', to='products.item', verbose_name='Item'),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]