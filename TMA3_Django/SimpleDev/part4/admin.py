from django.contrib import admin
#from . import models
from part4.models import *
# Register your models here.
admin.site.register(computers)
admin.site.register(cpu)
admin.site.register(graphicsCard)
admin.site.register(hardDrive)
admin.site.register(ram)
admin.site.register(os)
admin.site.register(display)
admin.site.register(soundCard)
admin.site.register(cart)
