const inputUserCardValidity = document.getElementById('user-card-validity')
const spanCardValidity = document.getElementById('card-validity')

const inputCardNumber = document.getElementById('user-card-number')
const sectionCardNumber = document.getElementsByClassName('card-number')[0]
const spanCardNumber = sectionCardNumber.children[0]

const inputUserCardName = document.getElementById('user-card-name')
const spanUserCardName = document.getElementById('card-username')

const inputUserCardCode = document.getElementById('user-card-code')

const buttonSubmit = document.getElementById('btn-submit')
const inputs = document.querySelectorAll('.input-box input')

// FUNÇÃO PARA ELIMINAR ELEMENTOS COM BASE NO ID //
function removeElementById(elementId) {
    const element = document.getElementById(elementId)

    if(element) element.remove()     
}

// FUNÇÃO PARA DESCOBRIR A BANDEIRA DO CARTÃO COM BASE NA NUMERAÇÃO //
function getFlagCard(cardNumber){
    // Bandeiras Aceitas //
    const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercard = /^5[1-5][0-9]{14}$/;
    const elo = /^((509091)|([5067]{4})|([6362]{4}))/;

    // Testando numeração //
    if (visa.test(cardNumber)) return 'visa'
    if (mastercard.test(cardNumber)) return 'mastercard'
    if (elo.test(cardNumber)) return 'elo'

    return null
}

// INPUT - NUMERO DO CARTÃO //
inputCardNumber.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, '');
    
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = formattedValue;

    // Define a bandeira do cartão //
    const cardFlag = getFlagCard(value)
    const cardFlagImg = document.getElementById('card-flag')
    cardFlagImg.src = `./assets/${cardFlag ? cardFlag : 'credit-card'}-icon.png`

    if(formattedValue.length > 0) {
        spanCardNumber.innerHTML = formattedValue.trim();
        spanCardNumber.classList.remove('text-empty');
    } else {
        spanCardNumber.innerHTML = "**** **** **** ****";
        spanCardNumber.classList.add('text-empty');
    }
})

// Valida a numeração do cartão //
inputCardNumber.addEventListener('blur', (e) => {
    const value = e.target.value

    if(value.length < 19) {
        inputCardNumber.classList.add('input-invalid')

        const warningIcon = document.createElement('img')
        warningIcon.src = './assets/warning-icon.png'
        
        const spanInvalidText = document.createElement('span')
        spanInvalidText.textContent = 'Numeração inválida'
        spanInvalidText.classList.add('text-invalid')
        spanInvalidText.id = "card-number-invalid"

        spanInvalidText.insertAdjacentElement('afterbegin', warningIcon)

        inputCardNumber.parentElement.appendChild(spanInvalidText)

    } else {
        inputCardNumber.classList.remove('input-invalid')
    }
})

// Limpa o erro no input ao receber o foco  //
inputCardNumber.addEventListener('focus', () => {
    removeElementById('card-number-invalid')
})

// INPUT - NOME DO TITULAR //
inputUserCardName.addEventListener('input', (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    e.target.value = value;

    if(value.length > 0 ) {
        spanUserCardName.innerHTML = value
        spanUserCardName.classList.remove('text-empty')
    } else {
        spanUserCardName.innerHTML = "Seu nome aqui"
        spanUserCardName.classList.add('text-empty')
    }
})

// Valida o nome impresso no cartão //
inputUserCardName.addEventListener('blur', (e) => {
    const value = e.target.value

    if(value.length > 0 && value.length <= 2) {
        inputUserCardName.classList.add('input-invalid')

        const warningIcon = document.createElement('img')
        warningIcon.src = './assets/warning-icon.png'
        
        const spanInvalidText = document.createElement('span')
        spanInvalidText.textContent = 'Mínimo de caracteres: 3'
        spanInvalidText.classList.add('text-invalid')
        spanInvalidText.id = "user-name-invalid"

        spanInvalidText.insertAdjacentElement('afterbegin', warningIcon)

        inputUserCardName.parentElement.appendChild(spanInvalidText)

    } else {
        inputUserCardName.classList.remove('input-invalid')
    }
})

// Limpa o erro no input ao receber o foco  //
inputUserCardName.addEventListener('focus', () => {
    removeElementById('user-name-invalid')
})

// INPUT - VALIDADE DO CARTÃO //
inputUserCardValidity.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
 
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
        spanCardValidity.classList.remove('text-empty')
    } else {
        spanCardValidity.innerHTML = "** / **"
        spanCardValidity.classList.add('text-empty')
    }

    e.target.value = value;
    spanCardValidity.innerHTML = value;
});

// Remove a barra de separador ao digitar //
inputUserCardValidity.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        let value = e.target.value;

        if (value.length === 3) {
            e.target.value = value.slice(0, -1);
            spanCardValidity.innerHTML = value;
        }
    }
});

// Valida a data de validade do cartão //
inputUserCardValidity.addEventListener('blur', (e) => {
    const value = e.target.value;
    const month = Number(value.split('/')[0])
    const year = Number(value.split('/')[1])

    const yearActually = new Date().getFullYear().toString().slice(2)

    if(month > 12 || yearActually > year || !year) {
        inputUserCardValidity.classList.add('input-invalid')

        const warningIcon = document.createElement('img')
        warningIcon.src = './assets/warning-icon.png'
        
        const spanInvalidText = document.createElement('span')
        spanInvalidText.textContent = 'Data inválida'
        spanInvalidText.classList.add('text-invalid')
        spanInvalidText.id = "data-invalid"

        spanInvalidText.insertAdjacentElement('afterbegin', warningIcon)

        inputUserCardValidity.parentElement.appendChild(spanInvalidText)
    } else {
        inputUserCardValidity.classList.remove('input-invalid')
    }

    if (value.length === 0) {
        spanCardValidity.innerHTML = "**/**";
    }
})

// Limpa o erro no input ao receber o foco  //
inputUserCardValidity.addEventListener('focus', () => {
    removeElementById('data-invalid')
})

// INPUT - CÓDIGO VERIFICADOR - CVV //
inputUserCardCode.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, '');

    if (value.length > 3) {
        inputUserCardCode.value = value.substring(0,3)
    }
})

// Valida Código CVV //
inputUserCardCode.addEventListener('blur', (e) => {
    const value = e.target.value;

    
    if (value.length > 0 && value.length !== 3) {
        inputUserCardCode.classList.add('input-invalid')  
        
        const warningIcon = document.createElement('img')
        warningIcon.src = './assets/warning-icon.png'
        
        const spanInvalidText = document.createElement('span')
        spanInvalidText.textContent = 'Código inválido'
        spanInvalidText.classList.add('text-invalid')
        spanInvalidText.id = "cvv-invalid"

        spanInvalidText.insertAdjacentElement('afterbegin', warningIcon)

        inputUserCardCode.parentElement.appendChild(spanInvalidText)
    } else {
        inputUserCardCode.classList.remove('input-invalid')
    }
})

// Limpa o erro no input ao receber o foco //
inputUserCardCode.addEventListener('focus', () => {
    removeElementById('cvv-invalid')
})

// Verifica se todos os inputs estão preenchidos e não possuem erros //
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

        const inputsError = document.getElementsByClassName('input-invalid')
        const hasInputError = inputsError.length > 0 ?? false
        
        buttonSubmit.disabled = !allFilled || hasInputError
    })
})

buttonSubmit.addEventListener('click', () => {
    alert("Cartão adicionado!")
})