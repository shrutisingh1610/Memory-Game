const cards = document.querySelectorAll(".memory-card");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");
const restart = document.querySelector(".restart");
const move = document.querySelector(".moves");
const stars = document.querySelector(".stars").children;
const playagain = document.querySelector(".play-again");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const modalStars = document.querySelector(".modal-stars").children;
const time = document.querySelector("#total-time");
const comment = document.querySelector(".comment");
var count = 0;
var isFlipped = false;
var firstCard;
var secondCard;
var score = 0,
  mins = 0,
  secs = 0,
 Interval;
var moves = 0;

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  count++;
if (count == 1) {
  startTimer();
}
this.classList.add("flip");
if (!isFlipped) {
  isFlipped = true;
  firstCard = this;
  firstCard.removeEventListener("click", flip);
} else {
  secondCard = this;
  checkIt();
}
}
function startTimer() {
  Interval = setInterval(() => {
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
    if (secs <= 9) {
      second.innerHTML = "0" + secs;
    } else {
      second.innerHTML = secs;
    }
    if (mins <= 9) {
      minute.innerHTML = "0" + mins;
    } else {
      minute.innerHTML = mins;
    }
  }, 1000);
}

function checkIt() {
    moves++;
  move.innerHTML = moves;
  if( moves > 11) {
    stars[2].style.color = "black";
  }
  if (moves > 16) {
    stars[1].style.color = "black";
  }
  if (moves > 21) {
    stars[0].style.color = "black";
  }

  if (firstCard.dataset.image  === secondCard.dataset.image) {
    score++;
    success();
  } else {
    fail();
  }
}

function success() {
  secondCard.removeEventListener("click", flip);
  if (score == 8) {
    modal.style.display = "block";
    displayModal();

    clearInterval(Interval);
  } 

  reset();
}


function fail() {
  setTimeout(() => {
    firstCard.addEventListener("click", flip);
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
}

function reset() {
  isFlipped = false;
  firstCard = null;
  secondCard = null;
}
function displayModal() {
  if (moves < 11) {
    modalStars[0].style.display = "inline";
    modalStars[1].style.display = "inline";
    modalStars[2].style.display = "inline";
    comment.innerHTML = "Perfect!";
  }else if (moves <=16) {
    modalStars[2].style.display = "none";
    modalStars[0].style.display = "inline";
    modalStars[1].style.display = "inline";
    comment.innerHTML = "Good";
  }
  else if (moves <=21) {
    modalStars[2].style.display = "none";
    modalStars[0].style.display = "inline";
    modalStars[1].style.display = "none";
    comment.innerHTML = "You can do Better!";
  } 
  else if (moves >21) {
    modalStars[2].style.display = "none";
    modalStars[0].style.display = "none";
    modalStars[1].style.display = "none";
    comment.innerHTML = "Eat Almonds! Try Again";
  } 

  time.innerHTML = mins + ":" + secs;
}

(function shuffle() {
  cards.forEach((card) => {
    var index = Math.floor(Math.random() * 16);
    card.style.order = index;
  });
})();
 
restart.addEventListener("click", () => {
  reset();
  location.reload();
});
playagain.addEventListener("click", () => {
  reset();
  clearInterval(Interval);
  location.reload();
});
close.addEventListener("click", () => {
  modal.style.display = "none";
});
