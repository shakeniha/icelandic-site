// Изменение размера navbar при прокрутке
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) { // Условие для изменения высоты
        navbar.classList.add("navbar-shrink");
    } else {
        navbar.classList.remove("navbar-shrink");
    }
});

// Функция для корректной высоты секций с учётом высоты navbar
function adjustSectionHeight() {
    const navHeight = document.getElementById('navbar').offsetHeight;
    const sections = document.querySelectorAll('.section-screen');
    sections.forEach(section => {
        section.style.height = `calc(100vh - ${navHeight}px)`;
    });
}

// Вызываем функцию на загрузке и при изменении размера окна
window.addEventListener('load', adjustSectionHeight);
window.addEventListener('resize', adjustSectionHeight);

// Прокрутка для скрытия/отображения секций
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section-screen');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Отображаем секцию, если она в пределах видимости
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
});