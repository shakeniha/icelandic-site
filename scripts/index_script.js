document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section-screen");

  // Настраиваем наблюдатель для отслеживания видимости секций
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Если секция видима, добавляем класс "visible", иначе убираем
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.5 } // Настраиваем порог срабатывания, 50% секции должно быть видимым
  );

  sections.forEach((section) => {
    observer.observe(section); // Наблюдаем за каждой секцией
  });
});

const weatherWidget = document.getElementById("weather-widget");
const apiKey = "f25d75f1b8a41c00e148b8bd153ae817"; // Ваш API-ключ OpenWeather
const city = "Reykjavik";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Weather data:", data); // Логируем данные

        // Проверяем, содержат ли данные нужные свойства
        if (data && data.name && data.sys && data.sys.country && data.main && data.weather && data.weather[0]) {
            weatherWidget.innerHTML = `
                <h4>${data.name}, ${data.sys.country}</h4>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Feels like:</strong> ${data.main.feels_like}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            `;
        } else {
            throw new Error("Incomplete data received from the API");
        }
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        weatherWidget.innerHTML = `
            <p style="color: red;">Error fetching weather data: ${error.message}</p>
        `;
    });