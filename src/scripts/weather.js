import { state } from "./state"

const weatherIconElement = document.querySelector('.weather-icon')
const temperatureElement = document.querySelector('.temperature')
const windElement = document.querySelector('.wind')
const humidityElement = document.querySelector('.humidity')
const weatherDescriptionElement = document.querySelector('.weather-description')
const weatherError = document.querySelector('.weather-error')

export const cityInput = document.querySelector('.city')


export async function getWeather(weatherLanguage) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${weatherLanguage}&appid=abe902bf94114fcd5fea4eb6170592ab&units=metric`;
    const res = await fetch(url)
    const data = await res.json()
    if (data.cod >= 400) {
        if (weatherLanguage === 'ru') {
            weatherError.textContent = 'Название города введено некорректно'
        } else {
            weatherError.textContent = 'Wrong city name'
        }
        weatherIconElement.className = ''
        windElement.textContent = ''
        humidityElement.textContent = ''
        temperatureElement.textContent = ''
        weatherDescriptionElement.textContent = ''
    } else {
        weatherError.textContent = ''
        weatherIconElement.className = 'weather-icon owf'
        weatherIconElement.classList.add(`owf-${data.weather[0].id}`)
        temperatureElement.textContent = `${Math.ceil(data.main.temp)}°C`
        weatherDescriptionElement.textContent = data.weather[0].description
        if (weatherLanguage === 'en') {
            windElement.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`
        } else if (weatherLanguage === 'ru') {
            windElement.textContent = `Скорость ветра: ${Math.ceil(data.wind.speed)} м/с`
            humidityElement.textContent = `Влажность: ${data.main.humidity}%`
        }
    }
    if (cityInput.value === 'Minsk' || cityInput.value === 'Минск') {
        state.data.city = ''
        if (weatherLanguage === 'ru') {
            cityInput.value = 'Минск'
        } else {
            cityInput.value = 'Minsk'
        }
    } else {
        state.data.city = cityInput.value
    }
}



