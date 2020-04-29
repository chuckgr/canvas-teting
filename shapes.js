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


    // -------------------------------------------------------------
    // Draw the shape on the canvas with the current x,y location
    // -------------------------------------------------------------
    draw(context) {
        if (this.alive) {
            context.beginPath();

            let image = new Image();
            image.src = this.img;
            //this.width = image.width;
            //this.height = image.height;

            context.drawImage(image, this.x, this.y, this.width, this.height);

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

            // Are we exploding?
            if (this.exploding > 0) {
                this.exploding--;

                // reposition based on the size of the shape
                if (debug) {
                    console.log(`draw:before  x=${this.x} y=${this.y} w=${this.width} h=${this.height}`);
                }
                this.x = this.x + (this.width - (this.width / this.eFactor));
                this.y = this.y + (this.height - (this.height / this.eFactor));
                this.width = this.width / this.eFactor;
                this.height = this.height / this.eFactor;
                if (debug) {
                    console.log(`draw:after  x=${this.x} y=${this.y} w=${this.width} h=${this.height}`);
                }
                if (this.exploding <= 0) {
                    this.alive = false;
                }
            }
        }
    }

    // -------------------------------------------------------------
    // Mark this shape as exploded, then remove
    // -------------------------------------------------------------
    explode() {
        this.img = "explosion.png";
        this.exploding = 3;

        if (debug) {
            console.log(`explode:before x=${this.x} y=${this.y} w=${this.width} h=${this.height}`);
        }
        this.x = this.x - (((this.width * this.eFactor) - this.width) / 2);
        this.y = this.y - (((this.height * this.eFactor) - this.height) / 2);
        this.width = this.width * this.eFactor;
        this.height = this.height * this.eFactor;
        if (debug) {
            console.log(`explode:after x=${this.x} y=${this.y} w=${this.width} h=${this.height}`);
        }

    }

}