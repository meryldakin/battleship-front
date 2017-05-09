// ship randmizer

class Ship{

	constructor(type, gridLength, positionArray, statusArray) {
		this.type = type
		this.gridLength = gridLength
		this.positionArray = positionArray // an array that contains the placement of the ship on the grid
		this.statusArray = statusArray // an array of the status of each part of the ship false for not hit and true for hit destroyer.statusArray = [false, true, true]
	}
}

function range(start, edge, step) {
  
  if (arguments.length == 1) {
    edge = start;
    start = 1;
  } 
  edge = edge || 1;
  step = step || 1;
 
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var shipTypes = [ {type: "battleship", gridLength: 5, positionArray: [], statusArray: [true, true, true, true, true]}, 
				   {type: "cruiser", gridLength: 4, positionArray: [], statusArray: [true, true, true, true]}, 
				   {type: "destroyer", gridLength: 3, positionArray: [], statusArray: [true, true, true], 
				   {type: "submarine", gridLength: 3, positionArray: [], statusArray: [true, true, true]}, 
				   {type: "frigate", gridLength: 2, positionArray: [], statusArray: [true, true]} 
				   ]

function shipRandomizer (shipTypes){
	var grid = range(101);
	var startingPos = Math.floor((Math.random() * 100) + 1);
	var increase = shuffleArray([1,10, -1, -10])[0]
	
	// check if we can move in a particular direction from startPos to the gridLength
	// if successful, increment/decrement startPos and add to positionArray
	//else change startPos and check logic again

	

}


function gridValidation() {
	// checks to see if we can place ship from startPos through ship gridLength
}




