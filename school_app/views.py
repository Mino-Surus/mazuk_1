from django.shortcuts import render

def root(request):
    return render(request, 'main.html') 

def students(request):
    return render(request, 'student.html')
