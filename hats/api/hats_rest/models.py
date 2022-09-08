from django.db import models

# Create your models here.

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField(null=True)
    shelf_number = models.PositiveSmallIntegerField(null=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.closet_name

class Hat(models.Model):
    fabric = models.CharField(max_length=50)
    style_name = models.CharField(max_length=50) 
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(LocationVO, related_name="hats", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.fabric