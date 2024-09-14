const inputFile = document.getElementById('file-input')
const inputFileBox = document.getElementById('file-input-box')
const fileList = document.getElementsByClassName('file-list')[0]

// VARIAVEL GLOBAL 
const MIB_VALUE = 1048576

// FUNÇÃO - Formata o tamanho do arquivo na grandeza correspondente
function formatBytes(sizes) {
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    let index = 0;

    // Dividi por 1024 até encontrar a unidade correta
    while (sizes >= 1024 && index < units.length - 1) {
        sizes /= 1024;
        index++;
    }

    return `${sizes.toFixed(2)} ${units[index]}`;
}

function handleFiles(event) {
    console.log(event)
    const files = event.target.files

    if(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const fileLI = document.createElement('li')
            fileLI.classList.add('file-card')

            const fileImageDiv = document.createElement('div')
            fileImageDiv.classList.add('file-image')
            const fileIcon = document.createElement('img')
            fileIcon.src = './assets/uploading-icon.png'
            fileIcon.alt = "Icone de Arquivo"
            fileImageDiv.appendChild(fileIcon)

            const fileDetailsDiv = document.createElement('div')
            fileDetailsDiv.classList.add('file-details', 'truncate')
            const fileNameP = document.createElement('p')
            fileNameP.textContent = files[i].name || 'Desconhecido'
            const fileSizeSpan = document.createElement('span')
            fileSizeSpan.textContent = "0 Bytes / 0 Bytes"
            
            const fileProgressBarDiv = document.createElement('div')
            fileProgressBarDiv.classList.add('file-progress-bar')
            const progressBar = document.createElement('div')
            progressBar.classList.add('progress-bar')

            const progress = document.createElement('div')
            progress.classList.add('progress')
            progressBar.appendChild(progress)

            const filePercent = document.createElement('span')
            filePercent.classList.add('file-percent')
            filePercent.textContent = '0%'

            fileProgressBarDiv.appendChild(progressBar)
            fileProgressBarDiv.appendChild(filePercent)

            fileDetailsDiv.appendChild(fileNameP)
            fileDetailsDiv.appendChild(fileSizeSpan)
            fileDetailsDiv.appendChild(fileProgressBarDiv)

            fileLI.appendChild(fileImageDiv)
            fileLI.appendChild(fileDetailsDiv)
            
            fileList.appendChild(fileLI)

            // Simular upload do arquivo //
            const xhr = new XMLHttpRequest()
       
            xhr.upload.addEventListener('progress', (e) => {

                console.log(e)
                if(e.lengthComputable) {
                    const percent = (e.loaded / e.total) * 100
                    progress.style.width = `${percent}%`
                    filePercent.textContent = `${percent.toFixed(0)}%`
                    fileSizeSpan.textContent = `
                        ${formatBytes(e.loaded)} / ${formatBytes(e.total)}`
                }

            })
    
            xhr.upload.addEventListener('load', (e) => {
                filePercent.textContent = '100%'
                fileSizeSpan.textContent = formatBytes(e.loaded)
                filePercent.classList.add('success-text')

                progress.classList.add('success-progress')

                fileIcon.src = './assets/uploaded-icon.png'
                fileImageDiv.classList.add('success-bg')
            })
    
            xhr.upload.addEventListener('error', (e) => {
                filePercent.textContent = 'Erro'
                fileSizeSpan.textContent = formatBytes(e.loaded)
                filePercent.classList.add('error-text')

                progress.classList.add('error-progress')
                
                fileIcon.src = './assets/upload-error-icon.png'
                fileImageDiv.classList.add('error-bg')
            })
    
            // Abrir conexão (exemplo de URL para upload)
            xhr.open('POST', '/upload', true)
    
            // Enviar arquivo via FormData
            const formData = new FormData()
            formData.append('file', file)
    
            // Enviar a requisição
            xhr.send(formData)
        }
    }
}

inputFile.addEventListener('change', (event) => handleFiles(event))

inputFileBox.addEventListener('dragover', (event) => {
    event.preventDefault();

    inputFileBox.classList.add('drag-over')
});

inputFileBox.addEventListener('dragleave', (event) => {
    inputFileBox.classList.remove('drag-over')
})


inputFileBox.addEventListener('drop', (event) => {
    event.preventDefault()
    inputFileBox.classList.remove('drag-over')

    const files = event.dataTransfer.files

    handleFiles({target: { files }})
})