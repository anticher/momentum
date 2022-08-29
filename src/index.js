import { state } from '/scripts/state.js'

import { showTimeDateGreeting, setBg, userName, bodyElement, slideNextBtn, slidePrevBtn, getSlideNext, getSlidePrev } from './scripts/date-time-greeting-name.js'

import { getQuotes, changeQuoteBtn } from './scripts/quotes.js'

import { getWeather, cityInput } from './scripts/weather.js'

import { createPlayList, playBtn, playNextBtn, playPrevBtn, audioElement, onPlayClick, onPlayPrevClick, onPlayNextClick, updateProgressNumbers, updateProgressAndVolumeBackground, progressBarElement, muteBtnElement, onMuteClick, volumeBarElement, onVolumeChanged, pauseAudio } from '/scripts/player.js'

import { settingsButton, openSettings, weatherContainerElement, playerContainerElement, timeContainerElement, dateContainerElement, greetingContainerElement, quotesContainerElement, englishLanguageButton, russianLanguageButton, gitHubSourceButton, unsplashSourceButton, flickrSourceButton, sourceTagInput, weatherHideButton, playerHideButton, timeHideButton, dateHideButton, greetingHideButton, quotesHideButton, hideElement, changeLanguage, changeSource, sourceTagInputChange, sourceTagInputBlock, setLanguageButton, settingsWindowElement, todosHideButton, todosContainerElement, translateSettings, settingsOverlayElement } from '/scripts/settings.js'

import { todosButton, onTodosButtonClick, todosInputElement, createTodoItem, todosCounter, translateTodo, todosOverlayElement } from './scripts/todos.js'

////initialization window





// getLocalStorage()

window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)

////






////date-time-greeting-name init


window.addEventListener('load', () => {
    setBg(state.data.photoSource)
})

window.addEventListener('load', () => {
    showTimeDateGreeting(state.data.language)
})

slideNextBtn.addEventListener('click', () => {
    getSlideNext(state.data.photoSource)
})

slidePrevBtn.addEventListener('click', () => {
    getSlidePrev(state.data.photoSource)
})

userName.addEventListener('change', () => {
    state.setStateUserName(userName.value)
  })

////

//// player init

// play buttons actions

window.addEventListener('load', createPlayList())


playBtn.addEventListener('click', onPlayClick)
playNextBtn.addEventListener('click', onPlayNextClick)
playPrevBtn.addEventListener('click', onPlayPrevClick)
audioElement.addEventListener('ended', onPlayNextClick)

//

// player progress-bar
updateProgressAndVolumeBackground(progressBarElement)

audioElement.ontimeupdate = () => {
    updateProgressNumbers()
    if (audioElement.duration === audioElement.currentTime) {
        pauseAudio()
    }
    if (audioElement.currentTime === 0) {
        updateProgressAndVolumeBackground(progressBarElement)
    } else {
        progressBarElement.value = 100 / audioElement.duration * audioElement.currentTime
        updateProgressAndVolumeBackground(progressBarElement, progressBarElement.value)
    }
}

progressBarElement.addEventListener('input', function () {
    const value = this.value
    audioElement.currentTime = value / (100 / audioElement.duration)
    updateProgressAndVolumeBackground(progressBarElement)
})

//

//player mute
muteBtnElement.addEventListener('click', onMuteClick)

//
//player volume
audioElement.volume = volumeBarElement.value / 100
updateProgressAndVolumeBackground(volumeBarElement, volumeBarElement.value)
volumeBarElement.addEventListener('input', onVolumeChanged)
//

////

////weather init

window.addEventListener('load', () => {
    getWeather(state.data.weatherLanguage)
})

cityInput.addEventListener('change', () => {
    getWeather(state.data.weatherLanguage)
})

////


////quotes init
window.addEventListener('load', () => {
    getQuotes(state.data.language)
})

changeQuoteBtn.addEventListener('click', () => {
    getQuotes(state.data.language)
})
////

////settings init
window.addEventListener('load', sourceTagInputBlock)

window.addEventListener('load', () => {
    translateSettings(state.data.language)
})


settingsButton.addEventListener('click', openSettings)
settingsOverlayElement.addEventListener('click', openSettings)



////todos init

window.addEventListener('load', () => {
    translateTodo(state.data.language)
})

todosButton.addEventListener('click', onTodosButtonClick)

todosOverlayElement.addEventListener('click', onTodosButtonClick)

todosInputElement.addEventListener('change', () => {
    createTodoItem(todosInputElement.value, false)
    todosInputElement.value = ''
})

////


englishLanguageButton.addEventListener('click', changeLanguage)
russianLanguageButton.addEventListener('click', changeLanguage)
gitHubSourceButton.addEventListener('click', changeSource)
unsplashSourceButton.addEventListener('click', changeSource)
flickrSourceButton.addEventListener('click', changeSource)
sourceTagInput.addEventListener('change', sourceTagInputChange)

weatherHideButton.addEventListener('change', function () {
    hideElement(this, weatherContainerElement)
})
playerHideButton.addEventListener('change', function () {
    hideElement(this, playerContainerElement)
})
timeHideButton.addEventListener('change', function () {
    hideElement(this, timeContainerElement)
})
dateHideButton.addEventListener('change', function () {
    hideElement(this, dateContainerElement)
})
greetingHideButton.addEventListener('change', function () {
    hideElement(this, greetingContainerElement)
})
quotesHideButton.addEventListener('change', function () {
    hideElement(this, quotesContainerElement)
})
todosHideButton.addEventListener('change', function () {
    hideElement(this, todosContainerElement)
})


function setLocalStorage() {
    localStorage.setItem('city', state.data.city)
    localStorage.setItem('language', state.data.language)
    localStorage.setItem('photoSource', state.data.photoSource)
    localStorage.setItem('userName', state.data.userName)


    localStorage.setItem('sourceTagInput', state.data.settingsInputsStatus.sourceTagInput)

    localStorage.setItem('sourceTagInputBlock', state.data.settingsInputsStatus.sourceTagInputBlock)

    localStorage.setItem('weatherHideButton', weatherHideButton.checked)

    localStorage.setItem('playerHideButton', playerHideButton.checked)

    localStorage.setItem('timeHideButton', timeHideButton.checked)

    localStorage.setItem('dateHideButton', dateHideButton.checked)

    localStorage.setItem('greetingHideButton', greetingHideButton.checked)

    localStorage.setItem('quotesHideButton', quotesHideButton.checked)

    localStorage.setItem('todosHideButton', todosHideButton.checked)

    localStorage.setItem('todosCounter', todosCounter)

}

function getLocalStorage() {
    //language weatherLanguage
    if ((localStorage.getItem('language') === 'russian')) {
        state.setStateLanguage('russian')
        englishLanguageButton.checked = false
        russianLanguageButton.checked = true
    }
    else {
        state.setStateLanguage('english')
        russianLanguageButton.checked = false
        englishLanguageButton.checked = true
    }
    //userName
    if (localStorage.getItem('userName')) {
        state.setStateUserName(localStorage.getItem('userName'))
    } else {
        state.setStateUserName('')
    }
    userName.value = state.data.userName
    //city
    if (localStorage.getItem('city')) {
        state.setStateCity(localStorage.getItem('city'))
        cityInput.value = state.data.city
    } else {
        if (state.data.language === 'russian') {
            cityInput.value = 'Минск'
        } else {
            cityInput.value = 'Minsk'
        }
    }
    //photoSource
    if (localStorage.getItem('photoSource')) {
        state.setStatePhotoSource(localStorage.getItem('photoSource'))
    } else {
        state.setStatePhotoSource('github')
    }
    if (state.data.photoSource === 'unsplash') {
        gitHubSourceButton.checked = false
        flickrSourceButton.checked = false
        unsplashSourceButton.checked = true
    } else if (state.data.photoSource === 'flickr') {
        gitHubSourceButton.checked = false
        unsplashSourceButton.checked = false
        flickrSourceButton.checked = true
    } else {
        unsplashSourceButton.checked = false
        flickrSourceButton.checked = false
        gitHubSourceButton.checked = true
    }
    //sourceTagInput
    if (localStorage.getItem('sourceTagInput')) {
        state.setStatePhotoTag(localStorage.getItem('sourceTagInput'))
    } else {
        state.setStatePhotoTag('')
    }
    sourceTagInput.value = state.data.settingsInputsStatus.sourceTagInput
    //sourceTagInputBlock
    if (localStorage.getItem('sourceTagInputBlock')) {
        state.setStatePhotoTagBlock(localStorage.getItem('sourceTagInputBlock'))
    } else {
        state.setStatePhotoTagBlock(false)
    }
    //weatherHideButton
    initContainers(weatherHideButton, 'weatherHideButton', weatherContainerElement)
    //playerHideButton
    initContainers(playerHideButton, 'playerHideButton', playerContainerElement)
    //timeHideButton
    initContainers(timeHideButton, 'timeHideButton', timeContainerElement)
    //dateHideButton
    initContainers(dateHideButton, 'dateHideButton', dateContainerElement)
    //greetingHideButton
    initContainers(greetingHideButton, 'greetingHideButton', greetingContainerElement)
    //quotesHideButton
    initContainers(quotesHideButton, 'quotesHideButton', quotesContainerElement)
    //todosHideButton
    initContainers(todosHideButton, 'todosHideButton', todosContainerElement)
    //todosInner
    if (localStorage.getItem('todosCounter')) {
        let todosNumber = localStorage.getItem('todosCounter')
        for (let i = 1; i < todosNumber; i++) {
            if (localStorage.getItem(`todoItem${i}`)) {
                createTodoItem(localStorage.getItem(`todoItem${i}`), localStorage.getItem(`todoItemStatus${i}`))
            }
        }
    }
}

////

function initContainers(button, buttonName, container) {
    if (localStorage.getItem(buttonName)) {
        if (localStorage.getItem(buttonName) === 'true') {
            button.checked = true
            container.classList.remove('visibility-hidden')
        } else {
            button.checked = false
            container.classList.add('visibility-hidden')
        }
    } else {
        button.checked = true
        container.classList.remove('visibility-hidden')
    }
}


console.log(`
1. Часы и календарь +15

2. Приветствие +10

3. Смена фонового изображения +20

4. Виджет погоды +15

5. Виджет цитата дня +10

6. Аудиоплеер +15

7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20

8. Перевод приложения на два языка (en/ru или en/be) +15

9. Получение фонового изображения от API +10 

10. Настройки приложения +20

11. Дополнительный функционал на выбор +10

Требования к репозиторию выполнены

Технические требования выполнены

Требования к оформлению приложения выполнены

Спасибо за проверку и хорошего дня!
`)
