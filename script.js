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

// Fetch Questions
async function initGame() {
    try {
        const response = await fetch(API_URL);
        questions = await response.json();
        
        loader.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        loadQuestion();
    } catch (error) {
        console.error("Error:", error);
        loader.innerText = "Error loading questions. Check Console.";
    }
}

function loadQuestion() {
    // Check if game is over
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    // Update Progress
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Set Question Text
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous buttons

    // Create Options Array
    const options = [
        { text: currentQuestion.optionA },
        { text: currentQuestion.optionB },
        { text: currentQuestion.optionC }
    ];

    // Create Buttons Dynamically
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt.text;
        
        // This is where your error likely was.
        // We are adding the onclick to the NEW button we just created.
        btn.onclick = () => handleAnswer(btn, opt.text, currentQuestion.answer);
        
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedBtn, selectedText, correctText) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true); // Disable all buttons

    if (selectedText === correctText) {
        selectedBtn.classList.add('correct');
        score++;
        scoreDisplay.innerText = score;
        triggerConfetti(0.5);
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight the correct answer
        allBtns.forEach(btn => {
            if (btn.innerText === correctText) btn.classList.add('correct');
        });
    }

    // Delay before next question
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function endGame() {
    gameContainer.classList.add('hidden');
    endScreen.classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    document.getElementById('total-questions').innerText = questions.length;
    
    if (score === questions.length) triggerConfetti(2);
}

// Confetti Effect
function triggerConfetti(durationSeconds) {
    const end = Date.now() + (durationSeconds * 1000);
    const colors = ['#ff9900', '#ffffff'];

    (function frame() {
        if (typeof confetti === 'function') {
             confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
             confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        }
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Start Game
initGame();
