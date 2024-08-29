const api = axios.create({
    baseURL: "http://localhost:3004"
})

document.getElementById('btn-menu-link').addEventListener('click', openMenuLink)
document.getElementById('input-search-text').addEventListener('input', (event) => {
    filteredActivities(event.target.value)
})

function openMenuLink(){
    const navLink = document.getElementsByClassName('navlink')
    const navLinkArray =  Array.from(navLink)

    navLinkArray.forEach(item => {
        item.classList.toggle('show')
        item.classList.toggle('opened')
    })
}

function separateActivitiesStatus(activities){
    const pending = activities.filter(activity => activity.status === 'pending')
    const running = activities.filter(activity => activity.status === 'running')
    const completed = activities.filter(activity => activity.status === 'completed')

    return [pending, running, completed]
}

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
        li.innerHTML = `
            <h3>${activity.title}</h3>
            <p class="line-clamp-2">${activity.description}</p>
        `
        const tagsUl = document.createElement('ul')
        tagsUl.id = 'tags'
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

async function getAllActivities(){
    const data = await api.get('/activities').then(response => response.data)
    
    const [pending, running, completed] = separateActivitiesStatus(data)

    populateBoard(pending, 'task-list-pending')
    populateBoard(running, 'task-list-running')
    populateBoard(completed, 'task-list-completed')
}

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

window.document.addEventListener('DOMContentLoaded', async () => {
    await getAllActivities()
})