const API_URL = "https://hgw9v57w8b.execute-api.ap-south-1.amazonaws.com//questions";

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const loader = document.getElementById('loader');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score-display');
const progressBar = document.getElementById('progress-fill');

// Fetch Questions from AWS Lambda
async function initGame() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch");
        questions = await response.json();
        
        loader.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        loadQuestion();
    } catch (error) {
        loader.innerHTML = `<p style="color:red">Error: ${error.message}. <br>Check your API URL!</p>`;
    }
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Set Text
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = ''; 

    // Create Buttons
    const options = [
        { text: currentQuestion.optionA, letter: "optionA" },
        { text: currentQuestion.optionB, letter: "optionB" },
        { text: currentQuestion.optionC, letter: "optionC" }
    ];

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt.text;
        btn.onclick = () => handleAnswer(btn, opt.text, currentQuestion.answer);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedBtn, selectedText, correctText) {
    // Disable all buttons to prevent double clicking
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedText === correctText) {
        selectedBtn.classList.add('correct');
        score++;
        scoreDisplay.innerText = score;
        triggerConfetti(0.5); // Small confetti for correct answer
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight the correct one
        allBtns.forEach(btn => {
            if (btn.innerText === correctText) btn.classList.add('correct');
        });
    }

    // Wait 1.5 seconds then go to next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function endGame() {
    gameContainer.classList.add('hidden');
    endScreen.classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    document.getElementById('total-questions').innerText = questions.length;
    
    if (score === questions.length) {
        triggerConfetti(2); 
    }
}

// Confetti Effect Helper
function triggerConfetti(durationSeconds) {
    const end = Date.now() + (durationSeconds * 1000);
    const colors = ['#ff9900', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

initGame();

    

