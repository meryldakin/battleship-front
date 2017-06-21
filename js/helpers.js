function battleShipSounds(){
  let radarAudio = new Sound('resources/audio/radar.mp3','#radarcontainer')
  let radioAudio = new Sound('resources/audio/radio.mp3','#radiocontainer')
  let clickAudio = new Sound('resources/audio/clickon.mp3','.switch')
  let missileAlertAudio = new Sound('resources/audio/missilealert.mp3','#missilealert')
  let sirenAlertAudio = new Sound('resources/audio/siren.mp3','#siren')
  let fireAudio = new Sound('resources/audio/fire.mp3','#fire')

  radarAudio.playOnHover()
  radioAudio.playOnHover()
  clickAudio.playOnClick()
  missileAlertAudio.playOnClick()
  sirenAlertAudio.playOnClick()
  fireAudio.playOnClick()
}

function loggedIn(){
  return true;
  // return sessionStorage.user_id ? true : false
}

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

function validateStartPos() {
  var array = generateStartPos(); // [2,2]
  while(board[array[0]][array[1]] !== 0) {
    array = generateStartPos();
  }
  return array;
}

function updateGrid(x ,y, value) {
  let $square = $(`.${x}${y}`)
  return $square.attr("ship", value)
}

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
