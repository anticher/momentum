import { greetingTranslation } from './translation.js'
import { state } from './state.js'
import { sourceTagInputBlock } from './settings.js'

const dateElement = document.querySelector('.date')
const timeElement = document.querySelector('.time')
const greetingElement = document.querySelector('.greeting')
export const userName = document.querySelector('.name')

let bgRandomNumber

let date = new Date()

export function showTimeDateGreeting(lang) {
  showTime()
  showGreetingText(lang)
  showDate(lang)
}


// time

export function showTime() {
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  timeElement.textContent = currentTime
  setTimeout(showTime, 1000)
}


//


// date

function showDate(lang) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  if (lang === 'english') {
    const currentDate = date.toLocaleDateString('en-En', options)
    dateElement.textContent = currentDate
  } else if (lang === 'russian') {
    const currentDate = date.toLocaleDateString('ru-Ru', options)
    dateElement.textContent = currentDate
  }
}

//

// timeOfDay

function getTimeOfDay() {
  const hours = date.getHours()
  if (hours <= 5) {
    return 'Night'
  } else if (hours <= 11) {
    return 'Morning'
  } else if (hours <= 17) {
    return 'Afternoon'
  } else if (hours <= 23) {
    return 'Evening'
  }
}

//

//greeting text

function showGreetingText(lang) {
  const greetingText = `Good ${getTimeOfDay()}`
  greetingElement.textContent = greetingTranslation[lang][greetingText]
  userName.placeholder = greetingTranslation[lang]['PlaceHolder']
}




//

// background
export const bodyElement = document.querySelector('body')



// let source = 'gitHub'

// let source = 'unsplash'

// let source = 'flickr'


function getRandomNumForBg(bgNumber) {
  return Math.floor(Math.random() * bgNumber) + 1
}



export async function setBg(source) {
  let BgTag = getTimeOfDay().toLowerCase()
  const img = new Image()
  if (!bgRandomNumber) {
    bgRandomNumber = getRandomNumForBg(20)
  }
  if (source === 'github') {
    const number = bgRandomNumber.toString().padStart(2, "0")
    img.src = `https://raw.githubusercontent.com/anticher/momentum-images/main/images/${BgTag}/${number}.jpg`
    state.setStatePhotoTagBlock(true)
    sourceTagInputBlock()
  } else {
    state.setStatePhotoTagBlock(false)
    sourceTagInputBlock()
    if (state.data.settingsInputsStatus.sourceTagInput !== '') {
      BgTag = state.data.settingsInputsStatus.sourceTagInput
    }
    if (source === 'unsplash') {
      const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${BgTag}&client_id=aoX0rDfQk1G2xigkewYXnpqSgjlV1kHW8YLBVAT5CkY`
      const res = await fetch(url)
      const data = await res.json()
      img.src = data.urls.regular
    } else if (source === 'flickr') {
      let bgNumber = getRandomNumForBg(100)
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b71a9c1cb303457bc8491e750660b116&orientation=landscape&tags=${BgTag}&extras=url_l,%20url_l&format=json&nojsoncallback=1`
      const res = await fetch(url)
      const data = await res.json()
      if (data.photos.photo[bgNumber].url_l) {
        img.src = data.photos.photo[bgNumber].url_l
      } else {
        img.src = data.photos.photo[bgNumber].url_h
      }
    }

  }
  img.onload = () => {
    bodyElement.style.backgroundImage = `url(${img.src})`
    bodyElement.style.backgroundSize = 'cover'
  }
}

// background slider
export const slidePrevBtn = document.querySelector('.slide-prev')
export const slideNextBtn = document.querySelector('.slide-next')



export function getSlideNext(source) {
  if (bgRandomNumber < 20) {
    bgRandomNumber++
  } else {
    bgRandomNumber = 1
  }
  slideButtonsDisable()
  setBg(source)
  slideButtonsUndisable()
}

export function getSlidePrev(source) {
  if (bgRandomNumber > 1) {
    bgRandomNumber--
  } else {
    bgRandomNumber = 20
  }
  slideButtonsDisable()
  setBg(source)
  slideButtonsUndisable()
}

function slideButtonsDisable() {
  slideNextBtn.disabled = true
  slidePrevBtn.disabled = true
}

function slideButtonsUndisable() {
  setTimeout(function () {
    slideNextBtn.disabled = false
    slidePrevBtn.disabled = false
  }
    , 1500)
}

//
