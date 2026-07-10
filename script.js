const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const resetBtn = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');

let board = Array(9).fill('');
let current = 'X';
let scores = { X: 0, O: 0 };

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function render(){
  cells.forEach((cell,i)=>{
    cell.textContent = board[i] || '';
    cell.classList.toggle('disabled', !!board[i]);
    // set mark class for coloring
    cell.classList.remove('mark-x','mark-o');
    if(board[i] === 'X') cell.classList.add('mark-x');
    if(board[i] === 'O') cell.classList.add('mark-o');
    cell.setAttribute('aria-label', `Cell ${i+1} ${board[i]||'empty'}`);
  });
  statusEl.textContent = board.includes('') && !checkWinner() ? `Player ${current}'s turn` : (checkWinner() || 'Draw');
  scoreXEl.textContent = scores.X; scoreOEl.textContent = scores.O;
}

function checkWinner(){
  for(const [a,b,c] of wins){
    if(board[a] && board[a] === board[b] && board[b] === board[c]){
      highlight([a,b,c]);
      const winner = board[a];
      scores[winner]++;
      saveScores();
      return `${winner} wins!`;
    }
  }
  if(!board.includes('')) return 'Draw';
  return null;
}

function highlight(line){
  line.forEach(i=>cells[i].style.boxShadow='0 0 18px rgba(79,70,229,0.7)');
}

function makeMove(i){
  if(board[i] || checkWinner()) return;
  board[i]=current;
  current = current === 'X' ? 'O' : 'X';
  render();
}

cells.forEach((cell,i)=>cell.addEventListener('click',()=>{ makeMove(i); }));

resetBtn.addEventListener('click',()=>{
  board = Array(9).fill(''); current='X';
  cells.forEach(c=>{ c.style.boxShadow='none'; c.classList.remove('mark-x','mark-o'); });
  render();
});

function saveScores(){ localStorage.setItem('ttt-simple-scores', JSON.stringify(scores)); }
function loadScores(){ const s=JSON.parse(localStorage.getItem('ttt-simple-scores')||'null'); if(s){scores=s;} }

// theme
function setTheme(t){ document.body.dataset.theme=t; themeToggle.textContent = t==='dark' ? '🌙' : '☀️'; localStorage.setItem('ttt-simple-theme',t); }
themeToggle.addEventListener('click', ()=> setTheme(document.body.dataset.theme==='dark'?'light':'dark'));
const savedTheme = localStorage.getItem('ttt-simple-theme')||'dark'; setTheme(savedTheme);

loadScores(); render();
