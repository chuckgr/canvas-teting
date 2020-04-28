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
  //----------------------------------------------------------
  function handleClick(event) {
    let x = event.pageX - canvLeft;
    let y = event.pageY - canvTop;
    // Shoot the gun
    let shot = new Audio("laser-shot1.mp3");
    shot.play();
    let explode = new Audio("explosion1.mp3");

    console.log(`event at ${x}, ${y}`);
    for (let i = 0; i < shapes.length; i++) {
      if (y > shapes[i].y && y < shapes[i].y + shapes[i].height && x > shapes[i].x && x < shapes[i].x + shapes[i].width) {
        shapes[i].explode();
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