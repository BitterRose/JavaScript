const apiKey = 'e549150a599ed5d7511188cc8c4cdbaa'; // Klucz API OpenWeatherMap

let places = []; // Tablica z miejscami wybranymi przez użytkownika

// Pobierz miejsca z localStorage
if (localStorage.getItem('places')) {
  places = JSON.parse(localStorage.getItem('places'));
}

const addPlaceBtn = document.getElementById('add-place-btn');
const weatherPanel = document.getElementById('weather-panel');

// Obsługa przycisku "Dodaj miejsce"
addPlaceBtn.addEventListener('click', () => {
  const city = prompt('Podaj nazwę miasta:');
  if (city) {
    // Dodaj miasto do tablicy places
    places.push(city);
    localStorage.setItem('places', JSON.stringify(places));

    // Wyświetl nową kartę z pogodą dla dodanego miasta
    displayWeather(city);
  }
});

// Wyświetl karty z pogodą dla miejsc pobranych z localStorage
places.forEach((city) => {
  displayWeather(city);
});

// Funkcja do pobierania informacji o pogodzie dla danego miasta i wyświetlania karty z pogodą
async function displayWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    const title = document.createElement('h2');
    title.classList.add('weather-card__title');
    title.textContent = data.name;
    weatherCard.appendChild(title);

    const temperature = document.createElement('p');
    temperature.classList.add('weather-card__temperature');
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    weatherCard.appendChild(temperature);

    const humidity = document.createElement('p');
    humidity.classList.add('weather-card__humidity');
    humidity.textContent = `Wilgotność: ${data.main.humidity}%`;
    weatherCard.appendChild(humidity);

    const icon = document.createElement('img');
    icon.classList.add('weather-card__icon');
    icon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    icon.setAttribute('alt', data.weather[0].description);
    weatherCard.appendChild(icon);

    weatherPanel.appendChild(weatherCard);
  } catch (error) {
    alert('Nie udało się pobrać informacji o pogodzie.');
  }
}

// Funkcja do usuwania karty z pogodą dla danego miasta
function removeWeatherCard(city) {
  const index = places.indexOf(city);
  if (index > -1) {
    places.splice(index, 1);
    localStorage.setItem('places', JSON.stringify(places));
  }
  weatherPanel.innerHTML = '';
  places.forEach((city) => {
    displayWeather(city);
  });
}
