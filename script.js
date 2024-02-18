const questions =[
    // array of objs
    {
    question: "Which is the largest animal in the world?",
    answer: [
        {text: "Shark", correct:false},
        {text: "Blue Whale", correct:true},
        {text: "Elephant", correct:false},
        {text: "Giraffe", correct:false},
        {text: "Tiger", correct:false},
        ]
    },
    {
        question: "Which is the smallest Continent in the world?",
        answer: [
            {text: "Asia", correct:false},
            {text: "Austrailia", correct:true},
            {text: "Artic", correct:false},
            {text: "Africa", correct:false},
            {text: "Europe", correct:false},
            ]
    },
    {
        question: "Which is the national sport of India?",
        answer: [
            {text: "Hockey", correct:true},
            {text: "Football", correct:false},
            {text: "Cricket", correct:false},
            {text: "Kabaddi", correct:false},
            {text: "Dodge-Ball", correct:false},
            ]
    },
    {
        question: "Who discovered Gravity?",
        answer: [
            {text: "Albert Einstein", correct:false},
            {text: "Isaac Newton", correct:true},
            {text: "Narendra Modi", correct:false},
            {text: "Elon Musk", correct:false},
            {text: "Nikola Tesla", correct:false},
            ]
    },
    {
        question: "What is the name of the largest desert in the world?",
        answer: [
            {text: "Thar", correct:false},
            {text: "Sahara", correct:false},
            {text: "Alu-Gobi", correct:false},
            {text: "Kalahari", correct:false},
            {text: "Antarctic ", correct:true},
            ]
    }

]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton =document.getElementById("next-btn");

let currentIndex=0;
let score=0;

function startQuiz() {
    currentIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentIndex];
    const questionNo= currentIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.append(button);
        if(answer.correct) {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })

}

function selectAnswer(e) {
    const selectedbtn=e.target;
    const isCorrect = selectedbtn.dataset.correct==="true";

    if(isCorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct=="true")
            button.classList.add("correct");

        button.disabled=true;
    })

    nextButton.style.display="block";
}

function resetState() {
    nextButton.style.display="none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function handleNextButton() {
    currentIndex++;
    console.log(currentIndex);
    if(currentIndex<questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentIndex<questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

function showScore() {
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

startQuiz();