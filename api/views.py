from django.shortcuts import render

# Create your views here.
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny
from PIL import Image
import numpy as np
from .ml_model import predict

class PredictView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            image_file = request.FILES.get("image")
            if not image_file:
                return Response({"error": "No image provided"}, status=400)

            image = Image.open(io.BytesIO(image_file.read()))
            image = np.array(image)
            label = predict(image)

            return Response({"prediction": label}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
