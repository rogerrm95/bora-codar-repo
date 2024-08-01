const selectsCountry = document.getElementsByClassName('select-country')
const revertOptionsButton = document.getElementById('revert-country-option-btn')
// SELECT COUNTRY - DESTINO //
const selectCountryDestiny = document.getElementById('select-destiny-currency-country')
const chevronSelectCountryDestiny = selectCountryDestiny.getElementsByTagName('img')[1]
// SELECT COUNTRY - ORIGEM //
const selectCountryOrigin = document.getElementById('select-origin-currency-country')
const chevronSelectCountryOrigin = selectCountryOrigin.getElementsByTagName('img')[1]

// FUNÇÃO - CARREGAR AS OPÇÕES DO SELECT (API) //
function populateSelectCountry(countries, element) {
    const ul = document.createElement('ul')
    ul.classList.add('select-options')

    const optionSelected = element.getElementsByTagName('span')[0]
    const optionSelectedCountryFlag = element.getElementsByTagName('img')[0]

    for (country of countries) {
        const countryLi = document.createElement('li')
        countryLi.classList.add('option-item')
        countryLi.title = country.name
        countryLi.id = country.id

        const flagImg = document.createElement('img')
        flagImg.src = country.flag_url
        flagImg.alt = country.abbrev

        const currencyNameSpan = document.createElement('span')
        currencyNameSpan.innerHTML = country.currency

        countryLi.addEventListener('click', () => {
            optionSelected.innerHTML = currencyNameSpan.textContent
            optionSelectedCountryFlag.src = flagImg.src
        })

        countryLi.appendChild(flagImg)
        countryLi.appendChild(currencyNameSpan)

        ul.appendChild(countryLi)
    }

    return ul
}

function revertOptions(){
    const countryDestinyFlag = selectCountryDestiny.getElementsByTagName('img')[0]
    const countryDestinyCurrency = selectCountryDestiny.getElementsByTagName('span')[0]

    const countryOriginFlag = selectCountryOrigin.getElementsByTagName('img')[0]
    const countryOriginCurrency = selectCountryOrigin.getElementsByTagName('span')[0]

    const selectsContent = {
        origin: {
            flag: countryOriginFlag.src,
            currency: countryOriginCurrency.textContent
        },
        destiny: {
            flag: countryDestinyFlag.src,
            currency: countryDestinyCurrency.textContent
        }
    }

    countryOriginFlag.src = selectsContent.destiny.flag
    countryOriginCurrency.innerHTML = selectsContent.destiny.currency

    countryDestinyFlag.src = selectsContent.origin.flag
    countryDestinyCurrency.innerHTML = selectsContent.origin.currency
}

window.addEventListener('DOMContentLoaded', async () => {
    const countries = await api.get('/countries').then(response => response.data)

    for (select of selectsCountry) {
        const ul = populateSelectCountry(countries, select)
        select.appendChild(ul)
    }
})

// EVENTOS //
// SELECT COUNTRY - ORIGEM //
selectCountryOrigin.addEventListener('click', () => {
    const ul = selectCountryOrigin.getElementsByTagName('ul')[0]

    const isSelectOpen = ul.computedStyleMap().get('display')

    if (isSelectOpen.value === 'flex') {
        ul.style.display = 'none'
        chevronSelectCountryOrigin.style.transition = 'all 0.3s'
        chevronSelectCountryOrigin.style.transform = 'rotate(0)'
    } else {
        ul.style.display = 'flex'
        chevronSelectCountryOrigin.style.transition = 'all 0.3s'
        chevronSelectCountryOrigin.style.transform = 'rotate(-90deg)'
        // EVITAR 2 SELECTS ABERTO SIMULTANEAMENTE //
        selectCountryDestiny.getElementsByTagName('ul')[0].style.display = 'none'
        chevronSelectCountryDestiny.style.transition = 'all 0.3s'
        chevronSelectCountryDestiny.style.transform = 'rotate(0)'
    }
})

selectCountryOrigin.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
        const ul = selectCountryOrigin.getElementsByTagName('ul')[0]

        ul.style.display = 'none'
        chevronSelectCountryOrigin.style.transition = 'all 0.3s'
        chevronSelectCountryOrigin.style.transform = 'rotate(0)'
    }
})

selectCountryOrigin.addEventListener('blur', () => {
    const ul = selectCountryOrigin.getElementsByTagName('ul')[0]

    setTimeout(() => {
        ul.style.display = 'none'
        chevronSelectCountryOrigin.style.transition = 'all 0.3s'
        chevronSelectCountryOrigin.style.transform = 'rotate(0)'
    }, 150)
})

selectCountryOrigin.getElementsByTagName('button')[0].addEventListener('blur', (event) => {
    const ul = selectCountryOrigin.getElementsByTagName('ul')[0]

    setTimeout(() => {
        ul.style.display = 'none'
        chevronSelectCountryOrigin.style.transition = 'all 0.3s'
        chevronSelectCountryOrigin.style.transform = 'rotate(0)'
    }, 150)

    event.stopPropagation()
})

// SELECT COUNTRY - DESTINO //
selectCountryDestiny.addEventListener('click', () => {
    const ul = selectCountryDestiny.getElementsByTagName('ul')[0]

    const isSelectOpen = ul.computedStyleMap().get('display')

    if (isSelectOpen.value === 'flex') {
        ul.style.display = 'none'
        chevronSelectCountryDestiny.style.transition = 'all 0.3s'
        chevronSelectCountryDestiny.style.transform = 'rotate(0)'
    } else {
        ul.style.display = 'flex'
        chevronSelectCountryDestiny.style.transition = 'all 0.3s'
        chevronSelectCountryDestiny.style.transform = 'rotate(-90deg)'
        // EVITAR 2 SELECTS ABERTO SIMULTANEAMENTE //
        selectCountryOrigin.getElementsByTagName('ul')[0].style.display = 'none'
        chevronSelectCountryOrigin.style.transition = 'all 0.3s'
        chevronSelectCountryOrigin.style.transform = 'rotate(0)'
    }
})

selectCountryDestiny.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
        const ul = selectCountryDestiny.getElementsByTagName('ul')[0]

        ul.style.display = 'none'
        chevronSelectCountryDestiny.style.transition = 'all 0.3s'
        chevronSelectCountryDestiny.style.transform = 'rotate(0)'
    }
})

selectCountryDestiny.getElementsByTagName('button')[0].addEventListener('blur', (event) => {
    const ul = selectCountryDestiny.getElementsByTagName('ul')[0]

    setTimeout(() => {
        ul.style.display = 'none'
        chevronSelectCountryDestiny.style.transition = 'all 0.3s'
        chevronSelectCountryDestiny.style.transform = 'rotate(0)'
    }, 150)

    event.stopPropagation()
})

revertOptionsButton.addEventListener('click', (event) => {
    event.preventDefault()
    revertOptions()
})
