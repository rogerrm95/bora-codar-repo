const productImage = document.getElementById('product-image')
const playGifBtn = document.getElementById('play-gif')
const pauseGifBtn = document.getElementById('pause-gif')

playGifBtn.addEventListener('click',function(){
    productImage.setAttribute('src', "./assets/sofa.gif")

    playGifBtn.style.display = 'none'
    pauseGifBtn.style.display = 'block'
})

pauseGifBtn.addEventListener('click',function(){
    productImage.setAttribute('src', "./assets/sofa-image.png")

    playGifBtn.style.display = 'block'
    pauseGifBtn.style.display = 'none'
})