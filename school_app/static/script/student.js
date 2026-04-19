document.addEventListener('DOMContentLoaded', function() {
    const studentData = localStorage.getItem('studentData');
    
    if (studentData) {
        const student = JSON.parse(studentData);
        
        const userNameElement = document.querySelector('.user-name');
        const userEmailElement = document.querySelector('.user-email');
        const levelElement = document.querySelector('.level');
        
        if (userNameElement) userNameElement.textContent = student.name;
        if (userEmailElement) userEmailElement.textContent = student.email;
        if (levelElement) levelElement.textContent = student.level;
    } else {
        window.location.href = '/';
    }
});