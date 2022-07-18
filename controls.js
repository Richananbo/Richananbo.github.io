class Controls {
  constructor(host=false) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.backward = false;
    this.playing = false;
    this.host = host;

    this.#addKeyboardListeners();
  }

  #addKeyboardListeners() {

    document.onkeydown=(event)=>{
      if (!this.playing && this.host) {
        this.audio = new Audio('coconut.wav');
        this.audio.play();
        this.playing = true;
      }


      switch(event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
      case "ArrowRight":
        this.right = true;
        break;
      case "ArrowUp":
        this.forward = true;
        break;
      case "ArrowDown":
        this.backward = true;
        break;

      }
      //console.table(this);
    }

    document.onkeyup=(event)=>{
      switch(event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
      case "ArrowRight":
        this.right = false;
        break;
      case "ArrowUp":
        this.forward = false;
        break;
      case "ArrowDown":
        this.backward = false;
        break;

      }
    }
  }


}
