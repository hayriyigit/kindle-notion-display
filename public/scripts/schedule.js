const schedule_list = document.getElementById('schedule_list')

function getHourString() {
    const date = new Date()
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
        hour: '2-digit'
    }).slice(0, -1).replace(/\s/g, '')
}

async function getSchedulesFromBackend() {
    const res = await fetch('http://localhost:3000/schedules')
    const data = await res.json()

    return data
}

async function addSchedulesToDom() {
    const data = await getSchedulesFromBackend()
    const currentHourIdx = data.hours.indexOf(getHourString())
    const max_idx = currentHourIdx <= 8 ? currentHourIdx+6 : 15
    for (var i = currentHourIdx; i <= max_idx; i++) {
        li = document.createElement('li')
        li.innerHTML = `<b>${data.hours[i]}</b>${data.todos[i]}`
        schedule_list.appendChild(li)
    }
}

addSchedulesToDom()