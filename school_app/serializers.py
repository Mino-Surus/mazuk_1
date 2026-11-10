from rest_framework import serializers
from .models import student, teacher, course, lessons
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = teacher
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.ReadOnlyField(source='teacher_id.name')     
    class Meta:
        model = course
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = lessons
        fields = '__all__'