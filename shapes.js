//--------------------------------------------------------------
// Contains all of the shape classes used for canvas testing
//--------------------------------------------------------------

// -------------------------------------------------------------
// Base class for a shape
// -------------------------------------------------------------
class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // -------------------------------------------------------------
    // Add the class that will determine the next x,y location of 
    // this object based on the type of animation type
    // -------------------------------------------------------------
    addAnimation(anim) {
        this.anim = anim;
    }
}

// -------------------------------------------------------------
// Class for a circle
// -------------------------------------------------------------
class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = "rgb(066,044,255)";
        context.fillStyle = "rgb(066,044,255)";
        if (this.anim != null) {
            let newLoc = this.anim.animate(context, this.x, this.y);
            this.x = newLoc[0];
            this.y = newLoc[1];
        }
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        if (debug) {
            context.font = '12px monospace';
            context.fillText(this.x + "," + this.y, this.x + this.r, this.y);
        }
        context.fill();
        context.stroke();
    }

}

// -------------------------------------------------------------
// Class for a Square
// -------------------------------------------------------------
class Square extends Shape {
    constructor(x, y, l) {
        super(x, y);
        this.l = l;
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = "rgb(166,144,255)";
        if (this.anim != null) {
            let newLoc = this.anim.animate(context, this.x, this.y);
            this.x = newLoc[0];
            this.y = newLoc[1];
        }
        context.strokeRect(this.x, this.y, this.l, this.l);
        if (debug) {
            context.font = '12px monospace';
            context.fillText(this.x + "," + this.y, this.x + this.l, this.y);
        }
        context.stroke();
    }

}