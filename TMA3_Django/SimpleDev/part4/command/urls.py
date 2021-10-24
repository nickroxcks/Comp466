from django.urls import path
from . import views

urlpatterns = [
    path('getParts/', views.getParts, name='components'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/logout/', views.logout_user, name='logout'),
    path('auth/createUser/', views.createUser, name='createUser'),
    path('addCart/', views.addCart),
    path('getCart/', views.getCart),
    path('deleteCart/', views.deleteCart)
]