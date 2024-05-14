// let's start coding for tic tac toe
let mode_cont=document.getElementById('mode-cont');
mode_cont.style.display='none';
let container = document.getElementById('container');
container.style.display="none"
let cells = document.querySelectorAll(".cells");
let which_chance = document.getElementsByClassName('chance');
which_chance[0].classList.add("f_color_x")
let vs_box=document.getElementById('vs-img');
let two_btn=document.querySelectorAll('.two-btn');
let history_btn=document.querySelectorAll('.history-btn')
history_btn[1].style.display="none"
let play_btn=document.getElementById('play-btn');
play_btn.addEventListener('click',play_start)
let resetbutton = document.getElementById('r-btn')
resetbutton.style.display="none"
let mode_text=document.getElementById('mode-text');
let close_btn=document.getElementsByClassName("close");
console.log(close_btn);
close_btn[0].addEventListener('click',()=>close_func([mode_cont,mode_text, close_btn[0]],[two_btn[0],vs_box]))
let mode_x=document.getElementById('mode-x');
let mode_o=document.getElementById('mode-o')
let chancebox=document.getElementById('chancebox');
chancebox.style.display="none"

// add click event listener in both
let currentPlayer;
let currentturnx;
let value;
mode_x.addEventListener('click', function() {
    firstTurn("x", null);
});
mode_o.addEventListener('click', function() {
    firstTurn(null, "o");
});
let percent_box=document.getElementById('percent');
let percent_div=document.getElementById('percent_div');
let percent_no=document.getElementById('percent_no');
percent_div.style.display="none"
percent_no.style.display="none"
let isload=false
let percent;
function loadingpercent(){
  percent_div.style.display="block"
percent_box.style.width=`${percent}%`
  percent_no.textContent=percent;
  new Promise((resolve,reject)=>{
    setInterval(function(){
      percent_box.style.width=`${percent}%`
      percent_no.textContent=percent;
      if(isload=true){
        percent=100
        percent_no.style.display="none"
        percent_div.style.display="none"
        
      }
    },100)
    resolve()
  })
}
instal_loading = () => new Promise((resolve, reject) => {
  loadingpercent()
  resolve()
})
let minimax_move = () => new Promise((resolve, reject) => {  
   setTimeout(() => {
     let move= getbestmove()
     resolve(move)
    
   }, 100)
})
let loading_quit = () => new Promise((resolve, reject) => {
  resolve()
})
let game_start = () => new Promise((resolve, reject) => {
  container.style.display="block"
  history_btn[1].style.display="block"
  mode_cont.style.display='none';
  mode_text.style.display="none";
   isload=true
   gamestart()
   which_turn()
  if(currentPlayer=="o" && value==1){
    botmove()
  }
  resolve()
})
let sequent = async () => {
  percent=10;
  percent_box.style.width=`${percent}%`
  percent_no.textContent=percent;
  await  instal_loading()
  percent=30;
percent_box.style.width=`${percent}%`
  percent_no.textContent=percent;
  await minimax_move()
  percent=70;
percent_box.style.width=`${percent}%`
  percent_no.textContent=percent;
  await loading_quit()
  percent=90;
percent_box.style.width=`${percent}%`
  percent_no.textContent=percent;
  await game_start()
  percent=100;
percent_box.style.width=`${percent}%`
  percent_no.textContent=percent;
  console.log(`complete`);
}
let gameprocess = [minimax_move, loading_quit, game_start]

// first.addEventListener("click", function() {
//   sequent()
// })

function firstTurn(x,o) {
   if(x=="x" && o==null){
    currentPlayer="x"
     mode_text.style.display="none"
     value=0;
     currentturnx=true;
     mode_x.classList.add('f_color_x');
     sequent()
   }
  else{
    
    currentPlayer="o"
    value=1;
    mode_text.style.display="none"
    currentturnx=false;    
     mode_x.classList.add('f_color_x');
    sequent()
  }
  console.log(currentPlayer);  
  return currentPlayer;

}
mode_text.style.display="none"
function play_start() {
   two_btn[0].style.display='none';
  vs_box.style.display='none';
  // start mode_cont
  mode_cont.style.display='block';
  mode_text.style.display='block';

}
function gamestart() {
 chancebox.style.display="block"
  resetbutton.style.display="block"
}

console.log(cells);
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleClick(cell));

})

function botmove() {
   makeAimove()
}




cells.forEach((cell) => {
  cell.addEventListener("click", () => handleClick(cell));
})
let no_of_turn=0;
function handleClick(event) {
   if (event.innerHTML == "" && no_of_turn%2==value ) {
    if (currentPlayer == "x" && currentturnx) {
      no_of_turn++;
      event.classList.add("f_color_x" ,"anime")
      
      event.innerHTML = currentPlayer;
      checkwin()
      declare()
      currentPlayer = "o";                  currentturnx = false; 
      checkwin()
      botmove()
      which_turn()
      
      
    }
  }
}
function Click_for_Ai(event) {
  event.classList.add("f_color_o" , "anime")
   event.innerHTML = currentPlayer;
  no_of_turn++;
   checkwin()
   declare()
     currentPlayer = "x";
     currentturnx = true;
   
   
   which_turn()
}

function which_turn() {
   if(currentturnx && currentPlayer=="x"){
     which_chance[0].classList.add("f_color_x")
     which_chance[1].classList.remove("f_color_o")
   }
  else{
    which_chance[0].classList.remove("f_color_x")
    which_chance[1].classList.add("f_color_o")
    
  }
}

function checkwin() {
  const winpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


  return winpattern.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;

  });

}
function isBoardFull() {
  return [...cells].every(cells => cells.innerHTML === "x" || cells.innerHTML === "o")

}


resetbutton.addEventListener('click', reset)

function reset() {
  currentPlayer = "x"
  no_of_turn=0;
  currentturnx = true
  cells.forEach(cell => {
    cell.innerHTML = ""
    cell.classList.remove("f_color_x", "f_color_o", "anime")
  })
}

function makeAimove() {
  const move = getbestmove()
  move.then((value) => {
    const aimove = cells[value]
    setTimeout(()=>Click_for_Ai(aimove) ,1000)
  })
  
}

async function getbestmove() {
  let bestscore = -Infinity;
  let bestmove;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML=="") {
      cells[i].textContent = "o"
      const score = minimax(cells, 0, false)
      cells[i].textContent = ""
      if (score > bestscore) {
        bestscore = score
        bestmove = i
      }
    }
  }
  
  return bestmove
}

function minimax(cells, depth, ismax) {
  if (checkwin()) {
    return ismax ? -1 : 1

  } else if (isBoardFull()) {
    return 0;
  }
  const scores = []
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML=="") {
      cells[i].textContent = ismax ? "o" : "x"
      const score = minimax(cells, depth + 1, !ismax)
      cells[i].textContent = ""
      scores.push(score)
    }
  }
  return ismax ? Math.max(...scores) : Math.min(...scores)
}
function declare(){
  if(checkwin()){
    if(currentPlayer=="x"){
      alert("you win")
    }
    else{
      alert("you lose")
    }
  }
  else if(isBoardFull()){
    alert("draw")
  }
}
function close_func(display_none, display_block) {
   display_none.forEach((a)=>{
      a.style.display="none"
   })
   display_block.forEach((a)=>{
      a.style.display="block"
   })
}