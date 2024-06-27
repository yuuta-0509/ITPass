// flashcards.js

let flashcards = [];
let currentIndex = 0;

function selectGenre(file) {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            currentIndex = 0;
            document.getElementById('genre-selection').style.display = 'none';
            showFlashcard();
        })
        .catch(error => console.error('JSONファイルの読み込み中にエラーが発生しました:', error));
}

function showFlashcard() {
    const container = document.getElementById('flashcards-container');
    container.innerHTML = '';
    if (flashcards.length > 0) {
        const card = document.createElement('div');
        card.classList.add('flashcard', 'visible');
        card.innerHTML = `
            <p>問題: ${flashcards[currentIndex].text}</p>
            <input type="text" id="answer-input" placeholder="答えを入力してください">
            <button onclick="checkAnswer()">確定</button>
            <p id="result-message"></p>
        `;
        container.appendChild(card);
    }
}

function checkAnswer() {
    const userInput = document.getElementById('answer-input').value.trim();
    const correctAnswer = flashcards[currentIndex].word;
    const resultMessage = document.getElementById('result-message');

    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        resultMessage.innerHTML = '正解！';
        const nextButton = document.createElement('button');
        nextButton.innerText = '次へ';
        nextButton.onclick = showNextFlashcard;
        resultMessage.appendChild(nextButton);
    } else {
        resultMessage.innerHTML = '不正解。もう一度試してください。';
    }
}

function showNextFlashcard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    showFlashcard();
}
