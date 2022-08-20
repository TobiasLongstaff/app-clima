const APPKEY_openweather = 'b3793fa27f3523785e39456380d43fbf'
const APPKEY_positionstrack = '1ca1073357cef86919c12fba6bb02333'
const url_openweather = 'https://api.openweathermap.org/data/2.5/'
const url_positionstack = 'http://api.positionstack.com/v1/'

const inputCountries = document.querySelector('#search')
const units = document.querySelector('#units')

inputCountries.addEventListener('change', () => {
    if(inputCountries.value) {
        document.querySelector('#loader').style.display = 'flex'
        document.querySelector('#app').style.opacity = 0
        getWeather(inputCountries.value, localStorage.getItem('units'))
    }
})

units.addEventListener('change', () => {
    document.querySelector('#loader').style.display = 'flex'
    document.querySelector('#app').style.opacity = 0
    getWeather(localStorage.getItem('country'), units.value)
})

const getWeather = async (country = 'Buenos Aires', units = 'metric') => {
    localStorage.setItem('country', country)
    localStorage.setItem('units', units)
    try {
        const responsePosition = await fetch(`${url_positionstack}forward?query=${country}&limit=1&access_key=${APPKEY_positionstrack}`)
        const ubication = await responsePosition.json()
        console.log(ubication)
        const response = await fetch(
            `${url_openweather}onecall?lat=${ubication.data[0].latitude}&lon=${ubication.data[0].longitude}&units=${units}&exclude=minutely&APPID=${APPKEY_openweather}`
        )
        const weather = await response.json()
        document.querySelector('#city').innerHTML = country 
        document.querySelector('#temp').innerHTML = `${Math.round(weather.current.temp)}°`
        document.querySelector('#feels-like').innerHTML = `${Math.round(weather.current.feels_like)}°`
        document.querySelector('#humidity').innerHTML = `${weather.current.humidity}%`
        document.querySelector('#wind-speed').innerHTML = `${weather.current.wind_speed}km/h`
        document.querySelector('#img-weather').src = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
        document.querySelector('#img-weather').alt = `${weather.current.weather[0].description}`
        document.querySelector('#desciption-weather').innerHTML = `${weather.current.weather[0].main}`

        document.querySelector('#loader').style.display = 'none'
        document.querySelector('#app').style.opacity = 1

        // <label>${new Date(temp.dt*1000)}</label>
        let template = ''
        weather.hourly.map(temp => {
            template += 
            `
                <div class="card-weather">
                    <div class="container-img-card">
                        <img class="img-day-weather" src="https://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png" alt="${temp.weather[0].description}"/>                    
                    </div>
                    <h3>${Math.round(temp.temp)}°</h3>
                    <label class="text-datails-temp">${new Date(temp.dt*1000).getHours()}:00</label>
                </div>
            `
        })
        document.querySelector('#weather-forecast').innerHTML = template

        const rootElem = document.querySelector(':root')
        if(weather.current.weather[0].icon.includes('d')) {
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