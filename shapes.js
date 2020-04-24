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
        context.strokeStyle = "rgb(166,144,255)";
        if (this.anim != null) {
            let newLoc = this.anim.animate(context, this.x, this.y);
            this.x = newLoc[0];
            this.y = newLoc[1];
        }
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
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
        context.strokeRect(this.x, this.y, this.l, this.l);
        context.stroke();
    }

}