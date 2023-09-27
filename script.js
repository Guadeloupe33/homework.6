const apiKey = 'YOUR_API_KEY';
function fetchWeatherData(city) {
    // place older to get the data  we need some type of function
}

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
