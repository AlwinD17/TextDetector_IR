# Generated by Django 5.0.6 on 2024-07-03 14:34

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("detectionApi", "0002_post_languages_post_mode_post_title"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="title",
        ),
    ]
