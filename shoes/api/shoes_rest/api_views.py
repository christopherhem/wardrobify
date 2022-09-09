from django.shortcuts import render
from .models import Shoe, BinVO
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json
# Create your views here.
class BinDetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        'closet_name',
        'import_href',
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'name',
        'id',
        'picture_url',
        'color',
        'manufacturer',
    ]

    def get_extra_data(self, o):
        return {"bin": o.bin.closet_name}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "name",
        'color',
        'picture_url',
        'manufacturer',
        'bin',
    ]
    encoders = {
        'bin': BinDetailEncoder(),
    }



@require_http_methods(['GET', 'POST'])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
        {'shoes': shoes},
        encoder=ShoeListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content['bin']
            bin = BinVO.objects.get(import_href=bin_href)
            content['bin'] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid bin id'},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(['DELETE', 'PUT', 'GET'])
def api_show_shoes(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({'message': 'Does not exist'})
            response.status_code=404
            return response
    elif request.method == "DELETE":
        try:
            shoe = Shoe.objects.get(id=pk)
            shoe.delete()
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse({'message': 'Does not exist'})
    else:
        try:
            content = json.loads(request.body)
            Shoe.objects.filter(id=pk).update(**content)
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
