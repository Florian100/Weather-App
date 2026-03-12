const apiKey = '1f6cb39c40688defdf550c370c1db6cb'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
// Variabli i ri për ikonën
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value;
        if (city) getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            alert('City not found or API key not activated yet!');
            return;
        }
        
        const data = await response.json();
        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        
        // Kodi që merr ikonën dhe e kthen në një imazh të dukshëm
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        weatherInfo.style.display = 'block';
        
    } catch (error) {
        alert('An error occurred while fetching the weather data.');
    }
}