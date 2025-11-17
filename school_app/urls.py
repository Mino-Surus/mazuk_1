from school_app import views
from django.urls import path

urlpatterns = [
    path('', views.root),
    path('student/', views.students, name='students'), 
]
