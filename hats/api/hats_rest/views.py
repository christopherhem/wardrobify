from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO

# Create your views here.


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "id",
        "closet_name",
        "import_href",
        "section_number",
        "shelf_number",
    ]

class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "picture_url",
    ]

class HatsDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if (location_vo_id is not None):
            hats = Hat.objects.filter(location=location_vo_id)
            
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_id = content["location"]
            print("HEREEEEE")
            print(location_id)
            location = LocationVO.objects.get(import_href=location_id)
            print("OVERHERE!!!!")
            print(location)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"}, status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE","GET", "PUT"])
def api_show_hat(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatsDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            try:
                if "location" in content:
                    location = LocationVO.objects.get(
                        id=content["location"]
                    )
                    content["location"] = location
            except LocationVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid location id"},
                    status=400
                )
            Hat.objects.filter(id=pk).update(**content)
            attendee = Hat.objects.get(id=pk)
            return JsonResponse(
                hat, encoder=HatsDetailEncoder,
                safe=False
            )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Invalid hat id"})