from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.urls.conf import include


urlpatterns = [
    path('', views.index, name='index'),
    path('contact', views.contact, name='contact'),
    path('parts/', views.parts, name='parts'),
    path('computers/', views.computers, name='parts'),
    path('cart/', views.cart, name='cart'),
    path('command/', include('part3.command.urls'))
]