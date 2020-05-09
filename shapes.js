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
        /*
        this.strokeStyle = "rgb(" + Math.floor((Math.random() * 255)) + "," +
            Math.floor((Math.random() * 255)) + "," +
            Math.floor((Math.random() * 255)) + ")";
            */
        this.alive = true;
        this.exploding = 0;
        this.eFactor = 2;
        this.infected = false;
        this.infectedDays = 0;
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
// Class for a image
// -------------------------------------------------------------
class UserImage extends Shape {
    constructor(x, y, l, img) {
        super(x, y);
        this.image = new Image();
        this.facemask = new Image();
        this.img = img;
        this.width = l;
        this.height = l;
        this.type = "";
        this.touches = 0;
        this.touched = false;
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

            this.image.src = this.img;


            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (this.infected && (this.infectedDays >= INCUBATIONDAYS && this.infectedDays < DEATHDAYS)) {
                this.facemask.src = "facemask.png";
                context.drawImage(this.facemask, this.x, this.y, this.width, this.height);
            }

            if (debug) {
                context.font = '12px monospace';
                context.strokeStyle = "rgb(111,022,033)";
                //context.fillText(this.x + "," + this.y, this.x + this.l, this.y);
                context.fillText(this.infectedDays, this.x + this.l, this.y + 10);
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

    // -------------------------------------------------------------
    // This shape is infected
    // -------------------------------------------------------------
    touch() {
        this.touches++;
        this.touched = true;
        if (this.touches > TOUCHESTOINFECT * 5) {
            this.infected = true;
        }
    }

    // -------------------------------------------------------------
    // This shape is infected
    // -------------------------------------------------------------
    infect() {
        this.touches++;
        this.infected = true;

    }
    // -------------------------------------------------------------
    // Called from the timer tick to indicate a new day of incubation
    // -------------------------------------------------------------
    addInfectedDay() {
        this.infectedDays++;
        if (this.infectedDays == INCUBATIONDAYS) {
            if (this.touched) {
                this.infected = true;
            }
        } else if (this.infectedDays == DEATHDAYS) {
            //this.alive = false;
            this.img = "red-skull.png";
        }
    }

}