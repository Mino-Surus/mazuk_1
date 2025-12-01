from django.shortcuts import render, get_object_or_404
from .models import *

def root(request):
    search_query = request.GET.get('search', '')
    level_filter = request.GET.get('level', '')
    
    courses = course.objects.all() 
    if search_query:
        courses = courses.filter(name__icontains=search_query)
    if level_filter:
        courses = courses.filter(level=level_filter)
    
    context = {
        "courses": courses,
        "search_query": search_query,
        "level_filter": level_filter,
    }
    
    return render(request, 'main.html', context)

def students(request):
    student_number = int(request.GET.get('number', 3))
    
    students_from_db = student.objects.all()[student_number - 1]
    
    return render(request, 'student.html', {
        'student': students_from_db  
    })

def course_about(request, course_id):
    course_obj = get_object_or_404 (course, id=course_id)
    
    context = {
        'course': course_obj,
    }
    return render(request, 'course.html', context)