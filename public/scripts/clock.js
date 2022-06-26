var time = document.getElementById('time')
var day = document.getElementById('day')
var day_name = document.getElementById('day_name')

function padDigit(number) {
    return number < 10 ? '0' + number : number
}

var d1 = new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' });;
d1 = new Date(d1)
time.innerHTML = padDigit(d1.getHours()) + ':' + padDigit(d1.getMinutes())
day.innerHTML = padDigit(d1.getDate())
day_name.innerHTML = d1.toLocaleString('tr', {weekday:'short'})