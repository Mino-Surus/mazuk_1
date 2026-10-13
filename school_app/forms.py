from django.forms import ModelForm
from .models import teacher, student, course

class TeacherForm(ModelForm):
    class Meta:
        model = teacher
        fields = ['name']

class ExpenseForm(ModelForm):
    class Meta:
        model = Expense
        fields = ['name', 'amount', 'spent_at']

class ExpenseTagForm(ModelForm):
    class Meta:
        model = ExpenseTag
        fields = ['expense', 'tag']