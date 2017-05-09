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
  edge = edge || 0;
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
           {type: "destroyer", shipLength: 3, positionArray: [], statusArray: [true, true, true]}, 
           {type: "submarine", shipLength: 3, positionArray: [], statusArray: [true, true, true]}, 
           {type: "frigate", shipLength: 2, positionArray: [], statusArray: [true, true]} 
           ]

function shipRandomizer (shipTypes){
  // method to randomly place ships
  
  var startingPos = Math.floor((Math.random() * 100) + 1);
  var increase = shuffleArray([1,10, -1, -10])[0]

  for(var i = 0; i < shipTypes.length ; i ++){
    let ship = shipTypes[i]
    let shipPositionArray = direction(ship.shipLength)
  
    while(!validatePosition(shipPositionArray)){
      shipPositionArray = direction(ship.shipLength)
    }
    console.log(shipPositionArray)
    ship.positionArray = shipPositionArray
    // update board for next ship to know available spaces
    updateBoard(shipPositionArray)
  }
  console.log(board)
}

console.log(shipRandomizer(shipTypes))
function updateBoard(positionsArray) {
  for(var i = 0; i < positionsArray.length ; i ++){
    var cord = positionsArray[i];
    var x = cord[0]
    var y = cord[1]
    board[x][y] = 1
  }
}

// function gridValidation(randNum) {
//   //helper method to validate if ship can be placed in specific randomPos
//   var shipLength = this.shipLength  
// }

function generateStartPos() {
  return [shuffleArray(range(9))[0], shuffleArray(range(9))[0]];
}

function validateStartPos() {
  var array = generateStartPos(); // [2,2]

  while(board[array[0]][array[1]] !== 0) {
    array = generateStartPos();
  }

  return array;

}

// console.log(validatePosition(direction(4)))
// console.log(direction(4))

function direction(shipLength) {
  var startPos = validateStartPos();
  var n = function (pos){ return [pos[0],pos[1] --]}
  var s = function (pos){ return [pos[0],pos[1] ++]}   
  var e = function (pos){ return [pos[0] ++,pos[1]]}
  var w = function (pos){ return [pos[0] --,pos[1]]}
  var directionsArray = [n,s,e,w]
  var randDirections = shuffleArray(directionsArray) // array of rand directions
  return shuffleDirections(shipLength)

  function shuffleDirections(shipLength) {
    for(var j = 0; j < randDirections.length; j++){
      var shipPos = [startPos]
      for(var i = 0; i < shipLength - 1; i++){
        let newPos = randDirections[0](startPos)
        shipPos.push(newPos)
      }  
    return shipPos
    break;
    }//end for
  }
}

function validatePosition(positions){
  //takes in positions array and validates
  for(var i = 0; i < positions.length - 1; i++){
    var cord = positions[i];
    var x = cord[0]
    var y = cord[1]
    if(x >= 0 && x < 10 && y >= 0 && y < 10){
      if(board[x][y] !== 0){
        return false
      }
    } else {
      return false
    }
  }
  return true
}
