$(document).ready(function(){
  const $wrap = $('#board-container')
  var grid = createGrid(700)
  var gameBoard;
  var shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: []},
           {type: "cruiser", shipLength: 4, positionArray: [], statusArray: []},
           {type: "destroyer", shipLength: 3, positionArray: [], statusArray: []},
           {type: "submarine", shipLength: 3, positionArray: [], statusArray: []},
           {type: "frigate", shipLength: 2, positionArray: [], statusArray: []}
           ]

  var ammo = 5
  var sunkShips = []


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


// Ship


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
      updateGrid(x, y);
      board[x][y] = 1
    }
  }

  function updateGrid(x ,y) {
    let $square = $(`.${x}${y}`)
    return $square.attr("ship", 1)
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
// FIX THIS GAME_ID!!!!!!!
  function ajaxBoardCreate() {
    $.ajax({
      url: 'http://localhost:3000/boards',
      method: 'POST',
      data: {
        game_id: 2,
        status: shipRandomizer(shipTypes)
      }
    }).then(function (data) {
      console.log("it's successful", data)
    }, function(err){
      console.log(err)
  })
}

// calls

$wrap.append(grid)
generateCells(grid,10)
setCoordAttribute()
// shipRandomizer(shipTypes)
ajaxBoardCreate()
$("#ammo").append(`${ammo}`)
$(".square").attr("clicked", false)
//Game play
  $(".square").on("click", function (event) {
    event.preventDefault()
    var cell = this
    console.log(cell)
    // if the cell hasn't been clicked, proceed here:
    if ($(cell).attr("clicked") === "false") {
      ammoUpdate()
      if ($(cell).attr("ship") === "1") {
        hit($(cell))
        updateShip($(cell))
      } else {
        miss($(cell))
      }
      if (ammo === 0) {
        lostGame();
      }
      if(sunkShips.length === 5) {
        alert("YOU BLEW UP A SHIP WON DA GAME YA YA YA")
      }
    // if cell was clicked, come here
    } else {
      alert("You clicked it already!")
    }
    // after the cell was clicked, come here
    $(cell).attr("clicked", "true")
  })

function ammoUpdate(){
  ammo --
  $("#ammo").html(`AMMO REMAINING: ${ammo}`)
}

function hit(cell) {
  cell.append('<img src="Fire-icon.png"/>')
  console.log(`You hit a piece of a ship! Its id was ${this.id}`)
}

function miss(cell) {
  cell.append('<img src="target.png"/>')
  console.log("Ya missed!")
}

// var shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: []},
//          {type: "cruiser", shipLength: 4, positionArray: [], statusArray: []},
//          {type: "destroyer", shipLength: 3, positionArray: [], statusArray: []},
//          {type: "submarine", shipLength: 3, positionArray: [], statusArray: []},
//          {type: "frigate", shipLength: 2, positionArray: [], statusArray: []}
//          ]

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
  hitShip.statusArray.push(true)
  if(hitShip.statusArray.length === hitShip.shipLength) {
    sunkShips.push(hitShip)
    alert(`You sunk my ${hitShip.type}!`)
  }
}

function lostGame() {
  alert("Game Over")
  console.log(gameBoard)
  $.ajax({
    url: 'http://localhost:3000/boards/1',
    method: 'PUT',
    data: { game_id: 1,
            status: gameBoard},
    dataType: "JSON"
  }).then(function(data){
    console.log(data)
  }, function(err){
    console.log(err)
  })
}


})
