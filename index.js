
let score = 0;
let currentQuestionNumber = 0;
let bOnQuestion = false;
let totalNumberOfQuestions = STORE.length;


//console.log('it is a quiz');
function displayQuestion() {
  //display question text
  bOnQuestion = true;

  $('.questionNumber').text(currentQuestionNumber+1);

  $('.question-text').text(STORE[currentQuestionNumber].question);

  //display question choices
  $('.question-choices').empty();

  let totalNumberOfChoices = STORE[currentQuestionNumber].answers.length;

  for (let i = 0; i < totalNumberOfChoices; i++) {
    let buildEachChoiceHTML = `<input type='radio' class='option' name='capitals' value="${i}">${STORE[currentQuestionNumber].answers[i]}<br>`;
    $('.question-choices').append(buildEachChoiceHTML);
  }
}

function displayAnswerMessage(ansCorrect) {

  bOnQuestion = false;

  //display question text
  $('.question-text').text(ANSWER_RESPONSE[ansCorrect ? 0 : 1]);

  //display question choices
  $('.question-choices').empty();
  $('.mainButton').text('Next Question');

  let totalNumberOfChoices = STORE[currentQuestionNumber].answers.length;

  $('.score').text(score);

}

function displayRestart() {

    $('.quiz-section').hide();
    $('.start-section').hide();

    $('.startQuiz-box').show();
    $('.startEndMessage').text('Your score is ' + score + " out of " + totalNumberOfQuestions + " questions");

    $('.startButton').text("Restart Quiz");
}

$(document).ready(function () {
  //Hide all questions and results
  $('.quiz-section').hide();
  $('.correct').hide();
  $('.incorrect').hide();
  $('.answerResult').hide();

});

function startQuiz() {
  $('.startButton').on('click', function (event) {

    $('.startQuiz-box').hide();
    $('.quiz-section').show();
    $('.answerResult').hide();

    score = 0;
    currentQuestionNumber = 0;
    $('.score').text(score);
    $('.questionNumber').text(currentQuestionNumber+1);

    displayQuestion();
  }
  );
}

function mainButtonPressed() {
  $('.mainButton').on('click', function (event) {
    event.preventDefault();

    if(!bOnQuestion)
    {
      displayQuestion();
    }
    
    let selectedAnswerIndex = $("input[class='option']:checked").val();
    
    if( selectedAnswerIndex == undefined )
    {
      return;
    }
   
    let correctAnswer = STORE[currentQuestionNumber].correctAnswer;
    
    let isCorrectAnswer = STORE[currentQuestionNumber].answers[selectedAnswerIndex] == correctAnswer;

    if (isCorrectAnswer) {
      score++;
    }
    
    if ((currentQuestionNumber + 1) == totalNumberOfQuestions) {

      displayRestart();

    }
    else {
  
      //increment the current question number
      currentQuestionNumber++;
      
      //display the following question
      displayAnswerMessage(isCorrectAnswer);
    }
  });
}




$(startQuiz);
$(mainButtonPressed);



