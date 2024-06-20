const btnTestPrimary = document.getElementsByName('btn-test-primary')
const btnTestTertiary = document.getElementsByName('btn-test-tertiary')

btnTestPrimary[0].addEventListener('click', function (event) {
    this.innerHTML = 'LOADING...'
    this.disabled = true

    new Promise (() => {
        setTimeout(() => {
            this.innerHTML = 'INTERAJA COMIGO'
            this.disabled = false

            alert('Carregamento finalizado!')
        }, 4000)
    })
})
