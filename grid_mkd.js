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
  $(".square").attr("ship", false)
  $(".square").attr("clicked", false)
  $(".square#1").attr("ship", true)
  $(".square#2").attr("ship", true)
  $(".square#3").attr("ship", true)



  var hitShips = []
  $(".square").on("click", function (event) {
    event.preventDefault()
    var cell = this
    if ($(cell).attr("clicked") === "false") {
      ammo --
      $("#ammo").empty()
      $("#ammo").append(`AMMO REMAINING: ${ammo}`)
      if ($(cell).attr("ship") === "true") {
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
