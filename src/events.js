//--------------------------------------------------------------
// Contains all of the methods to manage events on the canvas 
// and timers.
//--------------------------------------------------------------

//----------------------------------------------------------
// Method to add the listener to the canvas and specify
// the function to call when fired for game play
//----------------------------------------------------------
function addRemoveListener(canvElem, shapes, score, type) {
  let canvLeft = canvElem.offsetLeft + canvElem.clientLeft;
  let canvTop = canvElem.offsetTop + canvElem.clientTop;

  if (type == 'remove') {
    canvElem.removeEventListener('click', handleClick);
  } else {
    canvElem.addEventListener('click', handleClick);
  }

  //----------------------------------------------------------
  // Gets called when the mouse is clicked in the canvas
  //
  // Convert sound from M4A to MP3
  // ffmpeg -i New\ Recording.m4a -acodec mp3 -ac 2 -ab 192k we-will-get-through-this.mp3
  //----------------------------------------------------------
  function handleClick(event) {
    let x = event.pageX - canvLeft;
    let y = event.pageY - canvTop;
    let hit = false;

    // Shoot the gun
    shot.play();

    if (debug) {
      //console.log(`event at ${x}, ${y}`);
    }
    if (event.type === "click") {
      for (let i = 0; i < shapes.length; i++) {
        if (y > shapes[i].y && y < shapes[i].y + shapes[i].height && x > shapes[i].x && x < shapes[i].x + shapes[i].width) {
          //shapes[i].explode();
          shapes[i].quarantine();

          hit = true;
          // if it's the rona play the explosion sound
          if (shapes[i].infected || shapes[i].alive) {
            explode.play();
            score.updateScore(1);
          } else {
            score.updateScore(2);
          }
          if (debug) {
            console.log(`Hit at ${x}, ${y} for item at [${i}] at ${shapes[i].x}, ${shapes[i].y}, ${shapes[i].width}, ${shapes[i].height} type=${shapes[i].type}`);
          }

          break;
        }
      }
      // No object was hit
      if (!hit) {
        score.missScore();
      }
    }
  }
}

//----------------------------------------------------------
// Method that gets called on the canvas click event 
// for the start of the game with a logo and instructions
//----------------------------------------------------------
function splashListener(event) {
  // Check for correct event and remove the listeners
  if (event.type === "click" || (event.type === "keydown" && event.code === "Enter")) {
    // remove events
    let canvas = document.getElementById("canvas");
    canvas.removeEventListener("click", splashListener);
    //canvas.removeEventListener("keydown", splashIO);
    controller.state = controller.playSetup;
  }
}

//----------------------------------------------------------
// Method that gets called on the canvas click event 
// for the start of the game with a logo and instructions
// TODO - Remove fixed locations for play button 
//----------------------------------------------------------
function restartGameListener(event) {
  // Check for correct event and remove the listeners
  if (event.type === "click" || (event.type === "keydown" && event.code === "Enter")) {
    if (debug) {
      console.log(` Click at x=${event.pageX}, y=${event.pageY}`);
    }

    // Remove event listener
    let canvas = document.getElementById("canvas");

    // Did they hit the play button?
    if ((event.pageX > 430 && event.pageX < 490 && event.pageY > 480 && event.pageY < 540) || event.code === "Enter") {
      if (debug) {
        console.log('restartGameListener: Play button hit');
      }
      canvas.removeEventListener("click", restartGameListener);
      board.reset();
      controller.timerCount = 0;
      controller.state = controller.playSetup;
    }
  }
}