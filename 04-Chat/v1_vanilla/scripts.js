const messageInputBox = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

const messageForm = document.getElementById('message-form')
const inputMessage = document.getElementById('message-input')
const btnSendMessage = document.getElementById('btn-send-message')

const perfilInfo = document.getElementsByClassName('perfil-info')[0]

const chat = document.getElementById('chat')

function sendAMessage(message){
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
    const time = `${hours}:${minutesFormatted}`

    const messageSentBox = document.createElement('div')
    messageSentBox.className = 'message-sent message-box'

    const spanHead = document.createElement('span')
    spanHead.className = 'head'
    spanHead.innerHTML = `Você - ${time}`

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

window.onload = () => {
    const onlineUserStatus = navigator.onLine

    const spanStatusUser = document.createElement('span')
    perfilInfo.appendChild(spanStatusUser)
   
    if (onlineUserStatus) {
        perfilInfo.children[1].setAttribute('online', true)
        perfilInfo.children[1].innerHTML='Online'
    } else {
        perfilInfo.children[1].setAttribute('offline', true)
        perfilInfo.children[1].innerHTML='Offline'
    }
}
