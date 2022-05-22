/*  Question class with three data members - text, choices(array of string), ans  */
function Question( text, choices, answer ) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

/* Method to check whether the choice is correct answer or not */
Question.prototype.isCorrectAnswer = function( answer ) {
    return this.answer === answer;
};

/* Quiz class with questions input in constructor, score and question index  */
function Quiz( questions ) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

/* Method return the question object for questionIndex */
Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.questionIndex];
};

/*Method to return the correct answer of current question */
Quiz.prototype.checkOptionWithAnswer = function( answer ) {
    if( this.getCurrentQuestion().isCorrectAnswer( answer ) ) {
        this.score++;
    }

    this.questionIndex++;
};

/*Method to check if quiz is completed or not */
Quiz.prototype.done = function() {
    return this.questionIndex >= this.questions.length;
};

function loadQuestion() {
    if( quiz.done() ) {
        showScore();
        return;
    }

    const currentQuestion = quiz.getCurrentQuestion();
    const questionEl = document.getElementById( 'question' );
    questionEl.textContent = currentQuestion.text;
    for( let i = 0; i < currentQuestion.choices.length; i++ ) {
        const currentChoice = currentQuestion.choices[i];
        document.getElementById( 'choice' + i ).textContent = currentChoice;
        handleSelect( 'btn' + i, currentChoice )
    }

    showProgress(); 
}

function handleSelect( id, choice ) {
    document.getElementById( id ).onclick = function() {
        quiz.checkOptionWithAnswer( choice );
        loadQuestion();
    };
}

// function to show the progress
function showProgress () {
    document.getElementById( 'progress' ).textContent = `Question ${quiz.questionIndex + 1} of ${quiz.questions.length}`;
}

function showScore() {
    document.getElementById( 'quiz' ).innerHTML = `
        <h1>Result</h1>
        <h2 id="score">You scored ${quiz.score}</h2>
    `;
}
/* object questions */
const questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

const quiz = new Quiz( questions );
loadQuestion();
