console.log('JS файл загружен');

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const filterSelect = document.querySelector('.filter-select');
    const resetButton = document.querySelector('.reset-button');
    const courseCards = document.querySelectorAll('.course-card');
    const form = document.querySelector('.filter-form');
    
    console.log('Найдено карточек:', courseCards.length);

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    function searchCourses() {
        const searchText = searchInput.value.toLowerCase().trim();
        const levelFilter = filterSelect.value.toLowerCase();
        
        console.log('Поиск:', searchText, 'Уровень:', levelFilter);
        
        let visibleCount = 0;
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const levelElement = card.querySelector('.course-level b');
            const levelText = levelElement ? levelElement.textContent.toLowerCase() : '';
            
            const matchesSearch = !searchText || title.includes(searchText) || description.includes(searchText);
            const matchesLevel = !levelFilter || levelText.includes(levelFilter);
            
            if (matchesSearch && matchesLevel) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        console.log('Показано карточек:', visibleCount);
        
        showNoResults(visibleCount === 0);
    }
    
    function showNoResults(show) {
        const container = document.querySelector('.courses-scroll');
        let message = document.querySelector('.no-results-message');
        
        if (message) {
            message.remove();
        }
        
        if (show) {
            message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = 'По вашему запросу ничего не найдено';
            message.style.cssText = 'text-align: center; padding: 40px; font-size: 18px; color: #666; width: 100%;';
            container.appendChild(message);
        }
    }
    
    function resetFilters() {
        searchInput.value = '';           
        filterSelect.value = '';         
        
        courseCards.forEach(card => {
            card.style.display = 'block';
        });
        
        showNoResults(false);
        
        console.log('Сброс: показаны все курсы');
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            searchCourses();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCourses();
            }
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', searchCourses);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', function(e) {
            e.preventDefault();  
            resetFilters();      
        });
    }
});
let isRussian = true;

const langBtn = document.createElement('button');
langBtn.textContent = 'EN';
langBtn.className = 'lang-btn';
document.body.appendChild(langBtn);

function setRussian() {
    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks[0]) navLinks[0].textContent = 'Главная';
    if (navLinks[1]) navLinks[1].textContent = 'О нас';
    if (navLinks[2]) navLinks[2].textContent = 'Курсы';
    if (navLinks[3]) navLinks[3].textContent = 'Контакты';
    
    const signInBtn = document.querySelector('.nav .button');
    if (signInBtn) signInBtn.textContent = 'Войти';
    
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.textContent === 'Sign in') {
            link.textContent = 'Войти';
        }
    });
    
    const title = document.querySelector('.content h1');
    if (title) title.innerHTML = '<div>КОРЕЙСКИЙ</div><div>ЯЗЫК</div>';
    
    const text = document.querySelector('.content p');
    if (text) text.innerHTML = 'Начни учить корейский прямо сейчас! Быстро и легко с LuvKorea!';
    
    const sectionTitle = document.querySelector('.section-header h1');
    if (sectionTitle) {
        const words = sectionTitle.querySelectorAll('span');
        if (words[0]) words[0].textContent = 'ОБУЧЕНИЕ';
        if (words[1]) words[1].textContent = 'ПОДХОДИТ';
    }
    
    const cards = document.querySelectorAll('.card');
    if (cards[0]) {
        const cardTexts = cards[0].querySelectorAll('p');
        if (cardTexts[0]) cardTexts[0].textContent = 'Если вы хотите выучить корейский с нуля, наша программа поможет освоить его быстро.';
    }
    if (cards[1]) {
        const cardTexts = cards[1].querySelectorAll('p');
        if (cardTexts[0]) cardTexts[0].textContent = 'Если вы уже изучали язык, но хотите повысить уровень, курс поможет вам с этой задачей.';
    }
    if (cards[2]) {
        const cardTexts = cards[2].querySelectorAll('p');
        if (cardTexts[0]) cardTexts[0].textContent = 'Если вам нужно сдать экзамен TOPIK для работы или учебы, наш курс поможет подготовиться.';
    }
    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.placeholder = 'Поиск курсов...';
    
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        const options = filterSelect.options;
        if (options[0]) options[0].textContent = 'Все уровни';
        if (options[1]) options[1].textContent = 'Lite';
        if (options[2]) options[2].textContent = 'Medium';
        if (options[3]) options[3].textContent = 'Hard';
    }
    
    const resetBtn = document.querySelector('.reset-button');
    if (resetBtn) resetBtn.textContent = 'Сбросить';
    
    const viewButtons = document.querySelectorAll('.course-card .button');
    viewButtons.forEach(btn => {
        if (btn.textContent === 'View') btn.textContent = 'Смотреть';
    });
    
    const levels = document.querySelectorAll('.course-level');
    levels.forEach(level => {
        const text = level.textContent;
        if (text.includes('Level:')) {
            level.innerHTML = '<b>Уровень:</b> ' + text.replace('Level:', '').trim();
        }
    });
    
    const footerLinks = document.querySelectorAll('.footer .links a');
    if (footerLinks[0]) footerLinks[0].textContent = 'Главная';
    if (footerLinks[1]) footerLinks[1].textContent = 'Уроки';
    if (footerLinks[2]) footerLinks[2].textContent = 'Для кого';
    if (footerLinks[3]) footerLinks[3].textContent = 'Курсы';
    if (footerLinks[4]) footerLinks[4].textContent = 'Войти';
    if (footerLinks[5]) footerLinks[5].textContent = 'О курсе';
    
    langBtn.textContent = 'EN';
}

function setEnglish() {
    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks[0]) navLinks[0].textContent = 'Main';
    if (navLinks[1]) navLinks[1].textContent = 'About';
    if (navLinks[2]) navLinks[2].textContent = 'Courses';
    if (navLinks[3]) navLinks[3].textContent = 'Contacts';
    
    const signInBtn = document.querySelector('.nav .button');
    if (signInBtn) signInBtn.textContent = 'Sign in';
    
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.textContent === 'Войти') {
            link.textContent = 'Sign in';
        }
    });
    
    const title = document.querySelector('.content h1');
    if (title) title.innerHTML = '<div>KOREAN</div><div>LANGUAGE</div>';
    
    const text = document.querySelector('.content p');
    if (text) text.innerHTML = 'Start learning Korean right now! Quick and easy with LuvKorea!';
    
    const sectionTitle = document.querySelector('.section-header h1');
    if (sectionTitle) {
        const words = sectionTitle.querySelectorAll('span');
        if (words[0]) words[0].textContent = 'THE TRAINING IS';
        if (words[1]) words[1].textContent = 'SUITABLE';
    }
    
    const cards = document.querySelectorAll('.card');
    if (cards[0]) {
        const cardTexts = cards[0].querySelectorAll('p');
        if (cardTexts[0]) cardTexts[0].textContent = 'If you want to learn Korean from scratch, our training program will help you master it quickly.';
    }
    if (cards[1]) {
        const cardTexts = cards[1].querySelectorAll('p');
        if (cardTexts[0]) cardTexts[0].textContent = 'if you have previously studied a language, but you want to improve your level, then the course will help you with this task.';
    }
    if (cards[2]) {
        const cardTexts = cards[2].querySelectorAll('p');
        if (cardTexts[0]) cardTexts[0].textContent = 'If you need to take a Korean language proficiency test (TOPIK) for work or study, our course will help prepare you for it.';
    }
    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.placeholder = 'Search courses...';
    
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        const options = filterSelect.options;
        if (options[0]) options[0].textContent = 'All levels';
        if (options[1]) options[1].textContent = 'Lite';
        if (options[2]) options[2].textContent = 'Medium';
        if (options[3]) options[3].textContent = 'Hard';
    }
    
    const resetBtn = document.querySelector('.reset-button');
    if (resetBtn) resetBtn.textContent = 'Reset';
    
    const viewButtons = document.querySelectorAll('.course-card .button');
    viewButtons.forEach(btn => {
        if (btn.textContent === 'Смотреть') btn.textContent = 'View';
    });
    
    const levels = document.querySelectorAll('.course-level');
    levels.forEach(level => {
        const text = level.textContent;
        if (text.includes('Уровень:')) {
            level.innerHTML = '<b>Level:</b> ' + text.replace('Уровень:', '').trim();
        }
    });
    
    const footerLinks = document.querySelectorAll('.footer .links a');
    if (footerLinks[0]) footerLinks[0].textContent = 'Main';
    if (footerLinks[1]) footerLinks[1].textContent = 'Lesson';
    if (footerLinks[2]) footerLinks[2].textContent = 'For who';
    if (footerLinks[3]) footerLinks[3].textContent = 'Courses';
    if (footerLinks[4]) footerLinks[4].textContent = 'Log in';
    if (footerLinks[5]) footerLinks[5].textContent = 'About course';
    
    langBtn.textContent = 'RU';
}

langBtn.onclick = function() {
    if (isRussian) {
        setEnglish();
        isRussian = false;
    } else {
        setRussian();
        isRussian = true;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    setRussian();
    isRussian = true;
});


function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('regError').style.display = 'none';
    document.getElementById('regName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const errorDiv = document.getElementById('regError');
    
    if (!name || !email || !password) {
        errorDiv.textContent = 'Заполните все поля!';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        errorDiv.textContent = 'Введите корректный email!';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (password.length < 4) {
        errorDiv.textContent = 'Пароль должен быть не менее 4 символов!';
        errorDiv.style.display = 'block';
        return;
    }
    
    const userData = {
        name: name,
        email: email,
        password: password,
        level: 'Начинающий'  
    };
    
    localStorage.setItem('studentData', JSON.stringify(userData));
    
    closeModal();
    
    window.location.href = '/student';
}

document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.querySelector('.nav .button');
    if (signInBtn) {
        signInBtn.onclick = function(e) {
            e.preventDefault();
            openRegisterModal();
        };
    }
    
    const allSignInBtns = document.querySelectorAll('a');
    allSignInBtns.forEach(btn => {
        if (btn.textContent === 'Sign in' || btn.textContent === 'Войти') {
            btn.onclick = function(e) {
                e.preventDefault();
                openRegisterModal();
            };
        }
    });
});

window.onclick = function(event) {
    const modal = document.getElementById('registerModal');
    if (event.target === modal) {
        closeModal();
    }
};