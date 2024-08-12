document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('open');
    });

    closeMenu.addEventListener('click', function() {
        sidebar.classList.remove('open');
    });

    
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('open');
        }
    });
});


let currentIndex = 0;

function currentSlide(index) {
    showSlide(index);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}


setInterval(() => {
    showSlide(currentIndex + 1);
}, 3000);

function fetchWeather(city) {
    const apiKey = '626c2120f0074ed787e190026241108'; // Replace with your WeatherAPI key
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const location = data.location;
                const current = data.current;

                document.getElementById('city-name').innerText = `${location.name}`;
                document.getElementById('region').innerText = `Region: ${location.region}`;
                document.getElementById('country').innerText = `Country: ${location.country}`;
                document.getElementById('temperature').innerText = `Temperature: ${current.temp_c}°C`;
                document.getElementById('condition').innerText = `Condition: ${current.condition.text}`;
                document.getElementById('humidity').innerText = `Humidity: ${current.humidity}%`;
                document.getElementById('wind').innerText = `Wind: ${current.wind_kph} kph, ${current.wind_dir}`;
                document.getElementById('weather-icon').src = `https:${current.condition.icon}`;
            } else {
                alert("City not found, please try again.");
            }
        })
        .catch(error => {
            alert("Error fetching data, please try again.");
            console.error("Error:", error);
        });
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
});

// Fetch and display weather for Bengaluru by default when the page loads
window.onload = function() {
    fetchWeather('Bengaluru');
};
