class Square {

	constructor(id,  ){
		this.id = id

	}
}

function createSquare(size){
    let square = document.createElement('div');
    square.style.height = `${size}px`;
    square.style.width = `${size}px`;
    square.setAttribute("class", "square");
    return square;
  }