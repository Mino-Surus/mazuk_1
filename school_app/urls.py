from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.root, name='course-list'),
    path('student/', views.students, name='student-detail'),
    path('course/<int:course_id>/', views.course_about, name='course-detail'),
    path('csrf/', views.get_csrf_token, name='csrf'),
    path('login/', views.login_view, name='login'),
    path('enroll/<int:course_id>/', views.enroll_course, name='enroll-course'),
    path('my-courses/', views.my_courses, name='my-courses'),
    path('course/<int:course_id>/lessons/', views.course_lessons, name='course-lessons')
]