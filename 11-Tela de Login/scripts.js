// SCROLL REVEAL CONFIG //
const scrollRevealConfig = {
    interval: 100,
    distance: '100%',
    duration: 1000
}

// FAKE API //
const api = axios.create({
    baseURL: 'http://127.0.0.1:3004/'
})

// CARD //
const contentDiv = document.getElementById('festival-places-content')

// SELECT INPUT //
const selectLocationInput = document.getElementsByClassName('select')[0]
const ulLocations = document.getElementsByClassName('options')[0]
const seletedOptionSpan = document.getElementById('selected-location')
const chevronIcon = selectLocationInput.getElementsByTagName('img')[1]

// SEARCH FORM //
const btnSearchFestivalPlaces = document.getElementById("search-festival-places")
const festivalNameInput = document.getElementById('location')

const locationList = []
const festivalPlacesList = []

// FUNÇÃO - ADICIONAR OS CARDS (FESTIVAIS) EM TELA //
function populateFestivalPlaces(placesList){
    if(placesList.length > 0) {
        const ulCards = document.createElement('ul')
        ulCards.classList.add("list")
        ulCards.id = "card-list"
    
        contentDiv.appendChild(ulCards)
        
        placesList.map(item => {
            const cardItemLI = document.createElement('li')
            cardItemLI.classList.add('card')

            const cardPhoto = document.createElement('div')
            cardPhoto.classList.add('card-photo')

            const placeImageIMG = document.createElement('img')
            placeImageIMG.src = item.placeImageURL
            placeImageIMG.alt = item.name
            cardPhoto.appendChild(placeImageIMG)

            cardItemLI.appendChild(cardPhoto)

            const cardContentDiv = document.createElement('div')
            cardContentDiv.classList.add('card-content')

            const festivalNameP = document.createElement('p')
            festivalNameP.classList.add('title', 'line-clamp-1')
            festivalNameP.innerHTML = item.name
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

            ScrollReveal().reveal('.card', scrollRevealConfig)
        })
    } else {
        const emptyResultsDiv = document.createElement('div')
        emptyResultsDiv.classList.add('empty-result')

        const messageNoResultsP= document.createElement('p')
        messageNoResultsP.innerHTML = "Nenhum resultado encontrado"

        emptyResultsDiv.appendChild(messageNoResultsP)
        contentDiv.appendChild(emptyResultsDiv)
    }
}

// EVENTO - CARREGAR AS OPÇÕES DE LOCALIDADE E ADICIONAR AO SELECT //
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

// EVENTO - CARREGAR OS DADOS DA API //
window.addEventListener('load', async () => {
    const data = await api.get('/places').then(response => response.data)
    festivalPlacesList.push(...data)

    populateFestivalPlaces(festivalPlacesList)
})

// EVENTO - SCROLL REVEAL AO CARREGAR PÁGINA //
window.addEventListener('load', () => {
    ScrollReveal().reveal('#container')
})

// GET - FESTIVAL PLACES - SEARCH FORM //
btnSearchFestivalPlaces.addEventListener("click", (event) => {
    event.preventDefault()

    const seletedOption = seletedOptionSpan.innerHTML
    const festivalName = festivalNameInput.value

    let newFestivalPlaces = []

    if(seletedOption) {
        const filteredList = festivalPlacesList.filter(item => item.location === seletedOption)
        newFestivalPlaces = [...filteredList]
    }

    if(festivalName) {
        const filteredList = newFestivalPlaces.filter(item => item.name.includes(festivalName))
        newFestivalPlaces = [...filteredList]
    }
    
    const child = contentDiv.children
    child[1].remove()

    populateFestivalPlaces(newFestivalPlaces)
})

// SELECT EVENT'S //
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
