import {OPEN_WEATHER_API_KEY as OpenWheatherAPIKey}  from './env/index.js'

const CITY = 'Taboão da Serra'

window.document.addEventListener('DOMContentLoaded', async () => {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OpenWheatherAPIKey}&units=metric&lang=pt_br`).then(response => response.data)
    console.log(data)
})

