class Sound {
  constructor(filepath,domElement=''){
    this.filepath = filepath
    this.audio = new Audio(filepath)
    this.domElement = domElement
  }
  playOnClick(){
    $(this.domElement).click(()=>{
      this.audio.play()
    })
  }
  playOnHover(){
    $(this.domElement).mouseover(()=>{
      this.audio.play()
    }).mouseout(()=>{
      this.audio.pause()
    })
  }
}
