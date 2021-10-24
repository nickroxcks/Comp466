import os
from pathlib import Path
from django.http import JsonResponse, Http404, HttpResponse

def getJson(request):
    BASE_DIR = Path(__file__).resolve().parent.parent

    txt = Path(os.path.join(BASE_DIR,'Image_data.json')).read_text()
    return HttpResponse(txt, content_type = "text/plain")

def getImage(request, pk):
    if request.method == 'GET':
        file_path = os.path.join(Path(__file__).resolve().parent.parent, 'pictures/')
        image_path = file_path + str(pk) + '.jpg'
        try:
            with open(image_path, "rb") as f:
                return HttpResponse(f.read(), content_type="image/jpeg")
        except IOError:
            print("we getting here")
            return Http404()
    else:
        return Http404()