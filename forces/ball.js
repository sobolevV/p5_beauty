class Ball{
    constructor(){
        this.pos = createVector(width/2, height/2);
        this.prevPos = this.pos.copy();
        this.vel = createVector(1., 1.);
        this.acc = createVector(random(-2, 2), random(-2, 2));
        this.rad = random(10, 30);
        this.mass = this.rad/3; 
        this.color = {'r': random(0, 255), 'g': random(0, 255), 'b': random(0, 255)};
    }

    update(){
        let Gravity = createVector(0, 0.55);
        // Ft = M * G
        Gravity.mult(this.mass);
        this.addForce(Gravity);
        
        this.vel.add(this.acc);

        this.prevPos = this.pos.copy();
        this.pos.add(this.vel); 
        this.checkEdges();
    }

    show(){
        strokeWeight(0);
        fill(this.color.r, this.color.g, this.color.b, 150);
        circle(this.pos.x, this.pos.y, this.rad*2);
    }

    addForce(force){
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
        this.acc.setMag(1);
    }

    checkEdges(){
        if (this.vel.mag() > 0){
            
            // friction
            let firction_coef = -0.9;
            let frictionForce = this.vel.copy();
            
            // check left, right edges
            if (this.pos.x + this.rad >= width || this.pos.x - this.rad <= 0){
                frictionForce.x = 0;
                if (this.pos.x + this.rad >= width){
                    this.pos.x = width - this.rad;
                }
                if (this.pos.x - this.rad <= 0){
                    this.pos.x = this.rad;
                }
                // wall
                this.vel.x *= -0.85;
                if (this.prevPos.y - this.pos.y < 0){
                    firction_coef *= -1;
                }
                
                frictionForce.mult(firction_coef);
                this.addForce(frictionForce);

            }// left & right edges

            // check top, bottom edges
            if (this.pos.y + this.rad >= height || this.pos.y - this.rad <= 0){
                frictionForce.y = 0;
                if (this.pos.y + this.rad >= height){
                    this.pos.y = height - this.rad;
                }

                if (this.pos.y - this.rad <= 0){
                    this.pos.y = this.rad;
                }
                // wall
                this.vel.y *= -0.85;

                frictionForce.mult(firction_coef);
                this.addForce(frictionForce);

            }// top & bottom edges
        }
    }// end edges


}// end class