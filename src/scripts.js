const APPKEY_openweather = 'b3793fa27f3523785e39456380d43fbf'
const url_openweather = 'https://api.openweathermap.org/data/2.5/'
const url_positionstack = 'https://apis.datos.gob.ar/georef/api/'

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
        const responsePosition = await fetch(`${url_positionstack}provincias?nombre=${country}`)
        const ubication = await responsePosition.json()
        const response = await fetch(
            `${url_openweather}onecall?lat=${ubication.provincias[0].centroide.lat}&lon=${ubication.provincias[0].centroide.lon}&units=${units}&exclude=minutely&APPID=${APPKEY_openweather}`
        )
        const weather = await response.json()
        document.querySelector('#city').innerHTML = country 
        document.querySelector('#temp').innerHTML = `${Math.round(weather.current.temp)}°`
        document.querySelector('#feels-like').innerHTML = `${Math.round(weather.current.feels_like)}°`
        document.querySelector('#humidity').innerHTML = `${weather.current.humidity}%`
        document.querySelector('#wind-speed').innerHTML = `${weather.current.wind_speed} ${units === 'metric' ? 'km/h' : 'mi/h'}`
        document.querySelector('#img-weather').src = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
        document.querySelector('#img-weather').alt = `${weather.current.weather[0].description}`
        document.querySelector('#desciption-weather').innerHTML = `${weather.current.weather[0].main}`

        document.querySelector('#loader').style.display = 'none'
        document.querySelector('#app').style.opacity = 1

        let template = ''
        weather.hourly.map((temp, index) => {
            if(index < 13) {
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
            }
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

const getProvincias = async () => {
    try {
        const responseProvincias = await fetch(`${url_positionstack}provincias`)
        const provincias = await responseProvincias.json()
        let template = ''
        provincias.provincias.map(provincia => {
            console.log(provincia.nombre)
            template += `
                <option value="${provincia.nombre}"}>${provincia.nombre}</option>
            `
        })
        document.querySelector('#citys').innerHTML = template
    } 
    catch (error) {
        console.log(error)
    }
}

getProvincias()

getWeather()