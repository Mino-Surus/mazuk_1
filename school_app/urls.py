from school_app import views
from django.urls import path

urlpatterns = [
    path('', views.root),
    path('student/', views.students, name='students'), 
    path('course/<int:course_id>/', views.course_about, name='course'),
    ]