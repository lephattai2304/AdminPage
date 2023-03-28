"""adminProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from usersApp import views

urlpatterns = [

    path('register', views.register),
    path('login', views.login),
    path('logout', views.logout),
    path('user', views.AuthenticatedUser.as_view()),
    path('permissions', views.PermissionAPIView.as_view()),
    path('roles', views.RoleViewSet.as_view({
        'get' : 'list',
        'post' : 'create'
    })),

    path('roles/<str:pk>', views.RoleViewSet.as_view({
        'get' : 'retrieve',
        'put' : 'update',
        'delete' :'destroy'
    })),
    path('users', views.UserGenericAPIView.as_view()),
    path('user/info', views.ProfileInfoAPIView.as_view()),
    path('user/password', views.ProfilePasswordAPIView.as_view()),
    path('users/<str:pk>', views.UserGenericAPIView.as_view()),

]
