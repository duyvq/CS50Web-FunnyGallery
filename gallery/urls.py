from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register, name='register'),
    path('submit', views.submit_view, name='submit'),
    path('meme', views.meme_view, name='meme'),
    path('picture/<str:id>', views.picture_detail_view, name='picture_detail'),

    path('all_picture', views.all_picture, name='all_picture'),
    path('upload', views.upload, name='upload'),
    path('upload_meme', views.upload_meme, name='upload_meme'),
    path('search', views.search, name='search'),
    path('comment', views.comment, name='comment'),
    path('load_all_comment/<str:picture_id>', views.load_all_comment, name='load_all_comment'),
    path('reply', views.reply, name='reply'),
    path('load_all_reply/<str:comment_id>', views.load_all_reply, name='load_all_reply'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)