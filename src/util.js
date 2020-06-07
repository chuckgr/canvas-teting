//--------------------------------------------------------------
// Contains all of the utility methods 
//--------------------------------------------------------------

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
  writeDebug(ctl, creator) {

    let canvas = document.getElementById("debug-canvas");
    let ctx = canvas.getContext("2d");
    let x = 10;
    let y = 12;
    const increment = 12;

    let newFormat = "";
    let modStr = "";

    ctx.save();
    // Clear the playing field
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.font = '12px monospace';
    ctx.fillText("Number of shapes = " + ctl.shapes.length, x, y);
    y += increment;
    ctx.fillText("Infected shapes  = " + creator.numInfected(), x, y);
    y += increment;
    ctx.fillText("Timer count      = " + ctl.timerCount, x, y);
    y += increment;
    ctx.fillText("Score            = " + ctl.score.getScore(), x, y);
    y += (increment * 2);
    ctx.fillText("    X    Y  Alive Infected Inf Days Touches Quarantined", x, y);
    const format = "xxx  yyy aaaaa   iiiii    ddd      oooo     qqqq";
    y += increment;
    newFormat = format;
    for (let i = 0; i < ctl.shapes.length; i++) {
      newFormat = numRep(i, 2) + " " + newFormat;
      modStr = numRep(ctl.shapes[i].x, 3);
      newFormat = newFormat.replace("xxx", modStr);
      modStr = numRep(ctl.shapes[i].y, 3);
      newFormat = newFormat.replace("yyy", modStr);
      modStr = strRep(ctl.shapes[i].alive);
      newFormat = newFormat.replace("aaaaa", modStr);
      modStr = strRep(ctl.shapes[i].infected);
      newFormat = newFormat.replace("iiiii", modStr);
      modStr = numRep(ctl.shapes[i].infectedDays, 3);
      newFormat = newFormat.replace("ddd", modStr);
      modStr = numRep(ctl.shapes[i].touches, 4);
      newFormat = newFormat.replace("oooo", modStr);
      modStr = strRep(ctl.shapes[i].quarantined);
      newFormat = newFormat.replace("qqqq", modStr);

      ctx.fillText(newFormat, x, y);
      y += increment;
      newFormat = format;
    }

    ctx.stroke();
    ctx.restore();

    // Format the number to l digits
    function numRep(n, l) {
      let newStr = "" + parseInt(n);
      return newStr.padStart(l, ' ');
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