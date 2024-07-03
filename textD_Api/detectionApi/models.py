from django.db import models

class Post(models.Model):
    title = "IMAGE"
    image = models.ImageField(upload_to='post_images')
    mode = models.BooleanField(default=False)  
    languages = models.CharField(max_length=100, default='eng+spa+fra+deu+ita+rus')  
    
    def __str__(self):
        return self.title
