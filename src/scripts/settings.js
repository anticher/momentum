import { state } from './state.js'
import { showTimeDateGreeting, setBg } from './date-time-greeting-name.js'
import { getWeather } from './weather.js'
import { getQuotes } from './quotes.js'
import { translateTodo } from './todos.js'



export const settingsButton = document.querySelector('.settings-button')
export const settingsWindowElement = document.querySelector('.settings-window')
export const settingsOverlayElement = document.querySelector('.settings-overlay')
//blocks

export const weatherContainerElement = document.querySelector('.weather')
export const playerContainerElement = document.querySelector('.player')
export const timeContainerElement = document.querySelector('.time')
export const dateContainerElement = document.querySelector('.date')
export const greetingContainerElement = document.querySelector('.greeting-container')
export const quotesContainerElement = document.querySelector('.quotes')
export const todosContainerElement = document.querySelector('.todos')

//buttons

export const englishLanguageButton = document.querySelector('#radioLanguageEnglish')
export const russianLanguageButton = document.querySelector('#radioLanguageRussian')

export const gitHubSourceButton = document.querySelector('#radioGitHub')
export const unsplashSourceButton = document.querySelector('#radioUnsplash')
export const flickrSourceButton = document.querySelector('#radioFlickr')
export const sourceTagInput = document.querySelector('#inputTag')

export const weatherHideButton = document.querySelector('#checkWeather')
export const playerHideButton = document.querySelector('#checkPlayer')
export const timeHideButton = document.querySelector('#checkTime')
export const dateHideButton = document.querySelector('#checkDate')
export const greetingHideButton = document.querySelector('#checkGreeting')
export const quotesHideButton = document.querySelector('#checkQuotes')
export const todosHideButton = document.querySelector('#checkTodos')



export function openSettings() {
    settingsButton.classList.toggle('active')
    settingsWindowElement.classList.toggle('active')
    settingsOverlayElement.classList.toggle('active')
}

export function sourceTagInputChange() {
    state.setStatePhotoTag(sourceTagInput.value)
    setBg(state.data.photoSource)
}

export function sourceTagInputBlock() {
    if (state.data.settingsInputsStatus.sourceTagInputBlock === true) {
        sourceTagInput.disabled = true
        sourceTagInput.value = ''
        state.setStatePhotoTag(sourceTagInput.value)
    } else {
        sourceTagInput.disabled = false
    }
}


export function changeSource() {
    if (this === flickrSourceButton) {
        state.setStatePhotoSource('flickr')
    } else if (this === unsplashSourceButton) {
        state.setStatePhotoSource('unsplash')
    } else {
        state.setStatePhotoSource('github')
    }
    setBg(state.data.photoSource)
}

export function changeLanguage() {
    if (this === russianLanguageButton) {
        state.setStateLanguage('russian')
    } else {
        state.setStateLanguage('english')
    }
    showTimeDateGreeting(state.data.language)
    getWeather(state.data.weatherLanguage)
    getQuotes(state.data.language)
    translateTodo(state.data.language)
    translateSettings(state.data.language)
}

export function hideElement(button, element) {
    if (button.checked) {
        element.classList.remove('visibility-hidden')
    } else {
        element.classList.add('visibility-hidden')
    }
}



// translate settings

const choseLanguageSettingsElement = document.querySelector('#choseLanguage')
const chooseLanguageEnglishSettingsElement = document.querySelector('#chooseLanguageEnglish')
const chooseLanguageRussianSettingsElement = document.querySelector('#chooseLanguageRussian')
const chooseImageSourceSettingsElement = document.querySelector('#chooseImageSource')
const enterTagsSettingsElement = document.querySelector('#enterTags')
const inputTagSettingsElement = document.querySelector('#inputTag')
const chooseBlockSettingsElement = document.querySelector('#chooseBlock')
const chooseBlockTimeSettingsElement = document.querySelector('#chooseBlockTime')
const chooseBlockDateSettingsElement = document.querySelector('#chooseBlockDate')
const chooseBlockGreetingSettingsElement = document.querySelector('#chooseBlockGreeting')
const chooseBlockQuotesSettingsElement = document.querySelector('#chooseBlockQuotes')
const chooseBlockWeatherSettingsElement = document.querySelector('#chooseBlockWeather')
const chooseBlockPlayerSettingsElement = document.querySelector('#chooseBlockPlayer')
const chooseBlockToDoSettingsElement = document.querySelector('#chooseBlockToDo')


export function translateSettings(lang) {
    if (lang === 'russian') {
        choseLanguageSettingsElement.textContent = 'Выберите язык'
            chooseLanguageEnglishSettingsElement.textContent = 'Английский'
            chooseLanguageRussianSettingsElement.textContent = 'Русский'
            chooseImageSourceSettingsElement.textContent = 'Выберите источник изображения'
            enterTagsSettingsElement.textContent = 'Введите теги (для Unsplash API и Flickr API)'
            inputTagSettingsElement.placeholder = 'тег,тег,тег,тег'
            chooseBlockSettingsElement.textContent = 'Выберите блок'
            chooseBlockTimeSettingsElement.textContent = 'Время'
            chooseBlockDateSettingsElement.textContent = 'Дата'
            chooseBlockGreetingSettingsElement.textContent = 'Приветствие'
            chooseBlockQuotesSettingsElement.textContent = 'Цитаты'
            chooseBlockWeatherSettingsElement.textContent = 'Погода'
            chooseBlockPlayerSettingsElement.textContent = 'Проигрыватель'
            chooseBlockToDoSettingsElement.textContent = 'Задачи'
    } else {
        choseLanguageSettingsElement.textContent = 'Chose language'
            chooseLanguageEnglishSettingsElement.textContent = 'English'
            chooseLanguageRussianSettingsElement.textContent = 'Russian'
            chooseImageSourceSettingsElement.textContent = 'Choose image source'
            enterTagsSettingsElement.textContent = 'Enter tags (for Unsplash API and Flickr API)'
            inputTagSettingsElement.placeholder = 'tag,tag,tag,tag'
            chooseBlockSettingsElement.textContent = 'Choose block'
            chooseBlockTimeSettingsElement.textContent = 'Time'
            chooseBlockDateSettingsElement.textContent = 'Date'
            chooseBlockGreetingSettingsElement.textContent = 'Greeting'
            chooseBlockQuotesSettingsElement.textContent = 'Quotes'
            chooseBlockWeatherSettingsElement.textContent = 'Weather'
            chooseBlockPlayerSettingsElement.textContent = 'Player'
            chooseBlockToDoSettingsElement.textContent = 'ToDo'
    }
}