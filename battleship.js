//include the audio scripts here
let radarAudio = new Audio('resources/radar.mp3')
let radioAudio = new Audio('resources/radio.mp3')
let clickAudio = new Audio('resources/clickon.mp3')
let missileAlertAudio = new Audio('resources/missilealert.mp3')
let sirenAlertAudio = new Audio('resources/siren.mp3')
let fireAudio = new Audio('resources/fire.mp3')
function playRadarAudio(){
  $('#radarcontainer').mouseover(function(){
    radarAudio.play()
  }).mouseout(function(){
    radarAudio.pause()
  })
}
function playRadioAudio(){
  $('#radiocontainer').mouseover(function(){
    radioAudio.play()
  }).mouseout(function(){
    radioAudio.pause()
  })
}
function playclickAudio(){
  $('.switch').click(function(){
    clickAudio.play()
  })
}
function playMissileAlertAudio(){
  $('#missilealert').click(function(){
    missileAlertAudio.play()
  })
}
function playSirenAudio(){
  $('#siren').click(function(){
    sirenAlertAudio.play()
  })
}
function playFireAudio(){
  $('#fire').click(function(){
    fireAudio.play()
  })
}

// render ship status
// function renderDamage(ship,status){
//   if(status == 'light'){
//     $(`#${ship}`).attr('src',`resources/${ship}lightdamage.png`)
//   } else if(status == 'half'){
//     $(`#${ship}`).attr('src',`resources/${ship}halfdamage.png`)
//   } else if(status == 'full'){
//     $(`#${ship}`).attr('src',`resources/${ship}fulldamage.png`)
//   }
// }


function battleShipSounds(){
  playRadarAudio()
  playRadioAudio()
  playclickAudio()
  playMissileAlertAudio()
  playSirenAudio()
  playFireAudio()
}

