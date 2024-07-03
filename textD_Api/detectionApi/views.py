from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer
from .models import Post
from .detector import detect_text
from pathlib import Path
import os
from langdetect import detect
from gtts import gTTS
from django.http import HttpResponse, JsonResponse
import json
import tempfile
import base64

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        post_serializer = PostSerializer(data=request.data)

        if post_serializer.is_valid():
            post = post_serializer.save()

            image_file = post.image
            mode = request.data.get('mode', 'false').lower() == 'true'
            languages = request.data.get('languages', 'eng+spa+fra+deu+ita+rus')

            image_path = image_file.path
            image_text = detect_text(image_path, mode=mode, languages=languages)

            # Detectar el idioma del texto
            detected_language = detect(image_text)

            # Convertir el texto a audio
            tts = gTTS(text=image_text, lang=detected_language)
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
                tts.save(temp_audio_file.name)
                audio_path = temp_audio_file.name

            data = {
                "imageText": image_text,
                "audioFile": base64.b64encode(open(audio_path, 'rb').read()).decode('utf-8')
            }

            os.remove(image_path)
            os.remove(audio_path)

            return Response(data, status=status.HTTP_201_CREATED)

        else:
            return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)