const habits_list = document.getElementById('habits_list')
const goals_list = document.getElementById('goals_list')
const todos_list = document.getElementById('todos_list')


async function getOthersFromBackend() {
    const res = await fetch('https://kindle-notion-display.vercel.app/others')
    const data = await res.json()

    return data
}

async function addOthersToDom() {
    const { goals, habits, todos } = await getOthersFromBackend()

    goals.forEach(item => {
        li = document.createElement('li')
        li.style.cssText = 'list-style-type:none'
        li.innerHTML = item
        goals_list.appendChild(li)
    });
    habits.forEach(item => {
        li = document.createElement('li')
        li.style.cssText = 'list-style-type:upper-roman'
        li.innerHTML = item
        habits_list.appendChild(li)
    });
    todos.forEach(item => {
        const { text, checked } = item
        const icon = checked ? '<i class="fa-regular fa-square-check"></i>'
            : '<i class="fa-regular fa-square"></i>'

        li = document.createElement('li')
        li.style.cssText = 'list-style-type:none'
        li.innerHTML = `${icon} ${text}`
        todos_list.appendChild(li)
    });
}

addOthersToDom()