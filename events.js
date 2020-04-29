//--------------------------------------------------------------
// Contains all of the methods to manage events on the canvas
//--------------------------------------------------------------

//----------------------------------------------------------
// Method to add the listener to the canvas and specify
// the function to call when fired
//----------------------------------------------------------
function addListener(canvElem, shapes) {
  let canvLeft = canvElem.offsetLeft + canvElem.clientLeft;
  let canvTop = canvElem.offsetTop + canvElem.clientTop;
  let ctx = canvElem.getContext('2d');

  canvElem.addEventListener('click', handleClick);

  //----------------------------------------------------------
  // Gets called when the mouse is clicked in the canvas
  //
  // Sound from M4A to MP3
  // ffmpeg -i New\ Recording.m4a -acodec mp3 -ac 2 -ab 192k we-will-get-through-this.mp3
  //----------------------------------------------------------
  function handleClick(event) {
    let x = event.pageX - canvLeft;
    let y = event.pageY - canvTop;

    // Shoot the gun
    shot.play();

    console.log(`event at ${x}, ${y}`);
    for (let i = 0; i < shapes.length; i++) {
      if (y > shapes[i].y && y < shapes[i].y + shapes[i].height && x > shapes[i].x && x < shapes[i].x + shapes[i].width) {
        shapes[i].explode();
        // if it's the rona play the explosion sound
        if (shapes[i].type == 1) {
          explode.play();
        }

        if (debug) {
          console.log(`Hit at ${x}, ${y} for item at [${i}] at ${shapes[i].x}, ${shapes[i].y}, ${shapes[i].width}, ${shapes[i].height} type=${shapes[i].type}`);
        }
        break;
      }
    }
  }
}