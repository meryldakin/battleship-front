class Gameplay {

  // initialize game with randomly generated ships
  // Player makes a guess with click
  // Cell reflects a hit or a miss
  // Cell informs ship if it's been hit
  // Player's ammo reduces by one
  //
  var ammo = 5

  $("#start-game").on('click', function () {


  })

  $(".square").on("click", function (event) {
    event.preventDefault()
    ammo --
    $("#ammo").append(`${ammo}`)
    console.log(`I was clicked and my id is ${this.id}`)
    //ask cell if ship is present
  })

  function cellStatus(boardPosition) {
    // boardPosition === board[a][b], where a === row #, b === col #
    return boardPosition
  }

}
