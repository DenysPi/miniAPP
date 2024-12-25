

// =====================MAIN_FUNCTIONS=========================

$(document).ready(function() {
    
    $('.go-menu').on('click', function () {
      var prev_app = $('.app-container.active');
      toggle_app(prev_app, 'main-menu-container');
    
      var element = document.querySelector('.page_background');
      const background = window.getComputedStyle(element).background;
    
      if (background.includes('url("/static/background2.jpg")')) {
        
      } else {
        $('.page_background').css('background', 'url("/static/background2.jpg")');
        $('#particleCanvas').css('display', 'block')
      }
    });
    $('.instruction-app').on('click', function(){
        var prev_app = $('.app-container.active');
        toggle_app(prev_app, 'instruction-container')
      });
    $('.mines-start').on('click', function(){
        var prev_app = $('.app-container.active');
        toggle_app(prev_app, 'mines-container')
      });
    $('.luckyjet-start').on('click', function(){
        var prev_app = $('.app-container.active');
        toggle_app(prev_app, 'lucky-jet-container')
      });
      $('.brawlpirates-start').on('click', function(){
        $('.page_background').css('background', 'url("/static/landscape.jpg")');
        $('#particleCanvas').css('display', 'none')
        var prev_app = $('.app-container.active');

        toggle_app(prev_app, 'brawl-pirates-container')
      });
    

})

function toggle_app(prev_app, next_app){
    var next_app = $('.'+next_app);
    prev_app.css({'transition':'0.25s'});
    prev_app.css({'opacity':'0'});
    setTimeout(function(){
      prev_app.removeClass('active');
      prev_app.css({'transition':'', 'opacity':''});
  
      next_app.css({'opacity':'0'}).css({'transition':'0.25s'});
      next_app.addClass('active');
  
      next_app.css({'opacity':'1'});
      setTimeout(function(){
        next_app.css({'transition':'', 'opacity':''});
      }, 250);
    }, 250);
}
// =============____MINES____==================

const allowedValues = [1, 3, 5, 7];



$('.increase_button').on('click', function() {
  let currentValue = parseInt($('.number-bombs').text());
  let currentIndex = allowedValues.indexOf(currentValue);

  if (currentIndex < allowedValues.length - 1) {
    $('.number-bombs').text(allowedValues[currentIndex + 1]);
  }
});


$('.decrease_button').on('click', function() {
  let currentValue = parseInt($('.number-bombs').text());
  let currentIndex = allowedValues.indexOf(currentValue);

  // Move to the previous allowed value, if possible
  if (currentIndex > 0) {
    $('.number-bombs').text(allowedValues[currentIndex -1 ]);
  }
});

let caseStars = document.getElementsByClassName('mines_field_cell')

function playSimulation() {
  let stars = 0;
  let arrayStars = [];
  for (let i = 0; i < caseStars.length; i++) {
    caseStars[i].innerHTML = ``; 
  }
  let number_stars = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
  console.log(number_stars)
  while (number_stars > stars) {
    for (let i = 0; i < caseStars.length; i++) {
      if (Math.floor(Math.random() * 8) === 5) {
        if (!arrayStars.includes(i)){
          
          arrayStars.push(i);
          stars += 1;
        }
      }
      if (stars >= number_stars) break; 
    }
  }
  return arrayStars;
}

function oneByone() {
  let time = 0; 
  let arrayStars = playSimulation(); 
  

  
  $('.mines-app-get-signal').css({
    'background': 'linear-gradient(150deg, rgba(106, 17, 203, 0.6) 30%, rgba(37, 117, 252, 0.6) 80%)',
    'transition': 'opacity 2s ease'
  });
  
  arrayStars.forEach((index, i) => {
    setTimeout(() => {
      caseStars[index].innerHTML = `<svg width="64" height="60" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0722 38.6162C14.1225 38.6666 14.1729 38.7673 14.1225 38.8177L11.5528 54.0346C11.2001 56.1005 11.5024 57.8136 12.359 58.8717C12.9636 59.5772 13.8202 59.9299 14.8783 59.9299C15.8861 59.9299 17.0954 59.5772 18.355 58.9221L32.0099 51.7168C32.0603 51.6664 32.1611 51.6664 32.2618 51.7168L45.9167 58.8717C47.1764 59.5268 48.3353 59.8795 49.343 59.8795C50.4011 59.8795 51.2577 59.5268 51.8624 58.8214C52.719 57.8136 53.0213 56.1004 52.6182 53.9842L49.9477 38.7673C49.9477 38.6666 49.9477 38.6162 49.9981 38.5658L61.0328 27.783C62.8467 26.0194 63.6025 24.2055 63.0987 22.7443C62.5948 21.2327 60.932 20.2249 58.4631 19.8722L43.1958 17.7056C43.095 17.7056 43.0447 17.6552 42.9943 17.5544L36.1416 3.7484C35.0331 1.48099 33.5215 0.221313 31.9595 0.221313C30.3975 0.221313 28.9363 1.48099 27.7774 3.7484L20.9752 17.6048C20.9248 17.6552 20.8744 17.7056 20.7736 17.756L5.50637 20.0234C2.98702 20.3761 1.37464 21.4342 0.870769 22.8954C0.366899 24.3567 1.1227 26.1202 2.88625 27.8838H2.93663C2.98702 27.8838 2.98702 27.9341 3.03741 27.9845L14.0722 38.6162Z" fill="#DAA520" stroke="1" stroke-width="1"></path></svg>`;

      
      if (i === arrayStars.length - 1) {
        
        setTimeout(() => {
          isRunning = false;
          $('.mines-app-get-signal').prop('disabled', false);
          $('.mines-app-get-signal').css('background','linear-gradient(150deg, #6a11cb 30%, #2575fc 80%)'); // Reset background color to white
        }, 2000);
      }
    }, time);

    
    time += 700; 
  });
}


isRunning = false
$(document).ready(function() {
  $(".mines-app-get-signal").on('click', function(){
    if (isRunning) return;
    isRunning = true; 
    $('.mines-app-get-signal').prop('disabled', true);

    oneByone(); 
  })
    
  
})
  


// ===================_____LUCKY_JET_____=============================
let predictNum = document.getElementsByClassName('score-game')[0]


let luckyMen = document.getElementById('lucky-men');
let targetNum = null
function progressMenjet() {
  let reachX = 230; 
  const reachY = 70;
  const reachQ = 130

  let currentX = 20; 
  let currentY = 150; 
  let currentQ = 40;

  let speedX = 50; 
  const speedY = 60;
  const speedQ = 60

  // function samePosition(){
  //   reachX = 250
  //   let toAddX = (reachX - currentX) / speedX;
    

  //   currentX += toAddX;
    
  //   luckyMen.style.transform = `translate(${currentX}px, ${currentY}px)`;
  //   progressLineToMen(Math.round(currentX)+10,Math.round(currentY)+65, currentQ)
  //   if (Math.abs(reachX - currentX) >= 1 | Math.abs(reachY - currentY) >= 1) {
      
      
  //     requestAnimationFrame(samePosition); 
  //     }}
    
  function move() {
    $('.line').css('animation', 'line-scroll 3s linear infinite');
    $('.line-v').css('animation', 'line-v-scroll 3s linear infinite');
    let toAddX = (reachX - currentX) / speedX;
    let toAddY = (reachY - currentY) / speedY;
    let toAddQ = (reachQ - currentQ) / speedQ;

    // Increment the current position
    currentX += toAddX;
    currentY += toAddY;
    currentQ += toAddQ

    // Update the position of the element
    luckyMen.style.transform = `translate(${currentX}px, ${currentY}px)`;
    progressLineToMen(Math.round(currentX)+10,Math.round(currentY)+65, currentQ)
    if (Math.abs(reachX - currentX) > 10 | Math.abs(reachY - currentY) > 10) {
      
      requestAnimationFrame(move); 
    } else {
      
        $('.line').css('animation', '');
        $('.line-v').css('animation', '');
      
      
    }
  }

  
  requestAnimationFrame(move);
}




let borderLine = document.getElementById('border-line');
let VolumeLine = document.getElementById('volume-line');


function progressLineToMen(menX, menY ,curve){
  let currentD = borderLine.getAttribute('d');
  let currentV = VolumeLine.getAttribute('d');
  
  let newD =`M 20 250 Q ${curve} 220  ${menX} ${menY}`;
  let newV = `M 20 250 Q ${curve} 220 ${menX} ${menY} L ${menX} 250 L 20 270 Z`

  
  borderLine.setAttribute('d', newD);
  VolumeLine.setAttribute('d', newV)


}




function gameScoreModification(){
  target = 100; 

  let duration = 1000; 
  let startTime = null;
  let number = 1;

  let chance = Math.floor(Math.random() * 15);
  
  // Function to animate the number
  function incrementNum() {
    if (!startTime) startTime = Date.now();
    let elapsedTime = Date.now() - startTime;
    let progress = Math.min(elapsedTime  / duration, 1); 

    number = 1 + (target - 1) * progress
    
    predictNum.innerText = `x${number.toFixed(2)}`;
    if (progress < 1) {
      requestAnimationFrame(incrementNum); 
      
    }else{
      $('#result-jet').text(`x${number.toFixed(2)}`);
      $('#result-jet').css({
        opacity: '1',
        transition:  '0.7s',
    });
      

    }
    
  }

  if (chance === 5 ) {
   
    target = (Math.random() * (15 - 10) + 10).toFixed(2);
    targetNum = target
    duration = 4500
    
    incrementNum();
   
  } else if (chance ===3 || chance ===6) {
    target = (Math.random() * (10-5) + 5).toFixed(2);
    targetNum = target
    duration = 3500
    incrementNum();
    
  } else if (chance ===2 || chance ===7 || chance ===8){
    target = (Math.random() * (5-2) + 2).toFixed(2);
    targetNum = target
    duration= 2500
    incrementNum();
    
  }else{
    target = (Math.random() * (3-1) + 1).toFixed(2);
    targetNum = target
    duration= 2500
    incrementNum();
    
  }

}


$(document).ready(function() {
  $(".luckyJet-app-get-signal").on('click', function(){
    
    $('.luckyJet-app-get-signal').prop('disabled', true);

    progressMenjet()
    gameScoreModification()
    
    
    
  })
    
  
})


// ====================_____BRAWL_PIRATES______=====================

function skeletsArray(){
  ArrayCombination = []
  while (5 > ArrayCombination.length-1){
    let num = Math.floor((Math.random()*(3-0)+0))
    if (ArrayCombination[ArrayCombination.length-1] != num){
      ArrayCombination.push(num)
    }
  }
  return ArrayCombination
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle() {
  var cups = $(".brawl-pirates-field").find('.skeleton');

  // Ensure cups exist before proceeding
  if (cups.length < 2) {
    console.warn("Not enough cups to shuffle.");
    return;
  }

  function shuffleIteration(i) {
    cups.each((index, cup) => {
      const $cup = $(cup); 
      $cup.removeClass('animated-skeleton'); 
      
      // Find all images inside the cup
      const images = $cup.find('img');
      
    
      if (images.length > 1) {
        $(images[1]).remove();
      }
    });
    if (i >= 9) {
      $(".brawl-pirates-field")
      .find('.skeleton')
      .eq(getRandomInt(0, cups.length - 1))
      .addClass('animated-skeleton');
      $(".brawl-pirates-field")
      .find('.animated-skeleton')
      .append('<img class="gem" src="/static/Gem.png" alt="">'); // Appends the gem to each .skeleton
  
      return;
    }
    

    // Select two random, distinct cups
    var cup1 = $(cups[getRandomInt(0, cups.length - 1)]);
    var cup2 = $(cups.not(cup1)[getRandomInt(0, cups.length - 2)]);

    // Stop any ongoing animations
    cup1.stop(false, true);
    cup2.stop(false, true);

    // Obtain offsets
    var cup1Offset = cup1.offset();
    var cup2Offset = cup2.offset();

    // Ensure offsets are valid
    if (!cup1Offset || !cup2Offset) {
      console.warn("Unable to retrieve offsets.");
      return;
    }

    // Switch positions while animating
    cup1.animate(
      { left: '+=' + (cup2Offset.left - cup1Offset.left) }, 
      500
    );
    cup2.animate(
      { left: '+=' + (cup1Offset.left - cup2Offset.left) }, 
      500
    );

    // Call the next iteration after a delay
    setTimeout(() => shuffleIteration(i + 2), 600); // Add a small buffer after animation
  }

  shuffleIteration(0); // Start the iterations
}

$(document).ready(function () {
  $(".brawl-app-get-signal").on('click', shuffle);
  
  
  
});





const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
        }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
        }

    draw() {
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
        }
    }

  function init() {
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
        }
    }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
          if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
                i--;
                particlesArray.push(new Particle());
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();
