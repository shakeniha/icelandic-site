document.addEventListener("DOMContentLoaded", function () {
    // Применяем сохранённый режим (тёмный или светлый) при загрузке страницы
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Получаем элементы кнопок входа, выхода и других
    const loginButton = document.getElementById("login");
    const logoutButton = document.getElementById("logout");
    const welcomeMessage = document.getElementById("welcome-message");
    const togglePanelButton = document.getElementById("toggle-panel"); // Кнопка для открытия панели
    const sidePanel = document.getElementById("sidePanel");

    // Функция обновления интерфейса в зависимости от статуса входа пользователя
    function updateAuthUI() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            loginButton.style.display = "none";
            logoutButton.style.display = "inline-block";
            welcomeMessage.style.display = "inline-block";
            welcomeMessage.textContent = `Welcome, ${loggedInUser}`;
        } else {
            loginButton.style.display = "inline-block";
            logoutButton.style.display = "none";
            welcomeMessage.style.display = "none";
        }
    }

    updateAuthUI();

    // Переключение тёмного и светлого режима
    document.getElementById("toggle-mode").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Показ модального окна входа при нажатии на кнопку входа
    loginButton.addEventListener("click", function () {
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
    });

    // Показ модального окна регистрации
    document.getElementById("register").addEventListener("click", function () {
        const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
        registerModal.show();
    });

    // Обработка регистрации
    document.getElementById("confirm-register").addEventListener("click", function () {
        const registerForm = document.getElementById("register-form");
        if (validateForm(registerForm)) {
            const username = registerForm.username.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const phone = registerForm.phone.value;

            // Сохраняем данные пользователя в LocalStorage
            const users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[username]) {
                alert("Username already exists. Please choose another.");
                return;
            }
            users[username] = { email, password, phone };
            localStorage.setItem("users", JSON.stringify(users));

            const registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
            registerModal.hide();
            alert("Registration successful! Please log in.");
        }
    });

    // Обработка входа
    document.getElementById("confirm-login").addEventListener("click", function () {
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username] && users[username].password === password) {
            localStorage.setItem("loggedInUser", username);
            const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
            loginModal.hide();
            updateAuthUI();
        } else {
            alert("Invalid username or password.");
        }
    });

    // Функционал для выхода пользователя
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        updateAuthUI();
    });

    // Восстановление состояния боковой панели
    if (localStorage.getItem("sidePanelState") === "open") {
        sidePanel.classList.add("open");
    }

    // Функционал боковой панели
    togglePanelButton.addEventListener("click", function () {
        sidePanel.classList.toggle("open");
        // Сохраняем состояние панели в localStorage
        localStorage.setItem("sidePanelState", sidePanel.classList.contains("open") ? "open" : "closed");
    });

    // Функция очистки сообщений об ошибках
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((message) => {
            message.textContent = "";
        });
    }

    // Функция для вывода сообщения об ошибке
    function showError(inputElement, message) {
        const errorElement = inputElement.parentElement.querySelector(".error-message");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    // Функция для валидации данных формы
    function validateForm(form) {
        clearErrorMessages();
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const phone = form.phone.value;
        let isValid = true;

        if (username.trim() === "") {
            showError(form.username, "Username is required.");
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            showError(form.email, "Please enter a valid email address.");
            isValid = false;
        }

        if (password.length < 8) {
            showError(form.password, "Password must be at least 8 characters long.");
            isValid = false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (phone && !phoneRegex.test(phone)) {
            showError(form.phone, "Phone number must be 10 digits.");
            isValid = false;
        }

        return isValid;
    }
});

function saveFormData() {
    // Сохранение данных формы (например, вывод в консоль)
    const form = document.getElementById('myForm');
    const name = form.name.value;
    const email = form.email.value;
    
    // Вставьте сюда ваш код для сохранения данных (например, отправка на сервер)
    console.log('Name:', name);
    console.log('Email:', email);

    // Показать модальное окно с благодарностью
    document.getElementById('thankYouModal').style.display = 'block';

    // Очистить форму (если нужно)
    form.reset();
}

function closeModal() {
    // Закрыть модальное окно
    document.getElementById('thankYouModal').style.display = 'none';
}