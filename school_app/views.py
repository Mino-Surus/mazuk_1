from django.shortcuts import render
from .models import *

def root(request):
    search_query = request.GET.get('search', '')
    level_filter = request.GET.get('level', '')
    
    courses = course.objects.all()  # если модель называется course
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

