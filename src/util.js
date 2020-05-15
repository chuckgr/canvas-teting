//--------------------------------------------------------------
// Contains all of the utility methods 
//--------------------------------------------------------------

//--------------------------------------------------------------
// Check for collisions
//--------------------------------------------------------------
function checkCollisions(shapes, infected) {
  let nub = 0;
  const IMGWIDTH = 30;
  let touchRan = 0;
  let found = false;
  for (let i = 0; i < infected.length; i++) {
    for (let j = 0; j < shapes.length; j++) {
      if (shapes[infected[i]].alive && /*!shapes[j].infected &&*/ shapes[j].alive) {
        if (infected[i] != j) {
          if ((shapes[infected[i]].x < shapes[j].x + IMGWIDTH &&
              shapes[infected[i]].x + IMGWIDTH > shapes[j].x) &&
            shapes[infected[i]].y < shapes[j].y + IMGWIDTH &&
            shapes[infected[i]].y + IMGWIDTH > shapes[j].y) {

            touchRan = Math.round(Math.random() * TOUCHRANDOM);

            if (!sameTouch.includes(j) && touchRan == 1) {
              shapes[j].touch();
              sameTouch = [];
              sameTouch.push(j);
            }

            if (!infected.includes(j) && shapes[j].infected) {
              infected.push(j);
            }

          }
        }
      }
    }
  }
}

//--------------------------------------------------------------
// Debug class
//--------------------------------------------------------------
class Debug {
  constructor() {
    //--------------------------------------------------------------
    // Create the debug canvas as a child of the div with id of test-canvas
    //--------------------------------------------------------------
    this.canvas = "";
    this.canvas = document.createElement('canvas');
    this.canvas.id = "debug-canvas";
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.canvas.style.zIndex = 8;
    this.canvas.style.border = "solid 3pt rgb(8, 112, 248)";
    const div = document.getElementById("test-canvas");
    div.appendChild(this.canvas);
  }

  //--------------------------------------------------------------
  // Display shape debug info in debug canvas
  //--------------------------------------------------------------
  writeDebug(ctl) {

    let canvas = document.getElementById("debug-canvas");
    let ctx = canvas.getContext("2d");
    let x = 10;
    let y = 12;
    const increment = 12;

    let newFormat = "";
    let modStr = "";

    ctx.save();
    // Clear the playing field
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000000";
    ctx.font = '12px monospace';
    ctx.fillText("Number of shapes = " + ctl.shapes.length, x, y);
    y += increment;
    ctx.fillText("Infected shapes  = " + ctl.infectedShapes.length, x, y);
    y += increment;
    ctx.fillText("Timer count      = " + ctl.timerCount, x, y);
    y += (increment * 2);
    ctx.fillText("  X     Y  Alive Infected Infected Days Touches", x, y);
    const format = "xxxx  yyyy aaaaa   iiiii       dddd       oooo";
    y += increment;
    newFormat = format;
    for (let i = 0; i < ctl.shapes.length; i++) {
      modStr = numRep(ctl.shapes[i].x);
      newFormat = newFormat.replace("xxxx", modStr);
      modStr = numRep(ctl.shapes[i].y);
      newFormat = newFormat.replace("yyyy", modStr);
      modStr = strRep(ctl.shapes[i].alive);
      newFormat = newFormat.replace("aaaaa", modStr);
      modStr = strRep(ctl.shapes[i].infected);
      newFormat = newFormat.replace("iiiii", modStr);
      modStr = numRep(ctl.shapes[i].infectedDays);
      newFormat = newFormat.replace("dddd", modStr);
      modStr = numRep(ctl.shapes[i].touches);
      newFormat = newFormat.replace("oooo", modStr);

      ctx.fillText(newFormat, x, y);
      y += increment;
      newFormat = format;
    }

    ctx.restore();

    // Format the number to 3 digits
    function numRep(n) {
      let newStr = "";
      let newN = parseInt(n);
      if (newN === 0) {
        newStr = "0000";
      } else if (newN < 10) {
        newStr = "000" + n;
      } else if (newN < 100) {
        newStr = "00" + n;
      } else if (newN < 1000) {
        newStr = "0" + n;
      } else {
        newStr = "" + n;
      }
      return newStr;
    }

    // Format the string to 5 chars
    function strRep(s) {
      let newStr = Boolean(s).toString();
      if (newStr.length < 5) {
        newStr = " " + s;
      }
      return newStr;
    }
  }
}