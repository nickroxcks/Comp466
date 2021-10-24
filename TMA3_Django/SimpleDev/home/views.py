from django.http import HttpResponse
from django.shortcuts import render

# Create your views here. Views handel your various webpages
def index(request):
    #print(request.user)
    return render(request, "home/tma3.html")

def architecture(request):
    return render(request, "home/Architecture.html")

def part1Doc(request):
    return render(request, "home/part1Doc.html")
def part2Doc(request):
    return render(request, "home/part2Doc.html")
def part3Doc(request):
    return render(request, "home/part3Doc.html")
def part4Doc(request):
    return render(request, "home/part4Doc.html")