const expressionTagSpan = document.getElementById('display-expression')
const displayResultTagDiv = document.getElementById('display-result')
const resultTagP = displayResultTagDiv.getElementsByTagName('p')[0]

// VARIAVEIS //
let values = [0,0]
let operationSignal = null

// BOTÃO , (VÍRGULA) //
function addDecimal(){
    if(!operationSignal) {
        const isDecimal = String(values[0]).includes('.')

        if(!isDecimal) {
            values[0] = Number(values[0]) === 0 ? `0.` : String(values[0]) + `.`
            resultTagP.innerHTML = values[0]    
        }

        return
    } else {
        const isDecimal = String(values[1]).includes('.')

        if(!isDecimal) {
            values[1] = Number(values[1]) === 0 ? `0.` : String(values[1]) + `.`
            resultTagP.innerHTML = values[1] 
        }

        return
    }
}

// BOTÕES NÚMERICOS //
function addDigit(digit){
    if(!operationSignal) {
        values[0] = values[0] === 0 ? digit : String(values[0]) + String(digit)
        resultTagP.innerHTML = values[0]
    } else {
        values[1] = values[1] === 0 ? digit : String(values[1]) + String(digit)
        resultTagP.innerHTML = values[1]
    }
}

// BOTÕES DE OPERAÇÕES (+ - x /) //
function addOperation(operation){
    if(operation){
        values[1] = 0
    }

    operationSignal = operation
    expressionTagSpan.innerHTML = `${values[0]} ${operationSignal}`
}


// BOTÃO CE - CANCELAR ENTRADA //
function cancelEntry(){
    if(!operationSignal) {
        values[0] = 0
    } else {
        values[1] = 0
    }

    resultTagP.innerHTML = 0
}

// FUNÇÃO - REALIZAR DIVISÃO DE VALORES //
function divisionOperation(a, b){
    //DIVISÃO POR 0 //
     if(b === 0) {
        return null
    }

    const result = parseFloat((a / b).toFixed(12))
    
    // LIMITA O TAMANHO DO NÚMERO EXIBIDO //
    if(String(result).length >= 14) {
        return String(result).slice(0, 12)       
    }
    
    return result
}


// BOTÃO = (IGUAL) //
function calculateOperation(){

    if(!operationSignal) return

    let result = 0

    switch(operationSignal) {
        case '/':
            result = divisionOperation(values[0], values[1])
            console.log(result)
            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`
            
            if(!result) {
                alert('Não é possivel dividir por zero')
                return clear()
            }

            if(String(result) >= 14){
                return resultTagP.innerHTML = String(result).slice(0, 12)
            }

            resultTagP.innerHTML = result
            values[0] = result
            values[1] = 0
            break;
        case '+':
            result = Number(values[0]) + Number(values[1])
            resultTagP.innerHTML = result

            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`

            values[0] = result
            values[1] = 0
            break;
        case '-':
            result = values[0] - values[1]
            resultTagP.innerHTML = result

            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`

            values[0] = result
            values[1] = 0
            break;
        case 'x':
            result = values[0] * values[1]
            resultTagP.innerHTML = result

            expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`

            values[0] = result
            values[1] = 0
            break;
        default: 
            expressionTagSpan.innerHTML = "Error"
            clear()
            break;
    }
}

// BOTÃO % - PERCENTUAL //
function calculatePercentual(){
    if(operationSignal !== "x") {
        return clearDisplay()
    }

    values[1] = values[1] / 100
    resultTagP.innerHTML = values[1]
    expressionTagSpan.innerHTML = `${values[0]} ${operationSignal} ${values[1]}`
}

// BOTÃO C - LIMPAR //
function clearDisplay(){
    values = [0,0]
    operationSignal=null

    expressionTagSpan.innerHTML = 0
    resultTagP.innerHTML = 0
}

// BOTÃO +/- //
function plusAndMinius(){
    if(!operationSignal) {
        values[0] = values[0] * (-1)
        resultTagP.innerHTML = values[0]
    } else {
        values[1] = values[1] * (-1)
        resultTagP.innerHTML = values[1]
    }   
}
