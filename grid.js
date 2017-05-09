$(document).ready(function(){
  const $wrap = $('#wrap')
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
})
