var weather_icon = document.getElementById('weather_icon')
var weather_type = document.getElementById('weather_type')
var temperature = document.getElementById('temperature')

const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=39.63&lon=34.46&exclude=minutely,hourly,daily,alerts&units=metric&appid="6cec850046191bd0902a1afd13a9af0c"`

const getWeather = async function () {
    var resp = await fetch(weather_url)
    var data = await resp.json()
    weather_type.innerHTML = data.weather[0].main
    temperature.innerHTML = String(data.main.temp).split('.')[0] + '°'
}

getWeather()
