from django.urls import path
from . import views

urlpatterns = [
    path('getParts/', views.getParts, name='components'),
]