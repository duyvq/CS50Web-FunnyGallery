from multiprocessing import AuthenticationError
from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
import json, datetime, base64
from django import forms

from .models import User, Photo, Comment, Reply

class NewUpload(forms.Form):
    fileName = forms.CharField(label="Photo Name", max_length=80, required=True)
    picture = forms.ImageField(label="Picture", required=True)
    photoDescription = forms.CharField(required=False, max_length=700)


# Create your views here.
def index(request):
    return render(request, 'gallery/index.html')


def login_view(request):
    if request.method == 'POST':
        
        # Attempt user to sign in
        user_request = json.loads(request.body)
        username = user_request.get('username')
        password = user_request.get('password')
        user = authenticate(request, username=username, password=password)

        # Check if authentication is successful
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successfully."}, status=201)
            # return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, 'gallery/login.html',{
                'message': 'Invalid username and/or password.'
            })
    else:
        # return HttpResponseRedirect(reverse('index'))
        return render(request, 'gallery/login.html')


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


def register(request):
    if request.method == 'POST':
        user_request = json.loads(request.body)
        username = user_request.get('username')
        email = user_request.get('email')

        # Ensure password matches confirmation
        password = user_request.get('password')
        confirmation = user_request.get('confirmation')
        if password != confirmation:
            return JsonResponse({'message': 'Passwords must match.'})

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({'message': 'Username already taken.'})
        login(request, user)
        return JsonResponse({"message": "Create new user successfully."}, status=201)
    else:
        return HttpResponseRedirect(reverse('index'))


def submit_view(request):
    if request.user.is_authenticated:
        return render(request, 'gallery/submit.html')
    else:
        return HttpResponseRedirect(reverse('index'))


def meme_view(request):
    if request.user.is_authenticated:
        return render(request, 'gallery/meme.html')
    else:
        return HttpResponseRedirect(reverse('index'))


@login_required
def upload(request):
    if request.method == 'POST':
        form = NewUpload(request.POST, request.FILES)
        if form.is_valid():
            newPhoto = Photo()
            newPhoto.user = request.user
            newPhoto.photoName = form.cleaned_data['fileName']
            newPhoto.picture = request.FILES['picture']
            newPhoto.photoDescription = form.cleaned_data['photoDescription']
            newPhoto.timeStamp = datetime.datetime.now()
            print("Title: {}. Description: {}. Picture: {}. Time: {}.".format(newPhoto.photoName,
                newPhoto.photoDescription, newPhoto.picture, newPhoto.timeStamp))
            newPhoto.save()
        else:
            print("form is invalid")
        return HttpResponseRedirect(reverse('index'))


@login_required
def upload_meme(request):
    if request.method == 'POST':
        form = json.loads(request.body)
        newPhoto = Photo()
        newPhoto.user = request.user
        newPhoto.photoName = form.get('fileName')
        newPhoto.picture = ContentFile(base64.b64decode(form.get('picture')), name=form.get('fileName'))
        newPhoto.photoDescription = form.get('photoDescription')
        newPhoto.timeStamp = datetime.datetime.now()
        print('Form: {}'.format(form) )
        print('New Photo: {}'.format(newPhoto) )
        newPhoto.save()
        return JsonResponse({'message': 'Submit new meme successfully.'}, status=201)
    return HttpResponseRedirect(reverse('index'))


def all_picture(request):
    photos = Photo.objects.all().order_by('-timeStamp').all()
    return JsonResponse([photo.serialize() for photo in photos], safe=False)


def search(request):
    query = request.GET.get('q')
    result_list = []
    # Query whole string
    for item in Photo.objects.filter(photoName__icontains=query):
        result_list.append(item)
    
    if len(result_list) > 0:
        return render(request, 'gallery/index.html', {
            'result': result_list,
            'message': 'Result: '
        })
    else:
        return render(request, 'gallery/index.html', {
            'error': 'No picture found'
        })


def picture_detail_view(request, id):
    try:
        picture = Photo.objects.get(id=id)
    except Photo.DoesNotExist:
        return render(request, 'gallery/detail.html', {
            'error': 'Picture does not exist'
        })
        
    return render(request, 'gallery/detail.html', {
        'picture_detail': picture,
    })


@login_required
def comment(request):
    if request.method == 'POST':
        comment = json.loads(request.body)
        new_comment = Comment()
        new_comment.photo = Photo.objects.get(id=comment.get('photoId'))
        new_comment.user = request.user
        new_comment.commentContent = comment.get('commentContent')
        new_comment.timeStamp = datetime.datetime.now()
        new_comment.save()
        return JsonResponse(new_comment.serialize(), status=201, )
    else:
        return HttpResponseRedirect(reverse('index'))


def load_all_comment(request, picture_id):
    # Get start and end points
    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))

    comments = Comment.objects.filter(photo_id=picture_id)
    return JsonResponse([comment.serialize() for comment in comments], safe=False)


def reply(request):
    if request.method == 'POST':
        reply = json.loads(request.body)
        new_reply = Reply()
        new_reply.replyTo = Comment.objects.get(id=reply.get('replyTo'))
        new_reply.user = request.user
        new_reply.replyContent = reply.get('replyContent')
        new_reply.timeStamp = datetime.datetime.now()
        new_reply.save()
        return JsonResponse(new_reply.serialize(), status=201, )
    else:
        return HttpResponseRedirect(reverse('index'))


def load_all_reply(request, comment_id):
    replies = Reply.objects.filter(replyTo_id=comment_id)
    return JsonResponse([reply.serialize() for reply in replies], safe=False)
