from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

# Create your models here.

class User(AbstractUser):
    pass


class Photo(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='photo')
    photoName = models.CharField(max_length=80, blank=False)
    def item_directory_path(instance, filename):
        return '{0}/{1}'.format(datetime.datetime.now().strftime("%Y-%m-%d"), filename)
    picture = models.ImageField(null=False, blank=False, upload_to=item_directory_path)
    photoDescription = models.CharField(max_length=700, blank=True)
    timeStamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            'id': self.id,
            'photoName':self.photoName,
            'picture': self.picture.url,
            'photoDescription': self.photoDescription,
            "timestamp": self.timeStamp.strftime("%b %d %Y, %I:%M %p")
        }


class Comment(models.Model):
    photo = models.ForeignKey('Photo', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='comment_owner')
    commentContent = models.CharField(max_length=8000, blank=False)
    timeStamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            'id': self.id,
            'photo': self.photo.id,
            'username': self.user.username,
            'commentContent': self.commentContent,
            "timeStamp": self.timeStamp.strftime("%b %d %Y, %I:%M %p")
        }
    

class Reply(models.Model):    
    replyTo = models.ForeignKey('Comment', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='reply_owner')
    replyContent = models.CharField(max_length=8000, blank=False)
    timeStamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            'id': self.id,
            'replyTo': self.replyTo.id,
            'username': self.user.username,
            'replyContent': self.replyContent,
            "timeStamp": self.timeStamp.strftime("%b %d %Y, %I:%M %p")
        }
