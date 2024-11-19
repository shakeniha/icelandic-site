// Событие, срабатывающее, когда весь HTML-документ загружен и готов к работе
document.addEventListener("DOMContentLoaded", function() {

    // Применяем сохранённый режим (тёмный или светлый) при загрузке страницы
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Получаем элементы кнопок входа и выхода, а также приветственного сообщения
    const loginButton = document.getElementById("login");
    const logoutButton = document.getElementById("logout");
    const welcomeMessage = document.getElementById("welcome-message");

    // Функция обновления интерфейса в зависимости от статуса входа пользователя
    function updateAuthUI() {
        const loggedInUser = localStorage.getItem("username");
        if (loggedInUser) {
            loginButton.style.display = "none"; // Прячем кнопку входа
            logoutButton.style.display = "inline-block"; // Показываем кнопку выхода
            welcomeMessage.style.display = "inline-block"; // Показываем приветственное сообщение
            welcomeMessage.textContent = `Welcome, ${loggedInUser}`; // Устанавливаем текст приветствия
        } else {
            loginButton.style.display = "inline-block"; // Показываем кнопку входа
            logoutButton.style.display = "none"; // Прячем кнопку выхода
            welcomeMessage.style.display = "none"; // Прячем приветственное сообщение
        }
    }

    updateAuthUI(); // Инициализация интерфейса на основе текущего статуса пользователя

    // Переключение тёмного и светлого режима и сохранение предпочтений
    document.getElementById("toggle-mode").addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Показ модального окна входа при нажатии на кнопку входа
    loginButton.addEventListener("click", function() {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });

    // Функционал для входа пользователя внутри модального окна
    document.getElementById("confirm-login").addEventListener("click", function() {
        const username = document.getElementById("username").value;
        if (username) {
            localStorage.setItem("username", username); // Сохраняем имя пользователя
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
            window.location.reload(); // Обновляем страницу, чтобы применить изменения
        }
    });

    // Функционал для выхода пользователя
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("username"); // Удаляем данные пользователя
        updateAuthUI(); // Обновляем интерфейс после выхода

        // Корректировка отступов кнопок для улучшения интерфейса
        loginButton.classList.add("centered-buttons");
        document.getElementById("toggle-mode").classList.add("centered-buttons");
    });

    // Загружаем сохранённое значение любимой части и устанавливаем фильтр при загрузке страницы
    const savedFavorite = localStorage.getItem("favorite-part");
    if (savedFavorite) {
        document.getElementById("favorite-part").value = savedFavorite;
    }

    const savedFilter = localStorage.getItem("filter-setting");
    if (savedFilter) {
        document.getElementById("filter").value = savedFilter;
        applyFilter(savedFilter); // Применяем фильтр при загрузке страницы
    }

    // Функционал фильтрации
    document.getElementById("filter").addEventListener("change", function() {
        const selectedFilter = this.value;
        localStorage.setItem("filter-setting", selectedFilter); // Сохраняем выбранный фильтр
        applyFilter(selectedFilter);
    });
});

// Сохранение любимой части в локальном хранилище
function saveFormData() {
    const favoritePart = document.getElementById("favorite-part").value;
    localStorage.setItem("favorite-part", favoritePart);
    alert("Data have been saved!");
}

// Функция для применения фильтра и отображения нужных секций
function applyFilter(filter) {
    const items = document.querySelectorAll(".filter-item");
    items.forEach(item => {
        item.style.display = (filter === "all" || item.classList.contains(filter)) ? "block" : "none";
    });
}

// Улучшения для адаптивного дизайна
window.addEventListener("resize", function() {
    document.body.classList.toggle("mobile-view", window.innerWidth < 768);
});