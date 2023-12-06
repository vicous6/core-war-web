import "./player1.js"
import "./player2.js"
import {moovePlayer1} from "./player1.js";
let tab = [];

let height= 20;
let width = 20;

let maxHeight = height-1
let maxWidth = width-1
moovePlayer1()

let scorePlayer1 = 0;
let ScorePlayer2 = 0;
let count = 0;
// represente les valeur des joueurs sur la matrice
let player = [10,20]
let playerColor = [1,2]
generateBoard()
displayBoard()


console.log(tab)

// movePlayer1(10)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function startGame() {

    let nombreDeTour = 400;
    for (let i = 0; i < nombreDeTour; i++) {
        count++
        console.log(count)
        await movePlayer1(player[0],playerColor[0]);
        if(count%3!=0){
            await movePlayer2(player[1],playerColor[1]);
        }

        await sleep(20); // 1000 milliseconds (1 second) delay
        displayBoard();
        if(i===nombreDeTour-1){
            whoIsTheWinner()
        }
    }

}

startGame();

async function movePlayer2(id,color){

    let coordinates = findPlayer(id)
    if(moveIfEnnemyNear(coordinates[0],coordinates[1],id,color)){
        let truc = 0;
    }else
   if(moveBottom(coordinates[0],coordinates[1],id,color,color)){

    }else if(moveLeft(coordinates[0],coordinates[1],id,color )){

    }else if(moveUp(coordinates[0],coordinates[1],id,color)){


    }  else if(moveRight(coordinates[0],coordinates[1],id,color)){


    }





}


 async function movePlayer1(id,color){

    let coordinates = findPlayer(id);


    if(moveIfEnnemyNear(coordinates[0],coordinates[1],id,color)){
        let truc = 0;
    }else

    if(moveRight(coordinates[0],coordinates[1],id,color)){
    let truc = 0;
  }
  else if(moveBottom(coordinates[0],coordinates[1],id,color,color)){

      let truc = 0 ;
  }else if(moveUp(coordinates[0],coordinates[1],id,color,color)){

      let truc = 0 ;
  }else if(moveLeft(coordinates[0],coordinates[1],id,color )){

      let truc = 0 ;
  }




}

function displayBoard(){
    let htmlLocation = document.getElementsByTagName("section")[0];
    htmlLocation.remove();
    document.body.appendChild(document.createElement("section"))
    htmlLocation = document.getElementsByTagName("section")[0];
    for(let i = 0 ; i< height; i++){

        for(let j =  0 ; j < width;j++){
            let elem = document.createElement("div");

            elem.classList.add ("a"+tab[i][j]);

            htmlLocation.appendChild(elem)
        }

    }

}
function generateBoard (){
    for(let i = 0 ; i< height; i++){
        let line = [];
        for(let j =  0 ; j < width;j++){
            line.push(0);
        }
        tab.push(line);
    }

    let xPlayer1 = Math.floor(Math.random() * height-1)
    let xPlayer2 = Math.floor(Math.random() * height-1)
    let yPlayer1 = Math.floor(Math.random() * width-1)
    let yPlayer2 = Math.floor(Math.random() * width-1)

    tab[xPlayer1][yPlayer1]=player[0];
    tab[xPlayer2][yPlayer2]=player[1];
}
// return false si out of array
// return false si case occuper par un personnage ennemie
// return true si deplacement effectué
function moveRight(x,y,idPlayer,idColor){


    if (coordinateExistAndNoEnnemys(x, y+1)){
            if(tab[x][y+1] === idColor || player.includes(tab[x][y+1]) ){

                return false

            }
            tab[x][y+1]= idPlayer;
            tab[x][y]= idColor
            return true;
        }else {
        return false
    }


}
function moveLeft(x,y,idPlayer,idColor){

    if (coordinateExistAndNoEnnemys(x , y- 1)){

        if(tab[x][y-1]=== idColor || player.includes(tab[x][y-1]) ){
            return false
        }
        console.log("coucouuuu")
        // console.log(tab)
        tab[x][y-1]= idPlayer;
        tab[x][y]= idColor
        return true;
    }else{
        return false
    }
}
function moveBottom(x,y,idPlayer,idColor){
    if (coordinateExistAndNoEnnemys(x + 1, y)){
        if(tab[x+1][y]=== idColor || player.includes(tab[x+1][y]) ){
            return false
        }
        tab[x+1][y]= idPlayer;
        tab[x][y]= idColor
        return true;
    }else{
        return false
    }
}
function moveUp(x,y,idPlayer,idColor) {


    if (coordinateExistAndNoEnnemys(x - 1, y)){
        // si meme couleur ou player ennemy
        if (tab[x - 1][y] === idColor || player.includes(tab[x - 1][y])) {
            return false
        }else{
            tab[x-1][y] = idPlayer;
            tab[x][y] = idColor
            return true;
        }

    }else{
        return false
    }
}

function findPlayer(number){
    for(let i = 0 ; i < tab.length; i++){
        for(let j = 0 ; j < tab[i].length;j++){
            if(tab[i][j] === number){
                return ([i,j])
            }
        }
    }
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function moveIfEnnemyNear(x,y,idPlayer,idColor){
    if(  coordinateExistAndNoEnnemys(x,y+1)&&tab[x][y+1]!== 0 && tab[x][y+1]!== idColor){
        return moveRight(x,y,idPlayer,idColor)
    }
    if(  coordinateExistAndNoEnnemys(x,y-1)&&tab[x][y-1]!== 0 && tab[x][y-1]!== idColor){
        return moveLeft(x,y,idPlayer,idColor)
    }
    if(coordinateExistAndNoEnnemys(x+1,y)&&tab[x+1][y]!== 0 && tab[x+1][y] !== idColor){
        return moveBottom(x,y,idPlayer,idColor)
    }
    if(  coordinateExistAndNoEnnemys(x-1,y)&&tab[x-1][y]!== 0 && tab[x-1][y]!== idColor){
        return moveUp(x,y,idPlayer,idColor)
    }
}
function coordinateExistAndNoEnnemys(x,y){
// console.log(typeof (x),typeof (y))
    if(x>=0 && x <height && y>= 0 && y< width){
        return true;
    }else{
        return false;
    }
}

function whoIsTheWinner(){
    let score1 = 0
    let score2= 0;
    for(let i = 0 ; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            if (tab[i][j] === playerColor[0]) {
                score1++
            } else if (tab[i][j] === playerColor[1]) {
                score2++
            }
        }


    }
    alert("playerBlack " + score1 + " playerOrange " + score2)
}
