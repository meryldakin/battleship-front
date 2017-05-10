$(document).ready(function(){
  const $wrap = $('#board-container')
  var grid = createGrid(700)
  var shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: [true, true, true, true, true]},
           {type: "cruiser", shipLength: 4, positionArray: [], statusArray: [true, true, true, true]},
           {type: "destroyer", shipLength: 3, positionArray: [], statusArray: [true, true, true]},
           {type: "submarine", shipLength: 3, positionArray: [], statusArray: [true, true, true]},
           {type: "frigate", shipLength: 2, positionArray: [], statusArray: [true, true]}
           ]
  var ammo = 5
  var hitShips = []

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
    console.log(this)
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

// calls

$wrap.append(grid)
generateCells(grid,10)
setCoordAttribute()
shipRandomizer(shipTypes)
$("#ammo").append(`${ammo}`)
  
  $(".square").attr("clicked", false)

  $(".square").on("click", function (event) {
    event.preventDefault()
    var cell = this
    if ($(cell).attr("clicked") === "false") {
      ammo --
      $("#ammo").empty()
      $("#ammo").append(`AMMO REMAINING: ${ammo}`)
      if ($(cell).attr("ship") === "1") {
        $(cell).append('<img src="Fire-icon.png"/>')
        hitShips.push($(cell).attr("id"))
        console.log(`You hit a piece of a ship! Its id was ${this.id}`)
      } else {
        $(cell).append('<img src="target.png"/>')
        console.log("Ya missed!")
      }
      if (ammo === 0) {
        alert("Game over bitches")
      }
      if(hitShips.length === 3) {
        alert("YOU BLEW UP A SHIP WON DA GAME YA YA YA")
      }
    } else {
      alert("You did it already dummy")
    }
    $(cell).attr("clicked", "true")
    console.log(hitShips)
  })
})