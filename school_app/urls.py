from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.root, name='course-list'),
    path('student/', views.students, name='student-detail'),
    path('course/<int:course_id>/', views.course_about, name='course-detail'),
    path('csrf/', views.get_csrf_token, name='csrf'),
    path('login/', views.login_view, name='login'),
]