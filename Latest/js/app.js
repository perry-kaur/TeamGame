
// Animate Pacman

// Get UI

window.addEventListener('DOMContentLoaded', animatePac);

function animatePac() {
  // Rotate Pacman
  let packy = document.getElementById('packy');
  packy.classList.add('animate-packy');
}


// Game info Modal

// Get UI Elements
let modal = document.getElementById('info-modal'),
    trigger = document.getElementById('info-trigger'),
    closeBtn = document.getElementById('close-modal');

// Event Listeners
trigger.addEventListener('click', () => {
  modal.classList.add('show-modal');
})

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

window.addEventListener('click', () => {
  if(event.trigger === modal) {
    modal.classList.toggle('show-modal')
  }
});


/*********************************
 *                              **
 * Fontawesome Icon animations  **
 *                              **
 * *******************************/ 

// Lives
function heartBeat() {
  let heart = document.getElementById('lives-icon');
  // add icon class of full heart
  heart.classList.add('fa-heart');

  // toggle between heart beats
  setTimeout(() => {
    heart.classList.toggle('fa-heartbeat');
  }, 1000);
}

// Call the function
heartBeat();

// create repetition
setInterval(heartBeat, 2000);

// Scores
function fillStar() {
  let star = document.getElementById('score-icon');
  star.classList.add('fa-star');

  setTimeout(() => {
    star.classList.toggle('fa-star-half-alt');
  },1000);
}

fillStar();

setInterval(fillStar, 2000);

