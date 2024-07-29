// FAKE API //
const api = axios.create({
    baseURL: 'http://127.0.0.1:3004/'
})

// CONFIGURAÇÕES DO GRÁFICO //
const chartConfig = {
    responsive: true,
    base: 0,
    borderSkipped: false,
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
          display: false
        },
        ticks: {
            display: false,
        },
        border: {
            display: false
        }
      }
    },
    plugins: {
        legend: {
          display: false
        }
    }
}

// DIAS DA SEMANA //
const dayOfTheWeek = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
]

// FUNCÃO - CALCULAR AS FREQUENCIAS DOS DIAS DA SEMANA NO ARRAY //
function countWeekDays(arr) {
  const countMap = Object.create(null);

  for (const element of arr) {
    if (!countMap[element]) {
      countMap[element] = 1;
    } else {
      countMap[element] += 1;
    }
  }

  return Object.values(countMap)
}

// FUNÇÃO - CALCULAR O MAIOR E MENOR VALOR NO ARRAY //
function calcHigherAndLowerValue(array){
  const higherIndexDayOfSales = array.reduce((acc, item, index) => {
    return item >= acc ? item : acc
  }, 0)
  const higherDayOfSales = array.indexOf(higherIndexDayOfSales)

  const lowerIndexDayOfSales = array.reduce((acc, item, index) => {
    return item <= acc ? item : acc
  }, higherIndexDayOfSales)

  const lowerDayOfSales = array.indexOf(lowerIndexDayOfSales)
  
  return {
    higher: higherDayOfSales,
    lower: lowerDayOfSales
  };
}

// EVENTO - VENDAS NA SEMANA - GRÁFICO//
window.addEventListener('DOMContentLoaded', async () => {
    // API //
    const data = await api.get('/sales').then(response => response.data)

    const sundaySales = data.filter(item => item.day_week === "0" && item).length
    const mondaySales = data.filter(item => item.day_week === "1" && item).length
    const thuesdaySales = data.filter(item => item.day_week === "2" && item).length
    const wednesdaySales = data.filter(item => item.day_week === "3" && item).length
    const thursdaySales = data.filter(item => item.day_week === "4" && item).length
    const fridaySales = data.filter(item => item.day_week === "5" && item).length
    const saturdaySales = data.filter(item => item.day_week === "6" && item).length

    const salesOnTheWeek = [
        { week: "Seg", amount: mondaySales},
        { week: "Ter", amount: thuesdaySales},
        { week: "Qua", amount: wednesdaySales},
        { week: "Qui", amount: thursdaySales},
        { week: "Sex", amount: fridaySales},
        { week: "Sáb", amount: saturdaySales},
        {week: "Dom", amount: sundaySales},
    ]

    // MÉDIA DE VENDAS //
    const averageSales = (data.length / 7)

    var ctxChartSalesOnWeek = document.getElementById('chart-sales-on-week-box').getContext('2d');

    var gradientBackground = ctxChartSalesOnWeek.createLinearGradient(0, 0, 0, 600);
    gradientBackground.addColorStop(0, "#B5F9F2");
    gradientBackground.addColorStop(0.5, "#32CCBC");
    gradientBackground.addColorStop(1, "#90F7EC");
    

    // GRÁFICO //
    new Chart(ctxChartSalesOnWeek, {
    type: 'bar',
    data: {
        labels: salesOnTheWeek.map(weekName => weekName.week),
        datasets: [{
          data: salesOnTheWeek.map(weekName => weekName.amount),
          backgroundColor: gradientBackground,
          borderRadius: 999,
          barThickness: 20,
          base: 0,
          label: 'Vendas'
          
        },{  
            type: 'line',
            data: salesOnTheWeek.map(_ => averageSales),
            borderColor: '#4A4556',
            borderWidth: 3,
            pointStyle: false
        }]
    },
    options: chartConfig,
})

  // CALCULAR OS DIAS COM MAIORES E MENORES VENDAS (DIA DA SEMANA) //
  let days = []

  // PEGAR OS DIAS DA SEMANA DE TODAS AS VENDAS //
  for (var i = 0; i < data.length; i++) {
    days.push(data[i].day_week)
  }

  const frequencyDays = countWeekDays(days)
  const { higher, lower } = calcHigherAndLowerValue(frequencyDays)

  // MAIOR E MENOR VENDA //
  document.getElementsByClassName('profit')[0].getElementsByTagName('span')[0].innerHTML = dayOfTheWeek[higher]
  document.getElementsByClassName('deficit')[0].getElementsByTagName('span')[0].innerHTML = dayOfTheWeek[lower]
})

// EVENTO - CALCULAR MÉDIA DE SATISFAÇÃO //
window.addEventListener('DOMContentLoaded', async () => {
  const data = await api.get('/sales').then(response => response.data)

  const sum = data.reduce((acc,item) => {
    return acc + item.rating
  },0)

  const averageRating = (sum / data.length)

  const ratingTextP = document.getElementById('rating-text')
  const ratingEmojiImg = document.getElementsByClassName('rating-emoji')[0].getElementsByTagName('img')[0]

    if(averageRating >= 7) {
    ratingTextP.innerHTML = "Excelente"
    ratingTextP.classList.add("success")

    ratingEmojiImg.src = "./assets/icons/happy.svg"
    ratingEmojiImg.alt = "Emoji feliz"
  } else {
    ratingTextP.innerHTML = "Ruim"
    ratingTextP.classList.add("danger")

    ratingEmojiImg.src = "./assets/icons/sad.svg"
    ratingEmojiImg.alt = "Emoji feliz"
  }

  document.getElementById('average-rating').innerHTML = `NPS Score ${averageRating.toLocaleString('pt-BR', {
    maximumFractionDigits: 2
  })}`
})

// EVENTO - CALCULAR VENDAS FECHADAS/REALIZADAS //
window.addEventListener('DOMContentLoaded', async() => {
  const [data, goal] = await Promise.all([api.get('/sales').then(response => response.data), api.get('/goal').then(response => response.data)])

  const closedSales = data.length
  const expectedSales = goal.sales_of_count

  document.getElementById('expected-sales').innerHTML = `Esperado ${expectedSales}`
  document.getElementById('achieved-sales').innerHTML = `Alcançado ${closedSales}`

  const salesPercentValueP = document.getElementById('sales-percent-value')
  const salesPercent = (closedSales / expectedSales) * 100
  salesPercentValueP.innerHTML = `${salesPercent.toLocaleString('pt-BR', {maximumFractionDigits: 1})}%`

  // GRÁFICO //
  const progressBarChart = document.getElementById('chart-sales')
  const progressBar = progressBarChart.getElementsByTagName('circle')[1]
  progressBar.style.transition = 'all 1s'

  if(data.length >= expectedSales) {
    progressBar.style.strokeDashoffset = 0
  } else {
    progressBar.style.strokeDashoffset = `${570 - (salesPercent / 100) * 570}`
  }
})

// EVENTO - CALCULAR META MENSAL //
window.addEventListener('DOMContentLoaded', async() => {
  const [data, goal] = await Promise.all([api.get('/sales').then(response => response.data), api.get('/goal').then(response => response.data)])

  const expectedSales = goal.monthly_amount
  const closedSales = data.reduce((acc, item) => {
    return acc + item.amount
  },0)

  document.getElementById('expected-month-sales').innerHTML = `Esperado ${expectedSales.toLocaleString('pt-BT', {style: 'currency', currency: 'BRL', maximumFractionDigits:0})}`
  document.getElementById('achieved-month-sales').innerHTML = `Alcançado ${closedSales.toLocaleString('pt-BT', {style: 'currency', currency: 'BRL', maximumFractionDigits:0})}`

  const salesPercentValueP = document.getElementById('month-sales-percent-value')
  const salesPercent = (closedSales / expectedSales) * 100
  salesPercentValueP.innerHTML = `${salesPercent.toLocaleString('pt-BR', {maximumFractionDigits: 1})}%`

  // GRÁFICO //
  const progressBarChart = document.getElementById('chart-monthly-goal')
  const progressBar = progressBarChart.getElementsByTagName('circle')[1]
  progressBar.style.transition = 'all 1s'

  if(closedSales >= expectedSales) {
    progressBar.style.strokeDashoffset = 0
  } else {
    progressBar.style.strokeDashoffset = `${570 - (salesPercent / 100) * 570}`  
  }
})