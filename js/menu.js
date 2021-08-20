

document.addEventListener('DOMContentLoaded', e => {
    console.log('menu.js is connected')

})
let menuDiv = document.getElementById('leftMenu');

let intro =  document.createElement('p');
    intro.textContent = 'Welcome to the classic brick buster game now this version isnt for the slow of hand It starts off at an intermediate to fast pace depending on how you look at it. The 2 player mode is 1 vs 1 with small obstacles in your way'

menuDiv.appendChild(intro);

