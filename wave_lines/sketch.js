let width = 600;
let height = 600;

let step_y = 5; // new line per each step_y
let step_x = 3; // new vertex per each step_x

let noise_mult = 200; // wave size
let z_off = 0.01;     // shift for perlin noise


function setup(){
    createCanvas(width, height);
}

function draw(){
    //colorMode(RGB);
    colorMode(HSB, 360);
    background(10);
    fill(10);   // fill bg. for line

    let y_off = 0; // shift noise y
    // for each line
    for (let y=step_y; y <= height + step_y*5; y += step_y){
        
        strokeWeight(2);
        beginShape();   // start line

        let color = map(y, 0, height, 280, 240) // line color
        
        let x_off = 0; // shift noise x
        // for each vertex on x-axis
        for (let x=0; x <= width; x += step_x){
            
            let noise_y = noise(x_off, y_off, z_off);  // calculate Perlin noise
            // let yy = pow(1 - dist(x, 0, width/2, 0)/(width/1.8), 2)
   
            // intesiv. of wave
            let intensity = ease(constrain(map(dist(x,y,width/2,height/2),0,0.5*width,1,0),0,1),2.0);

            stroke(color, 360, 360);
            vertex(x, y - (intensity * noise_y)*noise_mult); // draw vertex 
            x_off += 0.05;    
        }
        endShape(); // close line
        y_off += 0.07;
    }
    
    z_off += 0.004;

    // if (frames <= 30 && frames % 2 == 0){
    //     saveFrames("frames_", ".png", 1, 1);
    // }
    // frames += 1;
}

function ease(p) {
    return 3*p*p - 2*p*p*p;
  }
  
function ease(p, g) {
    if (p < 0.5) 
      return 0.5 * pow(2*p, g);
    else
      return 1 - 0.5 * pow(2*(1 - p), g);
  }