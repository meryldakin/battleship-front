
var gameBoard;
var shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: []},
           {type: "cruiser", shipLength: 4, positionArray: [], statusArray: []},
           {type: "destroyer", shipLength: 3, positionArray: [], statusArray: []},
           {type: "submarine", shipLength: 3, positionArray: [], statusArray: []},
           {type: "frigate", shipLength: 2, positionArray: [], statusArray: []}
           ]

const $wrap = $('#board-container')
var grid = createGrid(700)
var ammo = 50
var sunkShips = []
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


function loggedIn(){
  return sessionStorage.user_id ? true : false
}

function findOrCreateBoard() {
  if(sessionStorage.board_id === "0" || sessionStorage.board_id === "null"){
    ajaxBoardCreate()
  } else {
    ajaxBoardGet().then(function(data){
      sessionStorage.board_id = data.id
      reRenderBoard(data.status)
      gameBoard = data.status

      console.log("reRender old game:", data.status)
    })
  }
}

function ajaxBoardGet(){
    return $.ajax({
      url: `http://localhost:3000/boards/${sessionStorage.board_id}`,
      method: 'GET'
    })
}

function ajaxBoardCreate() {
    $.ajax({
      url: 'http://localhost:3000/boards',
      method: 'POST',
      data: {
        user_id: sessionStorage.user_id,
        ammo: ammo,
        gameResult: 0,
        status: shipRandomizer(shipTypes)
      }
    }).then(function (data) {
      sessionStorage.board_id = data.id
      console.log("it's successful", data)
    }, function(err){
      console.log(err)
  })
}

function saveGame(gameResult,boardId){
  $.ajax({
    url: `http://localhost:3000/boards/${boardId}`,
    method: 'PUT',
    data: { user_id: sessionStorage.user_id,
            ammo: ammo,
            game_result: gameResult, 
            status: gameBoard},
    dataType: "JSON"
  })
}

function reRenderBoard(board){
  board.forEach(function(row,x){
    row.forEach(function(square,y){

      updateGrid(x,y,board[x][y])
    })
  })
}

function updateGrid(x ,y, value) {
  let $square = $(`.${x}${y}`)
  return $square.attr("ship", value)
}
function hit(cell) {
  cell.append('<img src="Fire-icon.png"/>')
  console.log(`You hit a piece of a ship! Its id was ${this.id}`)
}

function miss(cell) {
  cell.append('<img src="target.png"/>')
  console.log("Ya missed!")
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
    ship.positionArray = shipPositionArray
    // update board for next ship to know available spaces
    updateBoard(shipPositionArray)
  }
  gameBoard = board;
  return board;
}

function updateBoard(positionsArray) {
  for(var i = 0; i < positionsArray.length ; i ++){
    var cord = positionsArray[i];
    var x = cord[0]
    var y = cord[1]
    updateGrid(x, y, 1);

    board[x][y] = 1
    gameBoard = board
  }
}

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

function updateGrid(x ,y, value) {
  let $square = $(`.${x}${y}`)
  return $square.attr("ship", value)
}

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
  square.setAttribute("ship", 0);
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

function setCoordAttribute(){
  var index = 1
  for(let x = 0; x < 10; x++){
    for(let y = 0; y < 10; y++){
      $(`.square#${index}`).attr("x", x)
      $(`.square#${index}`).attr("y", y)
      $(`.square#${index}`).attr("class", `square ${x}${y}`)
      index++
    }
  }
} 

function ammoUpdate(){
  ammo --
  $("#ammo").html(`AMMO REMAINING: ${ammo}`)
}

function updateShip(cell) {
  var cellArray = JSON.parse(`[${$(cell).attr("x")}, ${$(cell).attr("y")}]`)
  console.log(cellArray)
  console.log(shipTypes)
  var hitShip;

  for (var i = 0; i < shipTypes.length; i++) {
    var ship = shipTypes[i]
    for (var j = 0; j < ship.positionArray.length; j++) {
      var pos = ship.positionArray[j]
      if (cellArray.toString() === pos.toString()) {
        var x = cellArray[0]
        var y = cellArray[1]
        gameBoard[x][y] = 2
        hitShip = ship
        break;
      }
    }
  }
  debugger
  hitShip.statusArray.push(true)
  if(hitShip.statusArray.length === hitShip.shipLength) {
    sunkShips.push(hitShip)
    alert(`You sunk my ${hitShip.type}!`)
  }
}

// game home page logic
//--------------------------------------------------------------------
  if(!loggedIn()){
    $('body').load('login.html');
    $('body').on('submit','form#login-form',function(e){
      e.preventDefault()
      let $username = $('#username');
      let $password = $('#password');

      $.ajax({
        url: 'http://localhost:3000/sessions',
        method: 'post',
        data: {
          username: $username.val(),
          password: $password.val()
        }
      }).then(function(response){
        sessionStorage.setItem("user_id",response.user_id)
        sessionStorage.setItem("board_id",response.board_id)
      }).then(function(){
        findOrCreateBoard()
        $('body').load('index.html')
      })
    })
  } 
 //index.html
$(document).ready(function(){ 

  $wrap.append(grid)
  generateCells(grid,10)
  setCoordAttribute()
  findOrCreateBoard()
  $("#ammo").append(`${ammo}`)
  $(".square").attr("clicked", false)
    //Game play
  $(".square").on("click", function (event) {
    event.preventDefault()
    var cell = this
    var x = parseInt($(cell).attr("x"))
    var y = parseInt($(cell).attr("y"))
    // if the cell hasn't been clicked, proceed here:
    if ($(cell).attr("clicked") === "false") {
      ammoUpdate()
      if ($(cell).attr("ship") === "1") {
        hit($(cell))
        updateShip($(cell))
        gameBoard[x][y] = 2
        saveGame(0, sessionStorage.board_id)
      } else {
        miss($(cell))
        gameBoard[x][y] = 3
        saveGame(0, sessionStorage.board_id)
      }
      if (ammo === 0) {
        saveGame(2, sessionStorage.board_id)
        alert("YOU LOSE!!!! GO HOME!! DO NOT PASS GO! DO NOT COLLECT $200!!!! SHUTUPASFLUJAHSLIDFUH")
      }
      if(sunkShips.length === 5) {
        saveGame(1, sessionStorage.board_id)
        alert("YOU BLEW UP A SHIP WON DA GAME YA YA YA")
      }
    // if cell was clicked, come here
    } else {
      alert("You clicked it already!")
    }
    // after the cell was clicked, come here
    $(cell).attr("clicked", "true")
  })

})

