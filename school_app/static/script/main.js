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