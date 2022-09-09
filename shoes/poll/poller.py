import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()


# Import models from hats_rest, here.
from shoes_rest.models import BinVO

def poll():
    while True:
        try:
            response = requests.get('http://wardrobe-api:8000/api/bins/')
            content = json.loads(response.content)
            for bin in content['bins']:
                BinVO.objects.update_or_create(
                    import_href = bin['href'],
                    defaults = {'name': bin['closet_name']},
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)   

if __name__ == "__main__":
    poll()
