document.getElementById('getWeather').addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');
    const weatherIcon = document.getElementById('weatherIcon');
    const apiKey = '19228ce4e36ee705aa0c2a6b4f6d118f';
    const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    if (!cityInput) {
        alert('Please enter a city name!');
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}?q=${cityInput}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found!');

        const data = await response.json();
        const { name, sys, main, weather, wind, visibility } = data;
        const conditionId = weather[0].id;

        // Set top icon based on conditionId
        const iconClass = getWeatherIcon(conditionId);
        weatherIcon.className = `fas ${iconClass}`;

        document.getElementById('temperature').textContent = `Temp: ${main.temp}°C (Feels: ${main.feels_like}°C)`;
        document.getElementById('description').textContent = `${weather[0].main} (${weather[0].description})`;
        document.getElementById('humidity').textContent = `Humidity: ${main.humidity}%`;
        document.getElementById('windSpeed').textContent = `Wind: ${wind.speed} m/s`;
        document.getElementById('visibility').textContent = `Visibility: ${visibility}m`;

        weatherDisplay.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
});

// Function to map weather condition ID to icon class
function getWeatherIcon(conditionId) {
    switch (true) {
        case conditionId >= 200 && conditionId <= 232:
            return 'fa-bolt';
        case conditionId >= 300 && conditionId <= 321:
            return 'fa-cloud-rain';
        case conditionId >= 500 && conditionId <= 531:
            return 'fa-cloud-showers-heavy';
        case conditionId >= 600 && conditionId <= 622:
            return 'fa-snowflake';
        case conditionId >= 701 && conditionId <= 781:
            return 'fa-smog';
        case conditionId === 800:
            return 'fa-sun';
        case conditionId >= 801 && conditionId <= 804:
            return 'fa-cloud';
        default:
            return 'fa-question-circle';
    }
}