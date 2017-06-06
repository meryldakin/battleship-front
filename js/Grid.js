class Grid{
  // move all elements of creating a dom grid here
  constructor(domContainer, size, resolution){
    this.domContainer = domContainer
    this.size = size
    this.resolution = resolution
    this.grid = createGrid()
    this.generateCells()
    this.setCoordAttribute()
  }

  render(){
    $(domContainer).append(this.grid)
  }

  createGrid(){
      let grid = this.createSquare()
      grid.setAttribute("class","grid");
      return grid;
  }

  createSquare(size){
    let square = document.createElement('div');
    square.style.height = `${size}px`;
    square.style.width = `${size}px`;
    square.setAttribute("class", "square");
    square.setAttribute("ship", 0);
    return square;
  }

  setResolution(){
    return this.grid.clientWidth/this.number
  }

  generateCells(){
    for(var i =0; i < this.resolution*this.resolution; i++){
      let square = createSquare(this.setResolution());
      square.setAttribute("id",i+1)
      grid.append(square)
    }
  }
}
// let $wrap = $('#board-container')
// $wrap.append(grid)
// var grid = createGrid(780)
// generateCells(grid,10)
// setCoordAttribute()
