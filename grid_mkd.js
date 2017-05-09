$(document).ready(function(){




  const $wrap = $('#board-container')
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
  var ammo = 5
  $("#ammo").append(`${ammo}`)
  $(".square").val(false)
  $(".square#1").val(true)
  $(".square#2").val(true)
  $(".square#3").val(true)


  $(".square").on("click", function (event) {
    event.preventDefault()
    var hitShips = []
    var cell = this
    var hasShip = cell.val()
    ammo --
    $("#ammo").empty()
    $("#ammo").append(`AMMO REMAINING: ${ammo}`)
    console.log(cell)
    if (cell.ship === true) {
      hitShips.push(cell)
      console.log(`You hit a piece of a ship! Its id was ${this.id}`)
    }
    if (ammo === 0) {
      alert("Game over bitches")
    }
  })

})
