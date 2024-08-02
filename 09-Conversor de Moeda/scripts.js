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
    },
    maintainAspectRatio: false,
}

// FAKE API //
const api = axios.create({
    baseURL: 'http://127.0.0.1:3004/'
})

// ELEMENTOS //
const chartExchangeRateCanva = document.getElementById('chart-exchange-rate').getContext("2d")
const countryOriginSelect = document.getElementById('select-origin-currency-country')
const countryDestinySelect = document.getElementById('select-destiny-currency-country')
const filterButton = document.querySelectorAll('.period-button')

// FUNÇÃO - CARREGAR OS DADOS DA API AWESOME (COTAÇÃO) E ALIMENTAR O GRÁFICO //
async function loadDailyExchangeRate(days){
    const currencyOrigin = countryOriginSelect.getElementsByTagName('span')[0].textContent
    const currencyDestiny = countryDestinySelect.getElementsByTagName('span')[0].textContent

    const data = await api.get(`https://economia.awesomeapi.com.br/json/daily/${currencyOrigin}-${currencyDestiny}/${days}`).then(response => response.data)
   
    const bidList = data.map(item => item.bid)

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
                data: bidList,
                backgroundColor: gradient,
                borderColor: '#7C3AED',
                borderWidth: 1,
            }]
        },
        options: chartConfig
    })  
}

// FUNÇÃO - APLICAR A CLASSE SELECTED NO BOTÃO E REMOVER NOS DEMAIS //
function toggleButtonActive(buttonTarget, buttonsList){
    buttonsList.forEach(button => {
        button.classList.remove('selected')
    })
    
    buttonTarget.classList.add('selected')
}

// FILTRAR POR 1 DIA //
const btnLoadExchange1Day = document.getElementById('btn-exchange-1-day')
btnLoadExchange1Day.addEventListener('click', async () => {
    const chart = Chart.getChart('chart-exchange-rate')
    if(chart !== undefined) {
        chart.destroy()
    }
    await loadDailyExchangeRate(2).then(() => {
        toggleButtonActive(btnLoadExchange1Day, filterButton)
    });
})

// FILTRAR POR 5 DIAS //
const btnLoadExchange5Day = document.getElementById('btn-exchange-5-day')
btnLoadExchange5Day.addEventListener('click', async () => {
    const chart = Chart.getChart('chart-exchange-rate')
    if(chart !== undefined) {
        chart.destroy()
    }
    await loadDailyExchangeRate(5).then(() => toggleButtonActive(btnLoadExchange5Day, filterButton))
})

// FILTRAR POR 30 DIAS //
const btnLoadExchange30Day = document.getElementById('btn-exchange-30-day')
btnLoadExchange30Day.addEventListener('click', async () => {
    const chart = Chart.getChart('chart-exchange-rate')
    if(chart !== undefined) {
        chart.destroy()
    }
    await loadDailyExchangeRate(30).then(() => toggleButtonActive(btnLoadExchange30Day, filterButton))
})

// FILTRAR POR 1 ANO //
const btnLoadExchange1Year = document.getElementById('btn-exchange-1-year')
btnLoadExchange1Year.addEventListener('click', async () => {
    const chart = Chart.getChart('chart-exchange-rate')
    if(chart !== undefined) {
        chart.destroy()
    }
    
    await loadDailyExchangeRate(365).then(() => {
        toggleButtonActive(btnLoadExchange1Year, filterButton)
    })

})