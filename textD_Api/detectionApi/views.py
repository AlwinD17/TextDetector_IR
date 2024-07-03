from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .serializers import PostSerializer
from .models import Post
from .detector import detect_text
from langdetect import detect
from gtts import gTTS
import tempfile
import base64
import os

@api_view(['POST'])
def detectText(request):
    if request.method == 'POST':
        try:
            parser_classes = (MultiPartParser, FormParser)
            post_serializer = PostSerializer(data=request.data)

            if post_serializer.is_valid():
                post = post_serializer.save()
                image_file = post.image
                mode = request.data.get('mode', 'false').lower() == 'true'
                languages = request.data.get('languages', 'eng+spa+fra+deu+ita+rus')

                image_path = image_file.path
                image_text = detect_text(image_path, mode=mode, languages=languages)

                detected_language = detect(image_text)

                tts = gTTS(text=image_text, lang=detected_language)
                
                with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
                    tts.save(temp_audio_file.name)
                    audio_path = temp_audio_file.name

                with open(audio_path, 'rb') as audio_file:
                    audio_base64 = base64.b64encode(audio_file.read()).decode('utf-8')

                data = {
                    "imageText": image_text,
                    "audioFile": audio_base64
                }

                os.remove(image_path)
                os.remove(audio_path)

                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({'error': 'Unexpected error'}, status=status.HTTP_400_BAD_REQUEST)
