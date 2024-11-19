// Script to filter sections based on category selection
const categoryFilter = document.getElementById('category-filter');
const restaurantSection = document.getElementById('restaurant-section');
const attractionSection = document.getElementById('attraction-section');
const cultureSection = document.getElementById('culture-section');
const natureSection = document.getElementById('nature-section');

categoryFilter.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;

    // Hide all sections first
    restaurantSection.classList.add('d-none');
    attractionSection.classList.add('d-none');
    cultureSection.classList.add('d-none');
    natureSection.classList.add('d-none');

    // Show the selected category section
    if (selectedCategory === 'restaurants') {
        restaurantSection.classList.remove('d-none');
    } else if (selectedCategory === 'attractions') {
        attractionSection.classList.remove('d-none');
    } else if (selectedCategory === 'culture') {
        cultureSection.classList.remove('d-none');
    } else if (selectedCategory === 'nature') {
        natureSection.classList.remove('d-none');
    }
});

// Кнопка "Read More"
document.getElementById('read-more').addEventListener('click', function() {
    const moreText = document.getElementById('more-text');
    moreText.style.display = moreText.style.display === 'none' ? 'block' : 'none';
    this.textContent = moreText.style.display === 'none' ? 'Read More' : 'Read Less';
});

// Рейтинг со звёздами
document.addEventListener('DOMContentLoaded', function () {  // Ждем загрузки всей страницы, чтобы убедиться, что все элементы загружены
    const stars = document.querySelectorAll('.rating-area label');  // Находим все элементы label внутри блока с классом .rating-area (это звезды)
    stars.forEach(star => {  // Для каждой звезды (label)
        star.addEventListener('mouseover', () => {  // При наведении курсора на звезду
            const rating = parseInt(star.getAttribute('for').split('-')[1]);  // Извлекаем номер звезды из атрибута for (например, 'star-5' => 5)
            updateStars(rating);  // Обновляем состояние звезд, подсвечивая их в зависимости от рейтинга
        });
        star.addEventListener('mouseout', () => {  // При убирании курсора с звезды
            const checkedInput = document.querySelector('.rating-area input:checked');  // Проверяем, есть ли выбранный input (радиокнопка)
            if (checkedInput) {  // Если радиокнопка выбрана
                updateStars(checkedInput.value);  // Обновляем состояние звезд в зависимости от выбранного рейтинга
            } else {
                resetStars();  // Если радиокнопка не выбрана, сбрасываем все звезды
            }
        });
        star.addEventListener('click', () => {  // При клике на звезду
            const rating = parseInt(star.getAttribute('for').split('-')[1]);  // Извлекаем номер звезды из атрибута for
            updateStars(rating);  // Обновляем состояние звезд в зависимости от клика
        });
    });

    // Обновление состояния звезд в зависимости от рейтинга
    function updateStars(rating) {
        stars.forEach(star => {  // Для каждой звезды
            const starValue = parseInt(star.getAttribute('for').split('-')[1]);  // Получаем номер звезды
            if (starValue <= rating) {  // Если значение звезды меньше или равно рейтингу
                star.classList.add('selected');  // Добавляем класс 'selected' для подсветки
            } else {
                star.classList.remove('selected');  // Убираем класс 'selected', если рейтинг меньше текущей звезды
            }
        });
    }

    // Сброс всех звезд
    function resetStars() {
        stars.forEach(star => {  // Для каждой звезды
            star.classList.remove('selected');  // Убираем класс 'selected', сбрасывая подсветку
        });
    }
});