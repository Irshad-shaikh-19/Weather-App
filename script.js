const url = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';
const apikey = '79783327b77ae3d0de619f29c5a02b1c';
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const sImg = document.querySelector('.s-img');
const error = document.querySelector('.error');

const inputSearch = document.querySelector('.inputSearch');
const btnSearch = document.querySelector('.btnSearch');

async function getWeather(city) {
    try {
        
        if (!city.trim()) {
            alert("Please enter a city name.");
            return;
        }

       
        temp.innerHTML = "Loading...";
        cityName.innerHTML = "";
        humidity.innerHTML = "";
        windSpeed.innerHTML = "";
        sImg.src = "";
        error.style.display = "none";

        const res = await fetch(`${url}&q=${city}&appid=${apikey}`);
        const data = await res.json();
        console.log(data);

      
        if (data.cod !== 200) {
            error.style.display = "block";
            error.innerHTML = `Error: ${data.message}`;
            resetWeatherDisplay();
            return;
        }

        
        temp.innerHTML = Math.round(data.main.temp) + " °C";
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        windSpeed.innerHTML = Math.round(data.wind.speed) + " km/h";

    
        if (data.weather[0].main === "Clear") {
            sImg.src = "images/clear.png";
        } else if (data.weather[0].main === "Clouds") {
            sImg.src = "images/clouds.png";
        } else if (data.weather[0].main === "Drizzle") {
            sImg.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            sImg.src = "images/mist.png";
        } else if (data.weather[0].main === "Rain") {
            sImg.src = "images/rain.png";
        } else if (data.weather[0].main === "Snow") {
            sImg.src = "images/snow.png";
        }
    } catch (error) {
        
        alert("An error occurred while fetching the weather data. Please try again.");
        resetWeatherDisplay();
    }
}

function resetWeatherDisplay() {
    temp.innerHTML = "0 °C";
    cityName.innerHTML = "";
    humidity.innerHTML = "0%";
    windSpeed.innerHTML = "0 km/h";
    sImg.src = "";
}

btnSearch.addEventListener("click", () => {
    getWeather(inputSearch.value);
});



inputSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather(inputSearch.value);
    }
});
