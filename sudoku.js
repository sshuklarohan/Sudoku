var board = [
    [7,8,0,4,0,0,1,2,0],
    [6,0,0,0,7,5,0,0,9],
    [0,0,0,6,0,1,0,7,8],
    [0,0,7,0,4,0,2,6,0],
    [0,0,1,0,5,0,9,3,0],
    [9,0,4,0,6,0,0,0,5],
    [0,7,0,3,0,0,0,1,2],
    [1,2,0,0,0,7,4,0,0],
    [0,4,9,2,0,6,0,0,7],];

var blank_board = [
    [7,8,0,4,0,0,1,2,0],
    [6,0,0,0,7,5,0,0,9],
    [0,0,0,6,0,1,0,7,8],
    [0,0,7,0,4,0,2,6,0],
    [0,0,1,0,5,0,9,3,0],
    [9,0,4,0,6,0,0,0,5],
    [0,7,0,3,0,0,0,1,2],
    [1,2,0,0,0,7,4,0,0],
    [0,4,9,2,0,6,0,0,7],];


//hold the location of each input    
var inputs = [];


window.onload= function() {
    setGame();
}

function setGame() {
    setBoard();
    setSolveButton();
    setResetButton();
}

function setBoard(){
    for(let r = 0; r<9; r++){
        for(let c= 0; c<9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);

            if(board[r][c] != 0){
                tile.innerText = board[r][c];
            } else {
                let input = document.createElement("input");
                input.id = "i-"+ r.toString() + "-" + c.toString();
                input.type = "text";
                input.maxLength = 1;
                input.classList.add("tile-input");
                tile.appendChild(input);
                input.addEventListener("input",handleInput);
                inputs.push({row: r, col: c});
            }

            if(r == 2 || r == 5){
                tile.classList.add("horizontal-line");
            }

            
            if(c == 2 || c == 5){
                tile.classList.add("vertical-line");
            }

        }
    }

}



function handleInput(event){
    let input = event.target;
    let value = input.value;
    let coords = input.id.split("-");
    let r = parseInt(coords[1]);
    let c = parseInt(coords[2]);
    if (!/^[1-9]$/.test(value)) {
        input.value = ""; 
        board[r][c] = 0;
    } else{    
        board[r][c] = parseInt(value);
    }
}

function setResetButton(){
    let button = document.createElement("div");
    button.id = "reset";
    button.classList.add("button");
    document.getElementById("buttons").append(button);
    button.innerText = "reset";
    button.addEventListener("click",()=>{
        location.reload();
    });
}

function setSolveButton(){
    let button = document.createElement("div");
    button.id = "solve";
    button.classList.add("button");
    document.getElementById("buttons").append(button);
    button.innerText = "solve";
    button.addEventListener("click",()=>{
        solve_helper(0);
        check_errors();
        button.classList.add("disabled");
    });
}

function solve_helper(index){
    if(index>= inputs.length)return true;
    const {row,col} = inputs[index];
    let id = "i-"+row.toString() + "-" + col.toString();
    for(let i = 1; i<=9; i++){
        if(is_valid(blank_board,row,col,i)){
            blank_board[row][col]= i;
            document.getElementById(id).value = i;
            if(solve_helper(index+1))return true;
            
        }
        blank_board[row][col]=0;
        document.getElementById(id).value = "";
    }
    return false;

}

function is_valid(bd, r, c, num){
    
    //check the row and column 
    for(let i=0; i<9; i++){
        if(bd[i][c]== num || bd[r][i]== num) return false;
          
    }

    //check the 3x3 grid
    let start_row = Math.floor(r/3) * 3;
    let start_col = Math.floor(c/3) * 3;
    for(let q=0; q<3; q++){
        for(let s=0; s<3; s++){
            if(bd[start_row+q][start_col+s]==num)return false;
        }
    }
    return true;
}


function check_errors(){
    let errors = 0;
    for(let i = 0; i<inputs.length; i++){
        const {row,col} = inputs[i];
        let id = "i-"+row.toString() + "-" + col.toString();
        if(board[row][col]!= blank_board[row][col]){
            errors += 1;
            document.getElementById(id).classList.add("incorrect-tile");
        } else {
            document.getElementById(id).classList.add("correct-tile");
        }

    }

    let result = "YOU WON!!!";
    if(errors != 0){
        result = "You made " + errors + " errors";
    }

    document.getElementById("result").innerText = result;

}