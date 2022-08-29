export let state = {
    data: {
        language: '',
        weatherLanguage: '',
        photoSource: '',
        userName: '',
        city: '',
        settingsInputsStatus: {
            sourceTagInput: '',
            sourceTagInputBlock: false,
        }
    },

    setStateLanguage(lang) {
        if (lang === 'russian') {
            this.data.language = 'russian'
            this.data.weatherLanguage = 'ru'
        } else {
            this.data.language = 'english'
            this.data.weatherLanguage = 'en'
        }
    },

    setStateUserName(userName) {
        this.data.userName = userName
    },

    setStateCity(city) {
        this.data.city = city
    },

    setStatePhotoSource(source) {
        this.data.photoSource = source
    },
    setStatePhotoTag(tag) {
        this.data.settingsInputsStatus.sourceTagInput = tag
    },
    setStatePhotoTagBlock(boolean) {
        this.data.settingsInputsStatus.sourceTagInputBlock = boolean
    },
}



