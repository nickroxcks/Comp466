#import os
from pathlib import Path
import json
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, HttpResponseForbidden, Http404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from part4.models import *

# for part 3, data is hard coded in json. Send the json data to front end
'''
def getParts(request):
    BASE_DIR = Path(__file__).resolve().parent.parent

    txt = Path(os.path.join(BASE_DIR,'tempData.json')).read_text()
    return HttpResponse(txt, content_type = "text/plain")
'''
# for part 4, we are now grabbing the data from the db, and sending it to client via json
def getParts(request):
    parts = {
        'computers': list(computers.objects.values()),
        'cpu': list(cpu.objects.values()),
        'graphicsCard': list(graphicsCard.objects.values()),
        'hardDrive': list(hardDrive.objects.values()),
        'ram': list(ram.objects.values()),
        'os': list(os.objects.values()),
        'display': list(display.objects.values()),
        'soundCard': list(soundCard.objects.values()),
    }
    return JsonResponse(parts, safe=False)


def login_user(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return redirect('../../../')
    else:
        return HttpResponseForbidden('Cannot login')

def logout_user(request):
    logout(request)
    return redirect('../../../login/')

@csrf_exempt
def createUser(request):
    str = request.body.decode('utf-8')
    user_params = json.loads(str)

    user = add_user_db(user_params)
    return HttpResponseRedirect(redirect_to='../../../')

def add_user_db(params):
    user = User.objects.create_user(
        params['userName'],
        params['email'],
        params['password']
    )
    user.last_name = params['lastName']
    user.first_name = params['firstName']
    user.save()
    return user

# cartItem = "A,B,C,D,E,F,G,H" , A = computerid, B = cpuid, C = graphicsid, D = harddriveID, E = ramID, F = osID,
# G = displayID, H = soundID
def addCart(request):
    if request.method == 'GET':
        try:
            userID = request.user.id
            computerID = request.GET.get('computerID', None)
            cpuID = request.GET.get('cpuID', None)
            graphicsCardID = request.GET.get('graphicsCardID', None)
            hardDriveID = request.GET.get('hardDriveID', None)
            ramID = request.GET.get('ramID', None)
            osID = request.GET.get('osID', None)
            displayID = request.GET.get('displayID', None)
            soundCardID = request.GET.get('soundCardID', None)

            computerQuery = computers.objects.get(pk=computerID)
            computerName = computerQuery.name

            totalPrice = cpu.objects.get(pk=cpuID).price + graphicsCard.objects.get(pk=graphicsCardID).price\
            + hardDrive.objects.get(pk=hardDriveID).price + ram.objects.get(pk=ramID).price\
            + os.objects.get(pk=osID).price + display.objects.get(pk=displayID).price\
            + soundCard.objects.get(pk=soundCardID).price

            cart.objects.create(
                user = User.objects.get(pk=userID),
                name = computerName,
                cpu = cpu.objects.get(pk=cpuID),
                graphicsCard = graphicsCard.objects.get(pk=graphicsCardID),
                hardDrive = hardDrive.objects.get(pk=hardDriveID),
                ram = ram.objects.get(pk=ramID),
                os = os.objects.get(pk=osID),
                display = display.objects.get(pk=displayID),
                soundCard = soundCard.objects.get(pk=soundCardID),
                price = totalPrice
            )
            return HttpResponse("Added to Cart!", content_type="text/plain")
        except IOError:
            print("Error adding item to cart")
            return Http404()
    else:
        return Http404()

def getCart(request):
    userID = request.user.id
    currentCart = {
        'cart': list(cart.objects.filter(user__id=userID).values()),
    }
    #print(currentCart)
    return JsonResponse(currentCart, safe=False)

def deleteCart(request):
    cartID = request.GET.get('cartID', None)
    try:
        cart.objects.filter(pk=cartID).delete()
        return HttpResponse("Deleted cart!", content_type="text/plain")

    except IOError:
        return Http404()



