const startBtn = document.querySelector(".start-btn ");
const infoBox = document.querySelector(".info-box");
const quitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const optionList = document.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer-sec");
const timeLine = quizBox.querySelector(".time-line");
const timeText = quizBox.querySelector(" .time-text");


//When startquiz button is clicked
startBtn.addEventListener('click', () =>{
     infoBox.classList.add("activeInfo");  //show the info box
} );

//When  quit button clicked
quitBtn.addEventListener('click', ()=>{
    infoBox.classList.remove("activeInfo");// hide the info box
});

 //WHEN continue button clicked
    continueBtn.addEventListener('click', ()=>{
       infoBox.classList.remove("activeInfo");  // hide infoBox
       quizBox.classList.add("activeQuiz");  // show the quizbox
       showQuestions(0);
       queCounter(1);
       startTimer(15);
       startTimerLine(0);
       timeText.textContent = "Time left";
    });
    
//Setting initial counts
let queCount = 0;
let queNumb = 1;
let counter ;
let timeValue = 15;
let widthValue = 0;
let userScore =0; 
let counterLine ;

// Selectors
const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

//QuitQuiz button function

quitQuiz.onclick = () =>{
   window.location.reload();
};

// restart quiz button function
restartQuiz.onclick =()=>{
    resultBox.classList.remove("activeResult");
    quizBox.classList.add("activeQuiz");
    let queCount = 0;
    let queNumb = 1;
    let timeValue = 15;
    let widthValue = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
   startTimerLine(widthValue);
   nextBtn.style.display ="none";

};

//when next button is clicked
nextBtn.onclick =()=>{
    if(queCount < questions.length - 1){
        queNumb++;
        queCount++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
       startTimerLine(widthValue);
       nextBtn.style.display ="none";
       timeText.textContent = "time left";
    }
    else{
       clearInterval(counter);
       clearInterval(counterLine);
       showResultBox();
    }
};

// GEtting questions from the array in questions.js file
function showQuestions(index){
    const queText = document.querySelector(".que-text");
    let queTag = '<span>'+questions[index].numb+ ". " + questions[index].question + '</span>';
    queText.innerHTML = queTag ;
    let optionTag = '<div class="option"><span>'+  questions[index].options[0] +'</span></div>'
                    +' <div class="option"><span>'+ questions[index].options[1]+'</span></div>'
                    +' <div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    +' <div class="option"><span>'+ questions[index].options[3] +'</span></div>' ;

      optionList.innerHTML = optionTag;
      const option = optionList.querySelectorAll(".option");
    for(let i = 0 ; i < option.length; i++ ){
           option[i].setAttribute("onclick", "optionSelected(this)");
     }
};

//Tick and cross icons
let tickIcon = '<div class = "icon tick"><i class="fas fa-check"></i></div>';
let crossIcon ='<div class = "icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer ;
    let allOption = optionList.children.length;

 nextBtn.style.display ="block";
    if(userAns == correctAns){
         userScore +=1;
         answer.classList.add("correct");
         console.log(userScore);
         answer.insertAdjacentHTML("beforeend", tickIcon);
    }

    else{
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);


        // Automatically select correct answer if userAnswer is incorrect
        for(let i = 0; i < allOption; i++){
            if(optionList.children[i].textContent == correctAns){
              optionList.children[i].setAttribute("class", "option correct");
               optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                   } 
          
                }

     }

     //disable options when the user has selected an answer
 for(let i = 0; i < allOption; i++){
   optionList.children[i].classList.add("disabled");

           } 
         nextBtn.style.display= "block"; //display the next button
      };

      //Result box function
function showResultBox(){
    infoBox.classList.remove("activeInfo"); //hide the info box
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show the result box
    const scoreText = resultBox.querySelector(".score");

    if(userScore > 3){
      let scoreTag = '<span>and congrats , you got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML= scoreTag;
    
    }

    else if(userScore > 1){
       let scoreTag = '<span>and nice , you  got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML= scoreTag;
    
    }

    if(userScore < 1 ){
       let scoreTag = '<span>and pele , you got only <p>'+ userScore +'</p> out of <p>'+questions.length+'</p></span>';
       scoreText.innerHTML= scoreTag;
    
    }

};

//function to start the timer
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
    timeCount.textContent = time;
    time--;

    if(time < 9 ){
       let addZero = timeCount.textContent;
       timeCount.textContent = "0" + addZero;
    }

    if(time < 0){
       clearInterval(counter);
       timeText.textContent = "Time Up";
       timeCount.textContent = "00";
       let correctAns = questions[queCount].answer ;
       let allOption = optionList.children.length;
       nextBtn.style.display ="block"; //dispaly the next button when time is up


       for(let i = 0; i < allOption; i++){
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct");
                 optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                     } 
            }

            for(let i = 0; i < allOption; i++){
                optionList.children[i].classList.add("disabled");
                 
                        } 
                        nextBtn.style.display ="block";

         }
        
    }

};

// Function for the moving line under the header
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
    time += 1; 
    timeLine.style.width = time + "px";
    if(time > 549){
       clearInterval(counterLine);
        }
        
    }

};

// bottom questions counter
function queCounter(index){
    const botmCounter = document.querySelector(".total-que");
    let totalCountTag = "<span><p>"+ index +"</p>of<p>"+ questions.length+"</p></span>"
    botmCounter.innerHTML = totalCountTag ;

};