from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from slideshow import views

urlpatterns = [
    path('', views.index, name='index'),
    path('command/', include('slideshow.command.urls')),
    #path('getImageJson', views.getImageJson),
    #path('images/', views.images),
    #path('image_meta/<int:pk>/', views.image_meta),
    #path('download/<int:pk>/', views.download_image)

]