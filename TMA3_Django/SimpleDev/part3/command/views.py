import os
from pathlib import Path
from django.http import JsonResponse, Http404, HttpResponse

# for part 3, data is hard coded in json. Send the json data to front end
def getParts(request):
    BASE_DIR = Path(__file__).resolve().parent.parent

    txt = Path(os.path.join(BASE_DIR,'tempData.json')).read_text()
    return HttpResponse(txt, content_type = "text/plain")