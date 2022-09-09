from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .acls import get_photo

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

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'name',
        'manufacturer',
        'color',
        'picture_url',
        'bin',
    ]
    encoders = {
        'bin': BinVODetailEncoder(),
    }

@require_http_methods(['GET', 'POST'])
def api_list_shoes(request, bin_id=None):
    if request.method=='GET':
        if bin_id is not None:
            shoes = Shoe.objects.filter(bin=bin_id)
        else:
            shoes = Shoe.objects.all()
        
        return JsonResponse(
            {'shoes': shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content['bin']
            bin = BinVO.objects.get(import_href=bin_href)
            content['bin']=bin
        except:
            return JsonResponse(
                {"message": "invalid ID"},
                status = 400,
            )
        
        photo = get_photo(content['name'], content['color'], content['manufacturer'])
        content.update(photo)
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_detail_shoe(request, shoe_id):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=shoe_id)
        return JsonResponse(
            shoe, 
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=shoe_id).delete()
        return JsonResponse({"deleted": count > 0})
