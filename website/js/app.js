// Cursor


// Get Mouse UI
// window.addEventListener('mousemove', (e) => {
//   document.querySelectorAll('.cursor')[0].style.left = e.pageX;
//   document.querySelectorAll('.cursor')[0].style.top = e.pageY;

//   setTimeout(() => {
//     document.querySelectorAll('.cursor')[0].style.left = e.pageX;
//     document.querySelectorAll('.cursor')[0].style.top = e.pageY;
//   }, 150);
// });



// Scrolling to Game area...

/* document.getElementById('scroll-to.game').addEventListener('click', scrollToGame);

function scrollToSmoothly(pos, time) { */
  /*Time is only applicable for scrolling upwards*/
  /*Code written by hev1*/
  /*pos is the y-position to scroll to (in pixels)*/
 /*  if (isNaN(pos)) {
    throw "Position must be a number";
  }
  if (pos < 0) {
    throw "Position can not be negative";
  }
  var currentPos = window.scrollY || window.screenTop;
  if (currentPos < pos) {
    if (time) {
      var x;
      var i = currentPos;
      x = setInterval(function () {
        window.scrollTo(0, i);
        i += 10;
        if (i >= pos) {
          clearInterval(x);
        }
      }, time);
    } else {
      var t = 10;
      for (let i = currentPos; i <= pos; i += 10) {
        t += 10;
        setTimeout(function () {
          window.scrollTo(0, i);
        }, t / 2);
      }
    }
  } else {
    time = time || 2;
    var i = currentPos;
    var x;
    x = setInterval(function () {
      window.scrollTo(0, i);
      i -= 10;
      if (i <= pos) {
        clearInterval(x);
      }
    }, time);
  }
}
function scrollToDiv() {
  var elem = document.querySelector("div");
  scrollToSmoothly(elem.offsetTop);
}
 */

// Animate Pacman

// Get UI

window.addEventListener('DOMContentLoaded', animatePac);

function animatePac() {
  // Rotate Pacman
  let packy = document.getElementById('packy');
  packy.classList.add('animate-packy');


}
