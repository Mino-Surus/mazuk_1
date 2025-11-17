from django.shortcuts import render
from .models import student


def root(request):
    return render(request, 'main.html') 

def students(request):
    student_number = int(request.GET.get('number', 3))
    
    students_from_db = student.objects.all()[student_number - 1]
    
    return render(request, 'student.html', {
        'student': students_from_db  
    })