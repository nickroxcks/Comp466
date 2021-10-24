from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.urls.conf import include


urlpatterns = [
    path('', views.index, name='index'),
    path('contact', views.contact, name='contact'),
    path('parts/', views.parts, name='parts'),
    path('computers/', views.computers, name='computers'),
    path('cart/', views.cart, name='cart'),
    path('login/', views.login, name='login'),
    path('createAccount/', views.createAccount, name='createAccount'),
    path('command/', include('part4.command.urls'))
]