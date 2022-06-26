var time = document.getElementById('time')
var day = document.getElementById('day')
var day_name = document.getElementById('day_name')

var d1 = new Date();

time.innerHTML = d1.getHours() + ':' + d1.getMinutes()
day.innerHTML = d1.getDate()
day_name.innerHTML = d1.toLocaleString('tr', {weekday:'short'})