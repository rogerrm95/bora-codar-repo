// CARD //
const contentDiv = document.getElementById('festival-places-content')

// SELECT INPUT //
const selectLocationInput = document.getElementsByClassName('select')[0]
const ulLocations = document.getElementsByClassName('options')[0]
const seletedOptionSpan = document.getElementById('selected-location')
const chevronIcon = selectLocationInput.getElementsByTagName('img')[1]

const api = axios.create({
    baseURL: 'http://127.0.0.1:3004/'
})

const locationList = []

window.addEventListener('load', async () => {
    const data = await api.get('/locations').then(response => response.data)
    const locationList = data.map(item => {
        return item.name
    })


    for (var i= 0; i<locationList.length; i++) {
        const li = document.createElement('li')

        const optionValue = locationList[i]

        li.innerHTML = optionValue
        li.title = optionValue
        li.value = i

        li.classList.add('option-item')
        li.addEventListener('click', () => {
            seletedOptionSpan.innerHTML=optionValue
            ulLocations.style.display = 'none'
        })
        
        ulLocations.appendChild(li)
    }
})

window.addEventListener('load', async () => {
    const data = await api.get('/places').then(response => response.data)

    if(data.length > 0) {
        const ulCards = document.createElement('ul')
        ulCards.classList.add("list")
        ulCards.id = "card-list"
    
        contentDiv.appendChild(ulCards)
        
        data.map(item => {
            const cardItemLI = document.createElement('li')
            cardItemLI.classList.add('card')

            const placeImageIMG = document.createElement('img')
            placeImageIMG.src = item.placeImageURL
            placeImageIMG.alt = item.name
            cardItemLI.appendChild(placeImageIMG)

            const cardContentDiv = document.createElement('div')
            cardContentDiv.classList.add('card-content')

            const festivalNameP = document.createElement('p')
            festivalNameP.classList.add('title', 'line-clamp-1')
            cardContentDiv.appendChild(festivalNameP)

            const festivalDescriptionP = document.createElement('p')
            festivalDescriptionP.classList.add('description', "line-clamp-3")
            festivalDescriptionP.innerHTML = item.description
            cardContentDiv.appendChild(festivalDescriptionP)

            const cardFooterDiv = document.createElement('div')
            cardFooterDiv.classList.add('card-footer')

            const mapInIcon = document.createElement('img')
            mapInIcon.src = "./assets/icons/map-in.png"
            mapInIcon.alt = "Localizar"
            cardFooterDiv.appendChild(mapInIcon)

            const locationSpan = document.createElement('span')
            locationSpan.innerHTML = item.location
            cardFooterDiv.appendChild(locationSpan)

            cardContentDiv.appendChild(cardFooterDiv)

            cardItemLI.appendChild(cardContentDiv)

            ulCards.appendChild(cardItemLI)
        })
    } else {
        const emptyResultsDiv = document.createElement('div')
        emptyResultsDiv.classList.add('empty-result')

        const messageNoResultsP= document.createElement('p')
        messageNoResultsP.innerHTML = "Nenhum resultado encontrado"

        emptyResultsDiv.appendChild(messageNoResultsP)
        contentDiv.appendChild(emptyResultsDiv)
    }
})

selectLocationInput.addEventListener('click', () => {
    const isSelectOpen = ulLocations.computedStyleMap().get('display')

    if (isSelectOpen.value === 'flex') {
        ulLocations.style.display = 'none'
        chevronIcon.style.transition = 'all 0.3s'
        chevronIcon.style.transform = 'rotate(0)'
    } else {
        ulLocations.style.display = 'flex'
        chevronIcon.style.transition = 'all 0.3s'
        chevronIcon.style.transform = 'rotate(-90deg)'
    }
})

selectLocationInput.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
        ulLocations.style.display = 'none'
        chevronIcon.style.transition = 'all 0.3s'
        chevronIcon.style.transform = 'rotate(0)'
    }
})

selectLocationInput.addEventListener('blur', () => {
    setTimeout(() => {
        ulLocations.style.display = 'none'
        chevronIcon.style.transition = 'all 0.3s'
        chevronIcon.style.transform = 'rotate(0)'
    }, 150)
})