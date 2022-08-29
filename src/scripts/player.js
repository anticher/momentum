import playList from './playList.js'

export const playBtn = document.querySelector('.play-current')
export const playNextBtn = document.querySelector('.play-next')
export const playPrevBtn = document.querySelector('.play-prev')
export const audioElement = new Audio()

const playListElement = document.querySelector('.play-list')
const progressTrackNameElement = document.querySelector('.progress-bar-track-name')

let littlePlayBtn

let isPlay = false

let playNum = 0


// play
function createAudio() {
    audioElement.src = playList[playNum].src
    audioElement.currentTime = 0
    progressTrackNameElement.textContent = `${playNum+1}. ${playList[playNum].author} - ${playList[playNum].title}`
}

function playAudio() {
    if (!audioElement.currentTime) {
        createAudio()
    }
    audioElement.play()
    highlightPlayItem()
    playBtn.classList.add('pause')
    littlePlayBtn.classList.add('pause')
    isPlay = true
}

export function pauseAudio() {
    audioElement.pause()
    playBtn.classList.remove('pause')
    littlePlayBtn.classList.remove('pause')
    isPlay = false
}

function stopAudio() {
    audioElement.pause()
    audioElement.currentTime = 0
    playBtn.classList.remove('pause')
    littlePlayBtn.classList.remove('pause')
    isPlay = false
}



export function onPlayClick() {
    if (!isPlay) {
        playAudio()

    } else {
        pauseAudio()

    }
}

export function onPlayNextClick() {
    stopAudio()
    if (playNum < playList.length - 1) {
        playNum++
    } else {
        playNum = 0
    }
    highlightPlayItem()
    playAudio()
}

export function onPlayPrevClick() {
    stopAudio()
    if (playNum > 0) {
        playNum--
    } else {
        playNum = playList.length - 1
    }
    highlightPlayItem()
    playAudio()
}


export function createPlayList() {
    playList.forEach((element, index) => {
        // create li
        const li = document.createElement('li')
        li.classList.add('play-item')
        li.textContent = playList[index].title
        // create play button for li
        const button = document.createElement('button')
        button.classList.add('play')
        button.classList.add('player-icon')
        button.dataset.trackNumber = index
        if (index === 0) {
            button.classList.add('play-little')
        }
        button.addEventListener('click', onLittlePlayClick)
        li.append(button)
        playListElement.append(li)
    })
    //first track initialization
    createAudio()
    littlePlayBtn = document.querySelector('.play-little')
}

export function onLittlePlayClick() {
    if (this.dataset.trackNumber == playNum) {
        onPlayClick()
    } else {
        stopAudio()
        playNum = +this.dataset.trackNumber
        highlightPlayItem()
        playAudio()
    }
    
}

function highlightPlayItem() {
    const list = playListElement.querySelectorAll('li')
    list.forEach(element => {
        element.classList.remove('item-active')
        element.lastChild.classList.remove('pause')
        element.lastChild.classList.remove('play-little')
    })
    list[playNum].classList.add('item-active')
    list[playNum].lastChild.classList.add('play-little')
    littlePlayBtn = document.querySelector('.play-little')
    littlePlayBtn.classList.add('pause')
}

//progress
export const progressBarElement = document.querySelector('.progress-bar')
const progressCurrentElement = document.querySelector('.progress-current')
const progressTotalElement = document.querySelector('.progress-total')

export function updateProgressAndVolumeBackground(element, value = 0) {
    element.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) ${value}%, transparent ${value}%, transparent 100%)`
}

function formatTime(sec) {
    sec = Math.round(sec)
    let minutes = Math.floor(sec / 60) || 0
    let seconds = (sec - minutes * 60) || 0

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

export function updateProgressNumbers() {
    progressCurrentElement.textContent = formatTime(audioElement.currentTime)
    progressTotalElement.textContent = formatTime(audioElement.duration)
}

progressBarElement.value = 0


//mute
export const muteBtnElement = document.querySelector('.mute-btn')

export const volumeBarElement = document.querySelector('.volume-bar')

let muteValue = 0

export function onMuteClick() {
    if (muteBtnElement.classList.contains('muted')) {
        muteBtnElement.classList.remove('muted')
        volumeBarElement.value = muteValue
        updateProgressAndVolumeBackground(volumeBarElement, muteValue)
        audioElement.volume = muteValue / 100
    } else {
        muteBtnElement.classList.add('muted')
        muteValue = volumeBarElement.value
        volumeBarElement.value = 0
        updateProgressAndVolumeBackground(volumeBarElement)
        audioElement.volume = 0
    }
}

//volume
export function onVolumeChanged() {
    const value = this.value
    updateProgressAndVolumeBackground(volumeBarElement, value)
    audioElement.volume = value / 100
    muteValue = value
    if (value > 0) {
        muteBtnElement.classList.remove('muted')
    } else {
        muteBtnElement.classList.add('muted')
    }
}

