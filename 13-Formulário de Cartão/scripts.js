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

// INPUT - NUMERO DO CARTÃO //
inputCardNumber.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, '');
    
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    e.target.value = formattedValue;

    if(formattedValue.length > 0) {
        spanCardNumber.innerHTML = formattedValue.trim();
        spanCardNumber.classList.remove('text-empty');
    } else {
        spanCardNumber.innerHTML = "**** **** **** ****";
        spanCardNumber.classList.add('text-empty');
    }
})

// INPUT - NOME DO TITULAR //
inputUserCardName.addEventListener('input', (e) => {
    const value = e.target.value;

    if(value.length > 0 ) {
        spanUserCardName.innerHTML = value
        spanUserCardName.classList.remove('text-empty')
    } else {
        spanUserCardName.innerHTML = "Seu nome aqui"
        spanUserCardName.classList.add('text-empty')
    }
})

// INPUT - VALIDADE DO CARTÃO //
inputUserCardValidity.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
  
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
    spanCardValidity.innerHTML = value;
});

inputUserCardValidity.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        let value = e.target.value;

        if (value.length === 3) {
            e.target.value = value.slice(0, -1);
            spanCardValidity.innerHTML = value;
        }
    }
});

inputUserCardValidity.addEventListener('blur', (e) => {
    const value = e.target.value;
    const month = value.split('/')[0]
    const year = value.split('/')[1]

    const yearActually = new Date().getFullYear().toString().slice(2)

    if(month > 12 || yearActually > year ) {
        inputUserCardValidity.classList.add('input-invalid')
    } else {
        inputUserCardValidity.classList.remove('input-invalid')
    }

    if (value.length === 0) {
        spanCardValidity.innerHTML = "**/**";
    }
})

// INPUT - CÓDIGO VERIFICADOR - CVV //
inputUserCardCode.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, '');

    if (value.length > 3) {
        inputUserCardCode.value = value.substring(0,3)
    }
})

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

        buttonSubmit.disabled = !allFilled
    })
})