const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text')) ;
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressFull = document.querySelector('#progressFull');
const finalScore = document.querySelector('#finalScore');
const highScoresList = document.querySelector('#highScoresList');
const username1 = document.querySelector('#username1');
const rendertable = document.querySelector('#rendertable');
const apiQuizz = 'http://localhost:3000/api/game';
startgamer();
var avaliableQuestion = [];
var questionCouter = 0;
var score = 0;
var avaliableQuestion = [];
var questionCouter = 0;


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function showToast(title,message,type) {
    toast({
      title: `${title}`,
      message:`${ message}`,
      type: `${type}`,
      duration: 5000
    });
    return toast;
}


function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
}

function deletecookies (){
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.location.replace("/login");

}

function getQuizz (callback){
  fetch(apiQuizz).then(res => {
      try {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res);
        }
      }
      catch (err) {
        console.log(err.message);
      }
    }).then(callback);
}

function startgamer(){
  getQuizz(renderQuizt);
}

function renderQuizt(Quizz){
  if(Quizz == []) return  window.location.replace("/login");
  let questions = Quizz;
  const SCORE_POINTS = 100;
  let max_questions ;

  let currentQuestion = {};
  let acceptingAnswers = true;
  function stagame(){
      questionCouter = 0;
      score = 0;
      avaliableQuestion = [...questions];
      max_questions = (avaliableQuestion.length < 10) ? avaliableQuestion.length - 1 : 9;
      getNewQuestion();
  }
  
  let getNewQuestion = function (){
      if(avaliableQuestion.length === 0 || questionCouter > max_questions){
          localStorage.setItem('mostRecentScore',score);
          return  window.location.replace("/endgame");    
      }
      questionCouter++;
      progressText.innerHTML = `Question ${questionCouter} of ${max_questions+1}`;
      progressFull.style.width = `${(questionCouter/(max_questions+1)) * 100}% `;
  
      const questionIndex = Math.floor(Math.random() * avaliableQuestion.length);
      currentQuestion = avaliableQuestion[questionIndex];
      question.innerText = currentQuestion.question;
      choices.forEach(choice =>{
          const number = choice.dataset['number'];
          choice.innerText = currentQuestion['choice' + number];
      });
  
      avaliableQuestion.splice(questionIndex,1);
      acceptingAnswers = true;
  };
  
  choices.forEach(choice => {
      choice.addEventListener('click', e =>{
          if(!acceptingAnswers) return
  
          acceptingAnswers = false;
          const selectedChoice = e.target;
          const selectedAnswer = selectedChoice.dataset['number'];
  
          let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
  
          if(classToApply === 'correct'){
              incrementScore(SCORE_POINTS);
          }
  
          selectedChoice.parentElement.classList.add(classToApply);
  
          setTimeout(()=>{
              selectedChoice.parentElement.classList.remove(classToApply);
              getNewQuestion();
  
          },1000);
      });
  });
  
  incrementScore = num =>{
      score += num;
      scoreText.innerText = score;
  };
  
  stagame();
}


//Show Highscores
