// FUNÇÃO - MARCAR O MENU ATIVO //
window.document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = {
        "index": "link-boards",
        "teams": "link-people",
        "docs": "link-document",
        "settings": "link-config"
    }

    const pathname = window.location.pathname
    const menu = pathname.split('/').at(-1).split('.')[0]

    const activeMenuLink = document.getElementById(menuLinks[menu])
    activeMenuLink.classList.add('active-link')
})

// FUNÇÃO - ABRIR E FECHAR MENU (NAVBAR) //
function openMenuLink(){
    const navLink = document.getElementsByClassName('navlink')
    const navLinkArray =  Array.from(navLink)

    navLinkArray.forEach(item => {
        item.classList.toggle('show')
        item.classList.toggle('opened')
    })
}

document.getElementById('btn-menu-link').addEventListener('click', openMenuLink)
