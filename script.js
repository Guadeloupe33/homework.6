const apiKey = '9ff2dd03aa5ea0140a3b500ecf444723';



//place older to  display current weather data 
function displayCurrentWeather(data) {
   
}

// Function to display 5-day forecast data
function displayForecast(data) {
    
}

// Function to add a city to the search history
function addToSearchHistory(city) {
   //  placeholder to display and store the data that we searchedd
}
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeatherData(city);
        addToSearchHistory(city);
        cityInput.value = '';
    }
});
document.getElementById('search-history').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const city = event.target.textContent;
        fetchWeatherData(city);
    }
});

// Initial code to load  my current city of atlanta 
fetchWeatherData('Atlanta');