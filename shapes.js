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
}

// -------------------------------------------------------------
// Class for a circle
// -------------------------------------------------------------
class Circle extends Shape {
    constructor(x, y, r) {
        super(x ,y);
        this.r = r;
    }

    draw(context) {
        context.beginPath();context
        context.lineWidth = 2;
        context.strokeStyle = "rgb(166,144,255)";
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.stroke();
    }
    
}

// -------------------------------------------------------------
// Class for a Square
// -------------------------------------------------------------
class Square extends Shape {
    constructor(x, y, l) {
        super(x ,y);
        this.l = l;
    }

    draw(context) {
        context.beginPath();context
        context.lineWidth = 2;
        context.strokeStyle = "rgb(166,144,255)";
        context.strokeRect(this.x, this.y, this.l, this.l);
        context.stroke();
    }
    
}