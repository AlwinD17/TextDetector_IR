from django.urls import path
from .views import detectText

urlpatterns = [
    path('detectText/', detectText, name='detect_text'),
]