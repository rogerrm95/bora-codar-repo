const api = axios.create({
    baseURL: "http://localhost:3004"
})

document.getElementById('input-search-text').addEventListener('input', (event) => {
    filteredActivities(event.target.value)
})

// FUNÇÃO - SEPARAR AS ATIVIDADES POR STATUS //
function separateActivitiesStatus(activities){
    const pending = activities.filter(activity => activity.status === 'pending')
    const running = activities.filter(activity => activity.status === 'running')
    const completed = activities.filter(activity => activity.status === 'completed')

    return [pending, running, completed]
}

// FUNÇÃO - POPULAR OS BOARDS COM AS ATIVIDADES //
function populateBoard(activities, boardId){
    const board = document.getElementById(boardId)

    if (activities.length === 0){
        const li = document.createElement('li')
        li.classList.add('empty-board')
        li.innerHTML = '<span>Lista vazia</span>'

        board.appendChild(li)
        return
    }

    activities.forEach(activity => {
        const li = document.createElement('li')
        li.classList.add('task')
        li.draggable = true
        li.id = activity.id
        li.innerHTML = `
            <h3>${activity.title}</h3>
            <p class="line-clamp-2">${activity.description}</p>
        `

        li.addEventListener('dragstart', dragTaskStart)

        const tagsUl = document.createElement('ul')
        tagsUl.classList.add('tag-list')

        for (const tag of activity.tags){
            const tagLi = document.createElement('li')
            tagLi.classList.add('tag-item')
            tagLi.innerHTML = `<span>${tag}</span>`

            tagsUl.appendChild(tagLi)
        }

        li.appendChild(tagsUl)
        board.appendChild(li)
    })
}

// FUNÇÃO - CARREGAR ATIVIDADES //
async function getAllActivities(){
    const data = await api.get('/activities').then(response => response.data)
    
    const [pending, running, completed] = separateActivitiesStatus(data)

    populateBoard(pending, 'task-list-pending')
    populateBoard(running, 'task-list-running')
    populateBoard(completed, 'task-list-completed')
}

// FUNÇÃO - ATUALIZAR STATUS (ATIVIDADE) //
async function updateTaskStatus(activityId, status){
    await api.patch(`/activities/${activityId}`, { status })
}

// FUNÇÃO - FILTRAR ATIVIDADES //
function filteredActivities(value){
    const text = value.toLowerCase()

    const tasks = document.querySelectorAll('.task')

    tasks.forEach(task => {
        const h3 = task.querySelector('h3').textContent.toLocaleLowerCase()
        const p = task.querySelector('p').textContent.toLocaleLowerCase()
        
        if (h3.includes(text) || p.includes(text)){
            task.classList.remove('hidden')           
        } else {
            task.classList.add('hidden')
        }
    })
}

// FUNÇÃO DRAG //
function dragTaskStart(event){
    event.dataTransfer.setData('text/plain',event.target.id)
}

// FUNÇÃO DRAGOVER //
function dragOver(event){
    event.preventDefault();
}

// FUNÇÃO DROP //
async function dropTask(event){
    const targetColumn = event.target.closest('.task-list');
    
    if (targetColumn) {
        const id = event.dataTransfer.getData('text/plain');
        const task = document.getElementById(id);

        targetColumn.appendChild(task);

        // Capturando o status da Task e atualizando o dado no Banco //
        const status = targetColumn.id.split('-')[2]
        await updateTaskStatus(id ,status)
    }
}

const columns = document.querySelectorAll('.task-list');
columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', dropTask);
});

// FUNÇÃO CARREGAR ATIVIDADES AUTOMATICAMENTE AO CARREGAR A PÁGINA //
window.document.addEventListener('DOMContentLoaded', async () => {
    await getAllActivities()
})