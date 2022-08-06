const APPKEY = 'b3793fa27f3523785e39456380d43fbf'
const url = 'https://api.openweathermap.org'

const inputCountries = document.querySelector('#search')
const units = document.querySelector('#units')

inputCountries.addEventListener('change', () => {
    if(inputCountries.value) getWeather(inputCountries.value, localStorage.getItem('units'))
})

units.addEventListener('change', () => {
    getWeather(localStorage.getItem('country'), units.value)
})

const getWeather = async (country = 'Buenos%20Aires,ar', units = 'metric') => {
    localStorage.setItem('country', country)
    localStorage.setItem('units', units)
    try {
        const response = await fetch(`${url}/data/2.5/weather?q=${country}&units=${units}&APPID=${APPKEY}`)
        const weather = await response.json()
        document.querySelector('#city').innerHTML = `${weather.name} ${weather.sys.country}` 
        document.querySelector('#temp').innerHTML = `${weather.main.temp = Math.round(weather.main.temp)}°`
        document.querySelector('#feels-like').innerHTML = `${weather.main.feels_like = Math.round(weather.main.feels_like)}°`
        document.querySelector('#humidity').innerHTML = `${weather.main.humidity}%`
        document.querySelector('#wind-speed').innerHTML = `${weather.wind.speed}km/h`
        document.querySelector('#img-weather').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        document.querySelector('#img-weather').alt = `${weather.weather[0].description}`
        document.querySelector('#desciption-weather').innerHTML = `${weather.weather[0].main}` 
        
        const rootElem=document.querySelector(':root')

        if(weather.weather[0].icon.includes('d')) {
            rootElem.style.setProperty('--background', '#fff')
            rootElem.style.setProperty('--primary', '#d4dbfb')
            rootElem.style.setProperty('--font', '#131121')

        }
        else {
            rootElem.style.setProperty('--background', '#131121')
            rootElem.style.setProperty('--primary', '#1C1A2E')
            rootElem.style.setProperty('--font', '#FFFFFF')
        }
    }
    catch(error) {
        console.log(error)
    }
}

getWeather()