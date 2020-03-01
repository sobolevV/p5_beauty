// canvas size
let width = 800;
let height = 600;
// params for vectors directions
let step = 20;
var noise_step = 0.1;
var zoff = Math.random();

var rows;
var cols;
// drawing particles
let particlesCount = 1000;
var particles = new Array(particlesCount);
// grid of vectors
var directions;

let frame_index = 0;


function setup()
{
    createCanvas(width, height);
    // grid sizes for vectors
    rows = floor(height / step);
    cols = floor(width / step);

    // array of points
    for (let i=0; i<particlesCount; i++){
        particles[i] = new Particle(width, height);
    }
    
    // field of vector directions
    directions = new Array(rows);
    for (let i=0; i<directions.length; i++){
        directions[i] = new Array(cols);
    }
    frameDiv = document.getElementById("fr");
}

function draw()
{
    // background(255);
    let xoff = 0;
    for (let i=0; i < cols; i++){
        let yoff = 0;
        for (let j=0; j < rows; j++){

            let angle = noise(xoff, yoff, zoff)  * TWO_PI * 1.2;
            let rotVector = p5.Vector.fromAngle(angle);
            directions[j][i] = rotVector.mult(3); 
            // draw vector
            stroke(0, 100)
            // strokeWeight(2);
            push();
            translate(i*step, j*step);
            // rotate(rotVector.heading());
            // line(0, 0, step, 0);
            pop();

            yoff += noise_step;
        }
        xoff += noise_step;
        zoff += 0.0005;
    }
    

    drawParticles(particles, directions);

    frameDiv.innerText = floor(frameRate())
}

function drawParticles(particles, directions){
    for (let particle of particles){
        // calc. positions in grid of vectors
        let x_pos = floor(particle.pos.x / step);
        let y_pos = floor(particle.pos.y / step);
        
        if (x_pos >= cols){ x_pos = cols - 1; }
        if (y_pos >= rows){ y_pos = rows - 1; }
        if (x_pos < 0){ x_pos = 0}
        if (y_pos < 0){ y_pos = 0}

        let force = directions[y_pos][x_pos];
        
        particle.applyForce(force);
        particle.checkBounds();
        particle.update();
        // console.log(particle.prevPos, particle.pos)
        particle.show();
    }
}

function mousePressed() {
    saveFrames('out', 'png', 15, 5);
}