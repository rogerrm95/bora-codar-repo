import {OPEN_WEATHER_API_KEY, WAQ_API_KEY}  from './env/index.js'

const CITY = 'Taboão da Serra'
const STATE = "sao-paulo"

// FUNÇÃO - AVALIAR QUALIDADE DO AR //
function airQualityAvaliation(index = 0) {
  let avaliation = ''
  let description = ''

  if (index <= 50) {
    avaliation = 'great'
    description = 'Bom';
  } else if (index <= 100) {
    avaliation = 'warning'
    description = 'Moderado';
  } else {
    avaliation = 'danger'
    description = 'Ruim';
  }

  return {
    value: index,
    avaliation,
    description,
  }
}

// FUNÇÃO - FORMATAÇÃO DE DADOS EM TIMESTAMP PARA DIA DA SEMANA //
function formatterDayOfWeek(timestamp, locale='pt-BR') {
    const date = new Date(timestamp * 1000)
    const dateOfWeek = date.toLocaleDateString(locale, {weekday: 'long'})

    return dateOfWeek.charAt(0).toUpperCase() + dateOfWeek.slice(1)
}

// FUNÇÃO - FORMATAÇÃO DE DADOS EM TIMESTAMP PARA HORÁRIO //
function formatterTime(timestamp, locale='pt-BR'){
  const date = new Date(timestamp * 1000)
  const time = date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })

  return time
}

// FUNÇÃO - CONSULTAR API DE QUALIDADE DO AR //
async function getAirQuality() {
  const {data} = await axios.get(`http://api.waqi.info/feed/${STATE}/?token=${WAQ_API_KEY}`)
    .then(response => response.data)

  console.log(data.iaqi)

  const airQuality = {
    pm25: data.iaqi?.pm25?.v || 0.0,
    pm10: data.iaqi?.pm10?.v || 0.0,
    co: data.iaqi?.co?.v || 0.0,
    no2: data.iaqi?.no2?.v || 0.0,
    o3: data.iaqi?.o3?.v || 0.0,
    so2: data.iaqi?.so2?.v || 0.0,
    aqi: airQualityAvaliation(data.aqi)
  }

  return airQuality
}

// FUNÇÃO - CONSULTAR API DE PREVISÃO DO TEMPO DE HOJE //
async function getTodayWeather(){
  const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`).then(response => response.data)
  
  const wheatherToday = {
      temp: Math.round(data.main.temp),
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
      humidity: Math.round(data.main.humidity),
      wind: Math.round(data.wind.speed),
      rainPercentual: Math.round(data.pop * 100) || 0,
      suntime: {
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      }
  }

  return wheatherToday
}

// FUNÇÃO - CONSULTAR API DE PREVISÃO DO TEMPO (5 DIAS) //
async function getForecastWheather(){
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`).then(response => response.data)
    
    const dailyWeather = {};

    data.list.forEach(forecast => {
      // Obtém a data no formato YYYY-MM-DD
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];

      // Inicializa ou atualiza a entrada para o dia
      if (!dailyWeather[date]) {
        dailyWeather[date] = {
          tempMin: forecast.main.temp_min,
          tempMax: forecast.main.temp_max,
          weather: []
        };
      } else {
        dailyWeather[date].tempMin = Math.min(dailyWeather[date].tempMin, forecast.main.temp_min);
        dailyWeather[date].tempMax = Math.max(dailyWeather[date].tempMax, forecast.main.temp_max);
      }
      dailyWeather[date].weather.push(forecast.weather[0].main);
    });

    // Determina o tipo de clima predominante
    Object.keys(dailyWeather).forEach(date => {
      const weatherConditions = dailyWeather[date].weather;
      const weatherCounts = {};

      // Conta a frequência de cada condição
      weatherConditions.forEach(condition => {
        weatherCounts[condition] = (weatherCounts[condition] || 0) + 1;
      });

      // Encontra a condição mais frequente
      let predominantWeather = '';
      let maxCount = 0;
      for (const [condition, count] of Object.entries(weatherCounts)) {
        if (count > maxCount) {
          maxCount = count;
          predominantWeather = condition;
        }
      }

      dailyWeather[date].weather = predominantWeather;
    });

    // Converte o objeto para um array e ordena por data
    const sortedDates = Object.keys(dailyWeather).sort();
    const forecastResults = sortedDates.map(date => ({
      timestamp: new Date(date).getTime() / 1000,
      tempMin: Math.round(dailyWeather[date].tempMin),
      tempMax: Math.round(dailyWeather[date].tempMax),
      weather: dailyWeather[date].weather.toLowerCase(),
    })).splice(0, 5);

    return forecastResults
}

window.document.addEventListener('DOMContentLoaded', async () => {
    const [wheatherToday, forecastResults, airQuality] = await Promise.all([getTodayWeather(), getForecastWheather(), getAirQuality()])

    // CARD 1 - TEMPO (HOJE) 
    document.getElementById('city-label').innerHTML = CITY
    const temparatureNow = document.getElementsByClassName('temp-now')[0].children[0]
    temparatureNow.innerHTML = `${wheatherToday.temp}`

    const header = document.getElementsByTagName('header')[0]
    const wheatherImage = document.createElement('img')
    wheatherImage.src = `./assets/icons/${forecastResults[0].weather}-3x.png`
    wheatherImage.alt = "Clima"
    wheatherImage.id = 'weather-image'
    header.prepend(wheatherImage)

    const temparatureMax = document.getElementById('temp-max')
    temparatureMax.innerHTML = `${wheatherToday.tempMax}º`

    const temparatureMin = document.getElementById('temp-min')
    temparatureMin.innerHTML = `${wheatherToday.tempMin}º`

    const windSpeed = document.getElementById('wind')
    windSpeed.innerHTML = `${wheatherToday.wind}`

    const humidity = document.getElementById('humidity')
    humidity.innerHTML = `${wheatherToday.humidity}`

    const rain = document.getElementById('rain')
    rain.innerHTML = `${wheatherToday.rainPercentual}`

    // CARD 2 - QUALIDADE DO AR
    const airQualityDiv = document.getElementById('air-quality')

    const airQualityAvalationSpan = airQualityDiv.getElementsByTagName('span')[0]
    airQualityAvalationSpan.innerHTML = airQuality.aqi.description
    airQualityAvalationSpan.classList.add(`text-${airQuality.aqi.avaliation}`)
    
    const airQualityValueSpan = airQualityDiv.getElementsByTagName('span')[1]
    airQualityValueSpan.innerHTML = airQuality.aqi.value

    document.getElementById('PM2.5').textContent = airQuality.pm25
    document.getElementById('PM10').textContent = airQuality.pm10
    document.getElementById('SO2').textContent = airQuality.so2
    document.getElementById('NO2').textContent = airQuality.no2
    document.getElementById('O2').textContent = airQuality.o3
    document.getElementById('CO').textContent = airQuality.co

    const pollutantsIndex = document.getElementsByClassName('pollutants-index')

    for(let i=0; i < pollutantsIndex.length; i++) {
        pollutantsIndex[i].classList.add(`text-${airQuality.aqi.avaliation}`)
    }

    // CARD 3 - HORÁRIO DO SOL
    const sunrise = formatterTime(wheatherToday.suntime.sunrise)
    const sunset = formatterTime(wheatherToday.suntime.sunset)

    const sunriseSpan = document.getElementById('sunrise')
    const sunsetSpan = document.getElementById('sunset')
    sunriseSpan.innerHTML = sunrise
    sunsetSpan.innerHTML = sunset
    
    // CARD 4 - PREVISÃO DO TEMPO (+5 DIAS)
    const forecastListUl = document.getElementById('forecast-list')

    for(let i=0; i < forecastResults.length; i++) {
        const dayOfWeek = formatterDayOfWeek(forecastResults[i].timestamp)

        // Criando os elementos da lista
        const forecastListItem = document.createElement('li')
        forecastListItem.classList.add('day')

        const dayOfWeekSpan = document.createElement('span')
        const wheatherImage = document.createElement('img')
        dayOfWeekSpan.innerHTML = dayOfWeek
        wheatherImage.src = `./assets/icons/${forecastResults[i].weather}.png`
        
        const tempMaxMinDiv = document.createElement('div')
        tempMaxMinDiv.classList.add('max-min')

        const tempMax = document.createElement('span')
        const tempMin = document.createElement('span')
        tempMax.innerHTML = `${forecastResults[i].tempMax}º`
        tempMin.innerHTML = `${forecastResults[i].tempMin}º`

        tempMaxMinDiv.appendChild(tempMax)
        tempMaxMinDiv.appendChild(tempMin)

        forecastListItem.appendChild(dayOfWeekSpan)
        forecastListItem.appendChild(wheatherImage)
        forecastListItem.appendChild(tempMaxMinDiv)

        forecastListUl.appendChild(forecastListItem)
    }
}
)