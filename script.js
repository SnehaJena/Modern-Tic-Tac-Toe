const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restart");
const newGameBtn = document.getElementById("newGame");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const draws = document.getElementById("draws");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

cells.forEach((cell,index)=>{
    cell.addEventListener("click",()=>cellClicked(cell,index));
});

restartBtn.addEventListener("click",restartBoard);
newGameBtn.addEventListener("click",newGame);

function cellClicked(cell,index){

    if(board[index]!=="" || !gameActive)
        return;

    board[index]=currentPlayer;

    cell.textContent=currentPlayer;

    checkWinner();
}

function checkWinner(){

    let roundWon=false;

    for(let condition of winningConditions){

        const a=condition[0];
        const b=condition[1];
        const c=condition[2];

        if(board[a]==="" || board[b]==="" || board[c]==="")
            continue;

        if(board[a]===board[b] && board[b]===board[c]){

            roundWon=true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            break;
        }
    }

    if(roundWon){

        statusText.textContent=`🎉 Player ${currentPlayer} Wins!`;

        if(currentPlayer==="X"){
            xScore++;
            scoreX.textContent=xScore;
        }
        else{
            oScore++;
            scoreO.textContent=oScore;
        }

        gameActive=false;
        return;
    }

    if(!board.includes("")){

        statusText.textContent="🤝 It's a Draw!";

        drawScore++;
        draws.textContent=drawScore;

        gameActive=false;
        return;
    }

    currentPlayer=currentPlayer==="X" ? "O" : "X";

    statusText.textContent=`Player ${currentPlayer}'s Turn`;

}

function restartBoard(){

    board=["","","","","","","","",""];

    gameActive=true;

    currentPlayer="X";

    statusText.textContent="Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("win");
    });

}

function newGame(){

    restartBoard();

    xScore=0;
    oScore=0;
    drawScore=0;

    scoreX.textContent=0;
    scoreO.textContent=0;
    draws.textContent=0;

}