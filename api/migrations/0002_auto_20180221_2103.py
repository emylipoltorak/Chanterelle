# Generated by Django 2.0.1 on 2018-02-21 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tasknode',
            name='owner',
        ),
        migrations.AddField(
            model_name='tasknode',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
