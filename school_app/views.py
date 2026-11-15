from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import *
from .serializers import *

@api_view(['GET'])
def root(request):
    search_query = request.GET.get('search', '')
    level_filter = request.GET.get('level', '')
    
    courses = course.objects.all()
    if search_query:
        courses = courses.filter(name__icontains=search_query)
    if level_filter:
        courses = courses.filter(level=level_filter)
    
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def students(request):
    student_number = int(request.GET.get('number', 1))
    try:
        student_obj = student.objects.all()[student_number - 1]
        serializer = StudentSerializer(student_obj)
        return Response(serializer.data)
    except IndexError:
        return Response({"error": "Студент не найден"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def course_about(request, course_id):
    """Возвращает детали одного курса"""
    course_obj = get_object_or_404(course, id=course_id)
    serializer = CourseSerializer(course_obj)
    return Response(serializer.data)

def login_view(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "username": user.username})
        else:
            return JsonResponse({"success": False, "error": "Неверный логин или пароль"}, status=400)
    return JsonResponse({"error": "Только POST запросы"}, status=405)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})