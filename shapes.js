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
    }

    draw(context) {
        if (this.alive) {
            context.beginPath();

            let image = new Image();
            image.src = this.img;
            this.width = image.width;
            this.height = image.height;

            context.drawImage(image, this.x, this.y, 70, 70);

            /*
            image.onload = function () {
                context.drawImage(image, this.x, this.y, 70, 50);
            };
            */

            if (this.anim != null) {
                let newLoc = this.anim.animate(context, this.x, this.y);
                this.x = newLoc[0];
                this.y = newLoc[1];
            }

            if (debug) {
                context.font = '12px monospace';
                context.fillText(this.x + "," + this.y, this.x + this.l, this.y);
            }
            context.stroke();
        }
    }

}