class BoardsController {

  constructor(){
    this.shipTypes = [ {type: "battleship", shipLength: 5, positionArray: [], statusArray: [true, true, true, true, true]},
             {type: "cruiser", shipLength: 4, positionArray: [], statusArray: [true, true, true, true]},
             {type: "destroyer", shipLength: 3, positionArray: [], statusArray: [true, true, true]},
             {type: "submarine", shipLength: 3, positionArray: [], statusArray: [true, true, true]},
             {type: "frigate", shipLength: 2, positionArray: [], statusArray: [true, true]}
             ]
    this.grid = new Grid(700)
  }

  create(){
    Board.create({
      //params
    }).then(function(successData) {
        this.grid.renderGrid()
    })

  }



}
