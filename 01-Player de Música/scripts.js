const player = document.getElementById('music-playing')
const durationMusic = document.getElementById('music-duration')
const currentDuration = document.getElementById('current-duration')

const progressBar = document.getElementById('progress-bar')
const bar = document.getElementById('bar')

const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')

function formattedSecondToMinutes(current) {
    let minutes = parseInt(current / 60) % 60
    let seconds = parseInt(current % 60)

    minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
    secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

    return `${minutesFormatted}:${secondsFormatted}`
}

playButton.addEventListener('click', () => {
    player.play()

    playButton.style.display = 'none'
    pauseButton.style.display = 'block'

    let minutes = parseInt(player.duration / 60) % 60
    let seconds = parseInt(player.duration % 60)

    minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
    secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

    const durationFormatted = `${minutesFormatted}:${secondsFormatted}`

    durationMusic.innerHTML = durationFormatted
})

pauseButton.addEventListener('click', () => {
    player.pause()

    playButton.style.display = 'block'
    pauseButton.style.display = 'none'
})

// Atualiza o tempo de áudio (Formatado) //
player.addEventListener('timeupdate',function(){
    currentDuration.innerHTML = formattedSecondToMinutes(player.currentTime)

    const widthProgressBar = (player.currentTime / player.duration) * 100
    
    bar.style.width = `${widthProgressBar}%`
},false)

// Resetar Player //
player.addEventListener("ended", function(){
    pauseButton.style.display='none'
    playButton.style.display='block'

    bar.style.width='0%'
    currentDuration.innerHTML = formattedSecondToMinutes(0)
})

// Incrementa ou Decrementa o tempo do áudio em 5s //
progressBar.addEventListener('focus', function(){
    document.addEventListener("keydown", function(event){
        
        if(event.key === 'ArrowLeft') {
            player.pause()
            player.currentTime -= 5

            currentDuration.innerHTML = formattedSecondToMinutes(player.currentTime)

            const widthProgressBar = (player.currentTime / player.duration) * 100
    
            bar.style.width = `${widthProgressBar}%`
        }

        if(event.key === 'ArrowRight') {
            player.pause()
            player.currentTime += 5

            currentDuration.innerHTML = formattedSecondToMinutes(player.currentTime)

            const widthProgressBar = (player.currentTime / player.duration) * 100
    
            bar.style.width = `${widthProgressBar}%`
        }
    })

    document.addEventListener("keyup", function(event){
        if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){
            player.play()
        }
    })
})