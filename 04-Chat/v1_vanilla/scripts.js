const messageInputBox = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

const messageForm = document.getElementById('message-form')
const inputMessage = document.getElementById('message-input')
const btnSendMessage = document.getElementById('btn-send-message')

const perfilInfo = document.getElementsByClassName('perfil-info')

const chat = document.getElementById('chat')

function sendAMessage(message){
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()

    const messageSentBox = document.createElement('div')
    messageSentBox.className = 'message-sent message-box'

    const spanHead = document.createElement('span')
    spanHead.className = 'head'
    spanHead.innerHTML = `Você - ${hours}:${minutes}`

    const pMessage = document.createElement('p')
    pMessage.className = 'message'
    pMessage.innerHTML = message

    messageSentBox.appendChild(spanHead)
    messageSentBox.appendChild(pMessage)

    const chat = document.getElementById('chat')
    chat.appendChild(messageSentBox)
}

function resetFields(){
    messageInput.value = null
    btnSendMessage.setAttribute('disabled', true)
}

messageInputBox.addEventListener('click', () => {
    messageInput.focus()
})

messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    sendAMessage(inputMessage.value)
    chat.scrollTop = chat.scrollHeight
    
    resetFields()
})

inputMessage.addEventListener('keyup', () => {
    if(inputMessage.value.length > 0) {
        btnSendMessage.removeAttribute('disabled')
   } else {
        btnSendMessage.setAttribute('disabled', true)
   }
})