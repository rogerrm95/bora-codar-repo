const player = document.getElementById('music-playing')
const durationMusic = document.getElementById('music-duration')
const currentDuration = document.getElementById('current-duration')

const progressBar = document.getElementById('bar')

const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')

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

player.addEventListener('timeupdate',function(){
    let minutes = parseInt(player.currentTime / 60) % 60
    let seconds = parseInt(player.currentTime % 60)

    minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
    secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

    const durationFormatted = `${minutesFormatted}:${secondsFormatted}`
    
    currentDuration.innerHTML = durationFormatted

    const widthProgressBar = (player.currentTime / player.duration) * 100
    
    progressBar.style.width = `${widthProgressBar}%`
},false);

