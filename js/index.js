// model for game
// model for grid
// model for ships
// model for users
var gameBoard;
var shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: []},
           {type: "cruiser", shipLength: 4, positionArray: [], statusArray: []},
           {type: "destroyer", shipLength: 3, positionArray: [], statusArray: []},
           {type: "submarine", shipLength: 3, positionArray: [], statusArray: []},
           {type: "frigate", shipLength: 2, positionArray: [], statusArray: []}
           ]
let $wrap = $('#board-container')
var grid = createGrid(780)
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


function findOrCreateBoard() {

  if(sessionStorage.board_id === "0" || sessionStorage.board_id === "null" || sessionStorage.board_ships === "" || sessionStorage.board_ships === "undefined"){
    ajaxBoardCreate()

  } else {

    ajaxBoardGet().then(function(data){
      console.log("reRender old game:", data)
      sessionStorage.board_id = data.id
      reRenderBoard(data.status)
      gameBoard = data.status
      assignShips(data.ship)
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

    var newBoard = shipRandomizer(shipTypes)
    var positions = shipTypes.map(function(ship){
      return ship.positionArray.join(",")
    })

    var hits = shipTypes.map(function(ship){
      return ship.statusArray.join(",")
    })

    $.ajax({
      url: 'http://localhost:3000/boards',
      method: 'POST',
      data: {
        user_id: sessionStorage.user_id,
        ammo: ammo,
        gameResult: 0,
        status: newBoard,
        ship: positions,
        hits: hits
      }
    }).then(function (data) {
      sessionStorage.board_id = data.id
      sessionStorage.board_ships = data.ship
      sessionStorage.board_hits = data.hits
      assignShips(data.ship)
      console.log("it's successful", data)
    }, function(err){
      console.log( "Sup tony!",err)
  })
}

function assignHits(shipHitArray) {
  var idx = 0
  var hits
  shipTypes.forEach(function(ship){
    hits = shipHitArray[idx].split(",")
    for (var i = 0; i < hits.length; i++) {
        ship.statusArray.push(hits[i])
      }
    idx ++
  })
}

function assignShips(sessionPositionArray) {
  var idx = 0
  var position
  shipTypes.forEach(function(ship){
    position = sessionPositionArray[idx].split(",")
    for (var i = 0; i < ship.shipLength; i++) {
        var x = parseInt(position.shift())
        var y = parseInt(position.shift())
        var coords = [x, y]
        ship.positionArray.push(coords)
      }
    idx ++
    updateBoard(ship.positionArray)
  })
  console.log(shipTypes)
}

// el 1 "9,7,5,7,6,7,7,7,8,7"    6,6,6,3,6,4,6,5,3,4,3,2,3,3,0,3,2,3,1,3,6,9,6,8"

function saveGame(gameResult,boardId, statusArray, positionArray){
  $.ajax({
    url: `http://localhost:3000/boards/${boardId}`,
    method: 'PUT',
    data: { user_id: sessionStorage.user_id,
            ammo: ammo,
            game_result: gameResult,
            status: gameBoard,
            ship: positionArray,
            hits: statusArray
          },
          success: console.log("we're saving"),

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
  if ($square === "2") {
    hit($square)
  } else if ($square === "3"){
    miss($square)
  }
  return $square.attr("ship", value)
}

function hit(cell) {
  cell.append('<img src="resources/images/Fire-icon.png"/>')
  console.log(`You hit a piece of a ship! Its id was ${this.id}`)
}

function miss(cell) {
  cell.append('<img src="resources/images/target.png"/>')
  console.log("Ya missed!")
}

function shipRandomizer (shipTypes){
  console.log("in ship randomizer:" ,shipTypes)
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


function direction(shipLength) {
  var startPos = validateStartPos();
  var n = function (pos){ return [pos[0],pos[1] --]}
  var s = function (pos){ return [pos[0],pos[1] ++]}
  var e = function (pos){ return [pos[0] ++,pos[1]]}
  var w = function (pos){ return [pos[0] --,pos[1]]}
  var directionsArray = [n,s,e,w]
  var randDirections = shuffleArray(directionsArray) // array of rand directions
  return shuffleDirections(shipLength,randDirections, startPos)
}

function shuffleDirections(shipLength, randDirections, startPos) {
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

function ammoUpdate(){
  ammo --
  $("#ammo").html(`${ammo}`)
}

function updateShip(cell) {
  var cellArray = JSON.parse(`[${$(cell).attr("x")}, ${$(cell).attr("y")}]`)
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

  hitShip.statusArray.push(true)
  if(hitShip.statusArray.length === hitShip.shipLength) {
    sunkShips.push(hitShip)
    alert(`You sunk my ${hitShip.type}!`)
  }
  console.log(hitShip)
  renderDamage(hitShip, hitShip.statusArray)
}

function renderDamage(ship,statusArray){
    if(statusArray.length === 1){
      $(`#${ship.type}`).attr('src',`resources/images/${ship.type}lightdamage.png`)
    } else if(statusArray.length === ship.shipLength){
      $(`#${ship.type}`).attr('src',`resources/images/${ship.type}fulldamage.png`)
    } else if(statusArray.length > 1 ){
      $(`#${ship.type}`).attr('src',`resources/images/${ship.type}halfdamage.png`)
    }
}

// game home page logic
//--------------------------------------------------------------------

 //index.html
$(document).ready(function(){
  shipRandomizer(shipTypes)
   if(!loggedIn()){
    if(window.location.href !== 'http://localhost:8000/pages/login.html') {
      window.location = "http://localhost:8000/pages/login.html";
    }
    // $('body').load('login.html');
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
        sessionStorage.setItem("board_ships",response.board_ships)
      }).then(function(){
        console.log("We're about to create a board")

        window.location = "http://localhost:8000/";
        // $('body').load('index.html')
      }), function(err){

      console.log(err)
      }
    })
  } else {
    findOrCreateBoard()
    battleShipSounds()
    $wrap.append(grid)
    generateCells(grid,10)
    setCoordAttribute()
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
          saveGame(0, sessionStorage.board_id, shipTypes.statusArray, sessionStorage.board_ships)
        } else {
          miss($(cell))
          gameBoard[x][y] = 3
          saveGame(0, sessionStorage.board_id, shipTypes.statusArray, sessionStorage.board_ships)
        }
        if (ammo === 0) {
          saveGame(2, sessionStorage.board_id, shipTypes.statusArray, sessionStorage.board_ships)
          alert("YOU LOSE!!!! GO HOME!! DO NOT PASS GO! DO NOT COLLECT $200!!!!")
          sessionStorage.clear()
          window.location = "http://localhost:8000/pages/login.html";
        }
        if(sunkShips.length === 5) {
          saveGame(1, sessionStorage.board_id, shipTypes.statusArray, sessionStorage.board_ships)
          alert("YOU BLEW UP A SHIP WON DA GAME YA YA YA")
          sessionStorage.clear()
          window.location = "http://localhost:8000/pages/login.html";
        }
      // if cell was clicked, come here
      } else {
        alert("You clicked it already!")
      }
      // after the cell was clicked, come here
      $(cell).attr("clicked", "true")
    })
  }

})
