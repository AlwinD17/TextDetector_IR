import json
import os
import logging
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from deep_translator import GoogleTranslator
from gtts import gTTS
import tempfile
import base64

# Configurar el logger
logger = logging.getLogger(__name__)

@api_view(['POST'])
def translate(request):
    if request.method == 'POST':
        try:
            request_data = json.loads(request.body.decode('utf-8'))
            input_text = request_data.get('input')
            to_language = request_data.get('to')

            logger.debug(f"Received request data: input_text={input_text}, to_language={to_language}")

            
            if not input_text or not to_language:
                logger.error(f"Missing required fields: input_text={input_text}, to_language={to_language}")
                return JsonResponse({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)


            translator = GoogleTranslator(source='auto', target=to_language)
            output_text = translator.translate(text=input_text)

            tts = gTTS(text=output_text, lang=to_language)
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
                tts.save(temp_audio_file.name)
                translated_audio_path = temp_audio_file.name

            with open(translated_audio_path, 'rb') as audio_file:
                audio_base64 = base64.b64encode(audio_file.read()).decode('utf-8')

            data = {
                'translatedText': output_text,
                'translatedAudio': audio_base64
            }

            os.remove(translated_audio_path)

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.exception("An error occurred during translation")
            return JsonResponse({'error': 'An error occurred during translation. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({'error': 'Unexpected error'}, status=status.HTTP_400_BAD_REQUEST)