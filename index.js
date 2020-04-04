
let score = 0;
let currentQuestionNumber = 0;
let bOnQuestion = true;
let totalNumberOfQuestions = STORE.length;


//console.log('it is a quiz');
function displayQuestion() {
  //display question text
  bOnQuestion = true;

  $('.questionNumber').text(currentQuestionNumber+1);

  $('.question-text').text(STORE[currentQuestionNumber].question);

  //display question choices

  let totalNumberOfChoices = STORE[currentQuestionNumber].answers.length;

  for (let i = 0; i < totalNumberOfChoices; i++) {
    let buildEachChoiceHTML = `<input type='radio' class='option' name='capitals' value="${i}">${STORE[currentQuestionNumber].answers[i]}<br>`;
    $('.question-choices').append(buildEachChoiceHTML);
  }

  $('.mainButton').text('Submit');
}

function displayAnswerMessage(isAnsCorrect) {

  bOnQuestion = false;

  $('.question-text').text(ANSWER_RESPONSE[isAnsCorrect ? 0 : 1]);

  $('.question-choices').empty();
  $('.mainButton').text( currentQuestionNumber == totalNumberOfQuestions ? 'See Results' : 'Next Question');

}

function displayRestart() {

    $('.quiz-section').hide();
    $('.start-section').hide();

    $('.startQuiz-box').show();
    $('.startEndMessage').text('Your score is ' + score + " out of " + totalNumberOfQuestions + " questions");

    $('.startButton').text("Restart Quiz");
}


$('.startButton').on('click', function (event) {

  $('.startQuiz-box').hide();
  $('.quiz-section').show();
  $('.answerResult').hide();

  score = 0;
  currentQuestionNumber = 0;
  $('.score').text(score);
  $('.questionNumber').text(currentQuestionNumber+1);

  displayQuestion();
});

$('.mainButton').on('click', function (event) {
  event.preventDefault();

  if(!bOnQuestion)
  {
    if( (currentQuestionNumber) == totalNumberOfQuestions )
    {
      displayRestart();
    }
    else
    {
      displayQuestion();
    }
    
    return;
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
    $('.score').text(score);
  }
  
  //increment the current question number
  currentQuestionNumber++;
    
  //display the following question
  displayAnswerMessage(isCorrectAnswer);
});

$(document).ready(function () {
  //Hide all questions and results
  $('.quiz-section').hide();
  $('.correct').hide();
  $('.incorrect').hide();
  $('.answerResult').hide();

});
