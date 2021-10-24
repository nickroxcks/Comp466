from django.urls import include, path
from . import views

urlpatterns = [
    path('getJson/', views.getJson),
    path('getImage/<int:pk>/', views.getImage)
    #path('image_meta/<int:pk>/', views.image_meta),
    #path('download/<int:pk>/', views.download_image),
]