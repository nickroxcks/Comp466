from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
# Create your views here. Views handel your various webpages
def index(request):
    if not request.user.is_authenticated:
        return redirect('./login/')
    return render(request, "part4/index.html")

def contact(request):
    if not request.user.is_authenticated:
        return redirect('./login/')
    return render(request, 'part4/contact.html')

def parts(request):
    if not request.user.is_authenticated:
        return redirect('./login/')
    return render(request, 'part4/parts.html')

def computers(request):
    if not request.user.is_authenticated:
        return redirect('./login/')
    return render(request, 'part4/computers.html')

def cart(request):
    if not request.user.is_authenticated:
        return redirect('./login/')
    return render(request, 'part4/cart.html')
def login(request):
    return render(request, 'part4/login.html')

def createAccount(request):
    return render(request, 'part4/createAccount.html')