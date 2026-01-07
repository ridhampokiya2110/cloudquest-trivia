
    // PASTE YOUR API URL HERE
    const API_URL = "https://hgw9v57w8b.execute-api.ap-south-1.amazonaws.com//questions"; 

    let questions = [];
    let currentindex = 0;
    let score = 0;

    async function fetchQuestions() {
        try {
            const response = await fetch(API_URL);
            questions = await response.json();
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('quiz-container').classList.remove('hidden');
            loadQuestion();
        } catch (error) {
            alert("Error fetching data: " + error);
        }
    }

    function loadQuestion() {
        if (currentindex >= questions.length) {
            document.getElementById('question-text').innerText = "Game Over! Final Score: " + score;
            document.getElementById('options').innerHTML = "";
            document.getElementById('next-btn').classList.add('hidden');
            return;
        }
        
        const q = questions[currentindex];
        document.getElementById('question-text').innerText = q.question;
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = "";

        [q.optionA, q.optionB, q.optionC].forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(opt, q.answer);
            optionsDiv.appendChild(btn);
        });
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) score++;
        document.getElementById('score').innerText = score;
        currentindex++;
        loadQuestion();
    }
    document.getElementById('next-btn').onclick = loadQuestion;

    fetchQuestions();
