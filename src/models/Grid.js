class Grid {
  constructor(size) {
    this.size = size
    this.grid = this.createGrid()
    this.generateCells()
    this.setCoordAttribute()
  }
  renderGrid(){
    var $wrap = $('#board-container')
    $wrap.append(this.grid)
  }
  createGrid(){
    let grid = createSquare(this.size)
    grid.setAttribute("class","grid");
    return grid;
  }

  createSquare(){
    let square = document.createElement('div');
    square.style.height = `${this.size}px`;
    square.style.width = `${this.size}px`;
    square.setAttribute("class", "square");
    square.setAttribute("ship", 0);
    return square;
  }

  setResolution(){
    return this.grid.clientWidth/10
  }

  generateCells(){
    for(var i =0; i < 100; i++){
      let square = createSquare(setResolution(this.grid,10));
      square.setAttribute("id",i+1)
      this.grid.append(square)
    }
  }

  setCoordAttribute(){
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
}
