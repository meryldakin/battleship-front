$(document).ready(function(){
  const $wrap = $('#wrap')
  var grid = createGrid(700)
  $wrap.append(grid)
  generateCells(grid,10)

  function createGrid(size){
    let grid = createSquare(size)
    grid.setAttribute("class","grid");
    return grid;
  }

  function createSquare(size){
    let square = document.createElement('div');
    square.style.height = `${size}px`;
    square.style.width = `${size}px`;
    square.setAttribute("class", "square");
    return square;
  }

  function setResolution(grid,number){
    return grid.clientWidth/number
  }

  function generateCells(grid,numberPerRow){
    for(var i =0; i < numberPerRow*numberPerRow; i++){
      let square = createSquare(setResolution(grid,numberPerRow));
      square.setAttribute("id",i+1)
      grid.append(square)
    }
  }
})

//============================================================================================================

class Ship{

  constructor(type, gridLength, positionArray, statusArray) {
    this.type = type
    this.gridLength = gridLength
    this.positionArray = positionArray // an array that contains the placement of the ship on the grid
    this.statusArray = statusArray // an array of the status of each part of the ship false for not hit and true for hit destroyer.statusArray = [false, true, true]
  }
}



function shuffleArray(array) {
  // helper function that shuffles and array of numbers
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function range(start, edge, step) {
  // helper function that generates a range
  if (arguments.length == 1) {
    edge = start;
    start = 0;
  } 
  edge = edge || 1;
  step = step || 1;
 
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}

const board = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: [true, true, true, true, true]}, 
           {type: "cruiser", shipLength: 4, positionArray: [], statusArray: [true, true, true, true]}, 
           {type: "destroyer", shipLength: 3, positionArray: [], statusArray: [true, true, true], 
           {type: "submarine", shipLength: 3, positionArray: [], statusArray: [true, true, true]}, 
           {type: "frigate", shipLength: 2, positionArray: [], statusArray: [true, true]} 
           ]

function shipRandomizer (shipTypes){
  // method to randomly place ships
  
  var startingPos = Math.floor((Math.random() * 100) + 1);
  var increase = shuffleArray([1,10, -1, -10])[0]

  for (var i = 0; i < shipTypes.length - 1; i++) {
    var ship = shipTypes[i]
    var length = ship.shipLength
    var position = ship.positionArray


  }
  
  // check if we can move in a particular direction from startPos to the shipLength
  // if successful, increment/decrement startPos and add to positionArray
  //else change startPos and check logic again

  

}


function gridValidation(randNum) {
  //helper method to validate if ship can be placed in specific randomPos
  var shipLength = this.shipLength
  

  

  
}

function generateStartPos() {
  return [shuffleArray(range(10))[0], shuffleArray(range(10))[0]];
}

function validateStartPos() {
  var array = generateStartPos(); // [2,2]

  while(board[array[0]][array[1]] !== 0) {
    array = generateStartPos();
  }

  return array;

}

function direction(shipLength) {
  var startPos = validateStartPos();
  var n = function (pos){ return [pos[0],pos[1] --]}
  var s = function (pos){ return [pos[0],pos[1] ++]}   
  var e = function (pos){ return [pos[0] ++,pos[1]]}
  var w = function (pos){ return [pos[0] --,pos[1]]}
  var directionsArray = [n,s,e,w]
  var shuffleDirections = shuffleArray(directionsArray) // array of rand directions


  shuffleDirections.forEach(function(e){
    var shipPos = []
    for(var i = 0; i < shipLength-1; i++){
      let newPos = e(startPos)
      let boardPos = board[newPos[0], newPos[1]]
      shipPos.push(boardPos)
    }
    if(shipPos.every(function(element){return element === 0})){
      return shipPos
    } 
  })


}


