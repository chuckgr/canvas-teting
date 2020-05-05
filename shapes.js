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
        this.strokeStyle = "rgb(" + Math.floor((Math.random() * 255)) + "," +
            Math.floor((Math.random() * 255)) + "," +
            Math.floor((Math.random() * 255)) + ")";
        this.alive = true;
        this.exploding = 0;
        this.eFactor = 2;
    }

    // -------------------------------------------------------------
    // Add the class that will determine the next x,y location of 
    // this object based on the type of animation type
    // -------------------------------------------------------------
    addAnimation(anim) {
        this.anim = anim;
    }

    // -------------------------------------------------------------
    // Mark this shape as dead and do not draw on the canvas
    // -------------------------------------------------------------
    kill() {
        this.alive = false;
    }

    // -------------------------------------------------------------
    // Mark this shape as exploded, then remove
    // -------------------------------------------------------------
    explode() {
        this.img = "explosion.png";
        this.exploding = 6;
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
        if (this.alive) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = this.strokeStyle;
            context.fillStyle = this.strokeStyle;

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
        if (this.alive) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = this.strokeStyle;
            context.fillStyle = this.strokeStyle;

            if (this.anim != null) {
                let newLoc = this.anim.animate(context, this.x, this.y);
                this.x = newLoc[0];
                this.y = newLoc[1];
            }
            context.fillRect(this.x, this.y, this.l, this.l);
            if (debug) {
                context.font = '12px monospace';
                context.fillText(this.x + "," + this.y, this.x + this.l, this.y);
            }
            context.stroke();
        }
    }

}

// -------------------------------------------------------------
// Class for a image
// -------------------------------------------------------------
class UserImage extends Shape {
    constructor(x, y, l, img) {
        super(x, y);
        this.l = l;
        this.img = img;
        this.width = 60;
        this.height = 60;
        this.type = "";
    }


    //-------------------------------------------------------------
    // Draw the shape on the canvas with the current x,y location
    // TODO - Fix issue with loading resources at game time
    //      - Move explosion code to new ExplosionAnimation class 
    //-------------------------------------------------------------
    draw(context) {
        if (this.alive) {
            context.save();
            context.beginPath();

            if (this.anim != null) {
                this.anim.animate(context, this);
            }

            let image = new Image();
            image.src = this.img;

            context.drawImage(image, this.x, this.y, this.width, this.height);

            if (debug) {
                context.font = '12px monospace';
                context.fillText(this.x + "," + this.y, this.x + this.l, this.y);
            }
            context.stroke();
            context.restore();
        }
    }

    // -------------------------------------------------------------
    // Mark this shape as exploded, then remove
    // -------------------------------------------------------------
    explode() {
        this.addAnimation(new ExplosionAnimation(10, 10, 10));
    }

}