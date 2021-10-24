from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from home import views

urlpatterns = [
    path('', views.index, name='index'),
    path('architecture/', views.architecture, name='index'),
    path('part1Doc/', views.part1Doc, name='part1Doc'),
    path('part2Doc/', views.part2Doc, name='part2Doc'),
    path('part3Doc/', views.part3Doc, name='part3Doc'),
    path('part4Doc/', views.part4Doc, name='part4Doc')
]