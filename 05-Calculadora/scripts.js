const expressionTagSpan = document.getElementById('display-expression')
const displayResultTagDiv = document.getElementById('display-result')
const resultTagP = displayResultTagDiv.getElementsByTagName('p')[0]

// BOTÕES //
const btnClear = document.getElementsByName('C')[0]
btnClear.addEventListener('click', () => clear())

const btnCalculator = document.getElementsByName('=')[0]
btnCalculator.addEventListener('click', () => calculateOperation())

let values = [0,0]
let operationSignal = null

function addDigit(digit){
    if(!operationSignal) {
        values[0] = Number(values[0]) === 0 ? digit : String(values[0]) + String(digit)

        resultTagP.innerHTML = values[0]
    } else {
        values[1] = Number(values[1]) === 0 ? digit : String(values[1]) + String(digit)
        resultTagP.innerHTML = values[1]
    }
}

function addOperation(operation){
    if(!operationSignal){
        operationSignal = operation
        expressionTagSpan.innerHTML = `${values[0]} ${operationSignal}`
    }
}

function cancelEntry(){}


function divisionOperation(a, b){
    //DIVISÃO POR 0 //
     if(b === 0) {
        return resultTagP.innerHTML = "Error"
    }

    const result = parseFloat((a / b).toFixed(12))
    
    // LIMITA O TAMANHO DO NÚMERO EXIBIDO //
    if(String(result).length > 14) {
        return String(result).slice(0, 14)       
    }

    return result
}

function calculateOperation(){

    if(!operationSignal) return

    let result = 0

    switch(operationSignal) {
        case '/':
            result = divisionOperation(values[0], values[1])
            resultTagP.innerHTML = result
            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`
            values[0] = result
            break;
        case '+':
            result = values[0] + values[1]
            resultTagP.innerHTML = result
            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`
            values[0] = result
            break;
        case '-':
            result = values[0] - values[1]
            resultTagP.innerHTML = result
            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`
            values[0] = result
            break;
        case 'x':
            result = values[0] * values[1]
            resultTagP.innerHTML = result
            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`
            values[0] = result
            break;
        default: 
            break;
    }
}

function clear(){
    values = [0,0]
    operationSignal=null

    expressionTagSpan.innerHTML = 0
    resultTagP.innerHTML = 0
}

