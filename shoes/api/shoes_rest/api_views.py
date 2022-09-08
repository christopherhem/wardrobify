from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


from common.json import ModelEncoder
from .models import Shoe, BinVO

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ['name']

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'name',
        'manufacturer',
        'color',
        'picture_url',
        'bin',
        'id',
    ]
    encoders = {
        'bin': BinVODetailEncoder(),
    }