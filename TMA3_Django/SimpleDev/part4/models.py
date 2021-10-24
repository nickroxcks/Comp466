from django.db import models
from django.contrib.auth.models import User



# Create your models here

class computers(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    cpu = models.IntegerField()
    graphicsCard = models.IntegerField()
    hardDrive = models.IntegerField()
    ram = models.IntegerField()
    os = models.IntegerField()
    display = models.IntegerField()
    soundCard = models.IntegerField()

class cpu(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class graphicsCard(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class hardDrive(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class ram(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class os(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class display(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class soundCard(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=120)

class cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    cpu = models.ForeignKey(cpu, on_delete=models.CASCADE)
    graphicsCard = models.ForeignKey(graphicsCard, on_delete=models.CASCADE)
    hardDrive = models.ForeignKey(hardDrive, on_delete=models.CASCADE)
    ram = models.ForeignKey(ram, on_delete=models.CASCADE)
    os = models.ForeignKey(os, on_delete=models.CASCADE)
    display = models.ForeignKey(display, on_delete=models.CASCADE)
    soundCard = models.ForeignKey(soundCard, on_delete=models.CASCADE)
    price = models.FloatField()
