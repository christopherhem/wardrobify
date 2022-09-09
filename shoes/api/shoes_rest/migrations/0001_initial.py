# Generated by Django 4.0.3 on 2022-09-09 23:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BinVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('closet_name', models.CharField(max_length=100)),
                ('bin_number', models.PositiveSmallIntegerField(null=True)),
                ('bin_size', models.PositiveSmallIntegerField(null=True)),
                ('import_href', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Shoe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=200)),
                ('picture_url', models.URLField(null=True)),
                ('bin', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='bin', to='shoes_rest.binvo')),
            ],
        ),
    ]