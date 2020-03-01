
class Particle
{
    // Drawing point
    constructor(width, height){
        this.pos = createVector(random(width), random(height));
        this.acc = createVector(0, 0);
        this.vel = createVector(0.5, 0.5);
        this.prevPos = this.pos.copy();
    }

    show() 
    {
        // noStroke();
        // fill(200, 0, 0, 200);
        // ellipse(floor(this.pos.x), floor(this.pos.y), 10, 10);
        // point(floor(this.pos.x), floor(this.pos.y)); 

        colorMode(HSB, 360, 100, 100, 100);
        let colorLine = map((this.pos.x+this.pos.y)/(width+height), 0, 1, 200, 300)
        stroke(colorLine, 100, 100, 5);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        this.prevPos = this.pos.copy();   
    }

    update(){
        this.acc.add(this.vel);
        this.pos.add(this.acc);
        this.acc.mult(0);
    }

    applyForce(force){
        this.acc.add(force);
    }

    checkBounds(){
        if (this.pos.x > width){
            this.pos.x = 0;
            this.prevPos = this.pos.copy();
        }
        if (this.pos.y > height){
            this.pos.y = 0;
            this.prevPos = this.pos.copy();
        }
        if (this.pos.x < 0){
            this.pos.x = width;
            this.prevPos = this.pos.copy();
        }
        if (this.pos.y < 0){
            this.pos.y = height;
            this.prevPos = this.pos.copy();
        }
        
    }
}