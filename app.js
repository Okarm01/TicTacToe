const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const playAgain = document.querySelector('#play')
let playerGo = 'cross'

const circle = '<div class="piece" id="circle"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg></div>'
const cross = '<div class="piece" id="cross"><svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg></div>'


const startPieces = [
    '','','',
    '','','',
    '','','',
]

function createBoard(){
    
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.setAttribute('square-id', i)
        gameBoard.append(square)
    })
    
}
createBoard()
const squares = document.querySelectorAll('.square');

playAgain.addEventListener('click', playNewGame);

function playNewGame(event){

    console.log('New game')
    location.reload()
    


}
function changePlayer() {
    if(playerGo === 'circle'){
        playerGo = 'cross'
    }
    else if(playerGo ==='cross'){
        playerGo = 'circle'
    }
}
function handleClick(event) {

    
    if (playerGo === 'stop'){
        return
    }

    const clickedSquare = event.target
    const squareId = clickedSquare.getAttribute('square-id')
    

    if (!clickedSquare.innerHTML.trim() && playerGo === 'cross') {
        clickedSquare.innerHTML = circle
        changePlayer()
    
    }else if(!clickedSquare.innerHTML.trim() && playerGo === 'circle'){
        clickedSquare.innerHTML = cross
        changePlayer()
        
    }else{
        return
    }

    checkForWinCircle()
    checkForWinCross()
    checkForDraw()
    
}


squares.forEach(square => {
    
    square.addEventListener('click', handleClick);
});

function BoardFull() {
    return Array.from(squares).every(square => square.innerHTML.trim() !== '')
}



function checkForDraw(){
    if (BoardFull() && playerGo !=='stop') {
        infoDisplay.innerHTML = 'Draw'
        playAgain.classList.add('playAgain')
        playAgain.innerHTML = 'Play Again'
        playerGo = 'stop'
    }
}

function checkForWinCircle() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const squareA = document.querySelector(`[square-id="${a}"]`)
        const squareB = document.querySelector(`[square-id="${b}"]`)
        const squareC = document.querySelector(`[square-id="${c}"]`)

        const childA = squareA.querySelector('#circle')
        const childB = squareB.querySelector('#circle')
        const childC = squareC.querySelector('#circle')

        if (childA && childB && childC) {
            squareA.classList.add('coloredCircle')
            squareB.classList.add('coloredCircle')
            squareC.classList.add('coloredCircle')
            infoDisplay.innerHTML = 'Circle wins'
            playAgain.classList.add('playAgain')
            playAgain.innerHTML = 'Play Again'
            playerGo = 'stop'
            updateScores('circle');
            displayScores();
            return
        }
        
    }
    
}

function checkForWinCross() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const squareA = document.querySelector(`[square-id="${a}"]`)
        const squareB = document.querySelector(`[square-id="${b}"]`)
        const squareC = document.querySelector(`[square-id="${c}"]`)

        const childA = squareA.querySelector('#cross')
        const childB = squareB.querySelector('#cross')
        const childC = squareC.querySelector('#cross')

        if (childA && childB && childC) {
            squareA.classList.add('coloredCross')
            squareB.classList.add('coloredCross')
            squareC.classList.add('coloredCross')
            infoDisplay.innerHTML = 'Cross wins'
            playAgain.classList.add('playAgain')
            playAgain.innerHTML = 'Play Again'
            playerGo = 'stop'
            updateScores('cross');
            displayScores();
            return
        }

    }
    
}

const storedScores = localStorage.getItem('scores');
const scores = storedScores ? JSON.parse(storedScores) : { cross: 0, circle: 0 };

function updateScores(player) {
    scores[player]++
    localStorage.setItem('scores', JSON.stringify(scores));
}

function displayScores() {
    const crossScoreElement = document.querySelector('#cross-score');
    const circleScoreElement = document.querySelector('#circle-score');

    crossScoreElement.textContent = scores.cross;
    circleScoreElement.textContent = scores.circle;
}
const resetButton = document.querySelector('#reset-scores');
resetButton.addEventListener('click', resetScores);

function resetScores() {
    scores.cross = 0;
    scores.circle = 0;
    localStorage.setItem('scores', JSON.stringify(scores));
    displayScores();
}
displayScores()
