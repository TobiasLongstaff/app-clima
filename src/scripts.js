const APPKEY = 'b3793fa27f3523785e39456380d43fbf'

const getWeather = async (country = 'Buenos%20Aires,ar') => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&APPID=${APPKEY}`)
    const weather = await response.json()
    console.log(weather)
    document.querySelector('#city').innerHTML = `${weather.name} ${weather.sys.country}` 
    document.querySelector('#temp').innerHTML = `${weather.main.temp = Math.round(weather.main.temp)}°`
    document.querySelector('#feels-like').innerHTML = `${weather.main.feels_like = Math.round(weather.main.feels_like)}°`
    document.querySelector('#humidity').innerHTML = `${weather.main.humidity}%`
    document.querySelector('#max').innerHTML = `${weather.main.temp_max = Math.round(weather.main.temp_max)}°`
    document.querySelector('#min').innerHTML = `${weather.main.temp_min = Math.round(weather.main.temp_min)}°`
    document.querySelector('#wind-speed').innerHTML = `${weather.wind.speed}km/h`
    document.querySelector('#img-weather').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    document.querySelector('#img-weather').alt = `${weather.weather[0].description}`
    document.querySelector('#desciption-weather').innerHTML = `${weather.weather[0].main}`
}

getWeather('Spanish,sp, es')