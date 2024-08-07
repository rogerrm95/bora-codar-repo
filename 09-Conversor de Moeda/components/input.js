// INPUTS //
const inputOrigin = document.getElementById('currency-origin-input')
const inputDestiny = document.getElementById('currency-destiny-input')

const exchangeRateSpan = document.getElementById('exchange-rate-value')

// FUNÇÃO - CARREGAR E CALCULAR A COTAÇAO //
async function calculateExchangeRate(currencyFrom, currencyTo, event){   
    if(currencyFrom.length > 0 && currencyTo.length > 0) {
        const data = await api.get(`https://economia.awesomeapi.com.br/last/${currencyFrom}-${currencyTo}`).then(response => response.data)

        const objectName = `${currencyFrom}${currencyTo}`
        const exchangeRate = data[objectName].bid // TAXA DE COTAÇÃO

        const valueConverted = (exchangeRate * event.target.value).toFixed(2)
        inputDestiny.value = Number(valueConverted)

        exchangeRateFormatted = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: currencyTo}).format(exchangeRate)

        exchangeRateSpan.innerHTML = `Cotação: ${exchangeRateFormatted}`
    }
}

function resetFields(){
    inputOrigin.value = ''
    inputDestiny.value = ''

    document.getElementById('exchange-rate-value').innerHTML = ''
}


inputOrigin.addEventListener('blur', async (event) => {
    const currencyOrigin = countryOriginSelect.getElementsByTagName('span')[0].textContent
    const currencyDestiny = countryDestinySelect.getElementsByTagName('span')[0].textContent

    await calculateExchangeRate(currencyOrigin, currencyDestiny, event)

    event.stopPropagation()
})