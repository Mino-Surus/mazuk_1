from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
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