// GRÁFICO CONFIG //
const chartConfig = {
    responsive: true,
    base: 0,
    borderSkipped: false,
    pointStyle: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
            display: false
        },
        ticks: {
            color: 'white'
        }
      },
      y: {
        grid: {
          display: true
        },
        ticks: {
            display: true,
        },
        border: {
            display: false
        },
      }
    },
    plugins: {
        legend: {
          display: false
        }
    }
}

// AXIOS CONFIR //
// FAKE API //
const api = axios.create({
    baseURL: 'http://127.0.0.1:3004/'
})

// Temporario //
const data = [ 5.0, 5.1, 5.15, 5.22, 5.16, 5.17, 5.2, 5.22, 5.24, 5.25, 5.1]

// ELEMENTOS //
const chartExchangeRateCanva = document.getElementById('chart-exchange-rate').getContext("2d")

const selectsCountry = document.getElementsByClassName('select-country')
const selectCountryOrigin = document.getElementById('select-origin-currency-country')
const selectCountryDestiny = document.getElementById('select-destiny-currency-country')

function populateSelectCountry(countries) {
    const ul = document.createElement('ul')
    ul.classList.add('select-options')

    for (country of countries) {
        const countryLi = document.createElement('li')
        countryLi.classList.add('option-item')
        countryLi.title = country.name
        countryLi.id = country.id

        const flagImg = document.createElement('img')
        flagImg.src = country.flag_url

        const currencyNameSpan = document.createElement('span')
        currencyNameSpan.innerHTML = country.currency

        countryLi.appendChild(flagImg)
        countryLi.appendChild(currencyNameSpan)

        ul.appendChild(countryLi)
    }

    return ul
}

window.addEventListener('DOMContentLoaded', () => {
    const gradient = chartExchangeRateCanva.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.5)");   
    gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.2)");
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)");

    new Chart(chartExchangeRateCanva, {
        type: 'line',
        data: {
            labels: Array.from({ length: data.length }, (_, i) => i + 1),
            datasets: [{
                label: 'Cotação',
                fill: true,
                data: data,
                backgroundColor: gradient,
                borderColor: '#7C3AED',
                borderWidth: 1,
            }]
        },
        options: chartConfig
    })    
})

window.addEventListener('DOMContentLoaded', async () => {
    const countries = await api.get('/countries').then(response => response.data)

    for (select of selectsCountry) {
        const ul = populateSelectCountry(countries)

        select.appendChild(ul)
    }
})

// Continuar ...//
// Abrir e fechar os SELECTS //
// Capturar a seleção do usuário //