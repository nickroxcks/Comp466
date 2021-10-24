from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse, Http404, HttpResponse
from pathlib import Path
import os

# Create your views here. Views handel your various webpages
def index(request):
    #print(request.user)
    return render(request, "part3/index.html")

def contact(request):
    return render(request, 'part3/contact.html')

def parts(request):
    return render(request, 'part3/parts.html')

def computers(request):
    return render(request, 'part3/computers.html')

def cart(request):
    return render(request, 'part3/cart.html')
