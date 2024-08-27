
const btnMenuLink = document.getElementById('btn-menu-link')

btnMenuLink.addEventListener('click', function() {
    const navLink = document.getElementsByClassName('navlink')
    const navLinkArray =  Array.from(navLink)

    navLinkArray.forEach(item => {
        item.classList.toggle('show')
        item.classList.toggle('opened')
    })
})