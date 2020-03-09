let width = 500;
let height = 500;

let balls = []; 
let checkbox, windStrength;
let ballsSlider;

function setup(){
    createCanvas(width, height);
    let container = createDiv();
    container.style("width", String(width)+'px');
    // sutup containers for params 
    let windContainer = createDiv().id("windContainer");
    let ballsContainer = createDiv().id("ballsContainer");
    container.child(windContainer); 
    container.child(ballsContainer);

    // wind container
    checkbox = createCheckbox('Add wind', false);
    windStrength = createSlider(0, 5, 1, 0.5);
    windContainer.child(createSpan('Wind forces:')).child(checkbox);
    windContainer.child(createDiv('Force strength:')).child(windStrength);
    windContainer.style("display", "flex");
    windContainer.style("justify-content", "space-around");
    // balls container
    ballsSlider = createSlider(1, 30, 5, 1);
    ballsContainer.child(createDiv('Balls count: ')).child(ballsSlider);
    
    ballsContainer.style("display", "flex");
    ballsContainer.style("justify-content", "center");
    
    
    for (let i=0; i < ballsSlider.value(); i++){
        balls.push(new Ball());
    }
}

function draw(){
    background(50);
    // balls count changed
    if (ballsSlider.value() != balls.length){
        editBalls();
    }
    for (ball of balls){
        // wind force apply
        if (checkbox.checked()){
            let center = createVector(width/2, height/2);
            let mousePos = createVector(mouseX, mouseY);
            let wind = p5.Vector.sub(mousePos, center);
            wind.normalize();
            wind.mult(windStrength.value());
            drawVector(wind);
            ball.addForce(wind);    
        }
        ball.update();
        ball.show();
    }
}

// vector of wind direction
function drawVector(wind){
    stroke(150, 100);
    strokeWeight(1);
    line(width/2, height/2, width/2 + wind.x*20, height/2 + wind.y*20)
    fill(200, 0, 150, 150);
    strokeWeight(0);
    circle(width/2 + wind.x*20, height/2 + wind.y*20, 3);
}

function editBalls(){
    // remove balls
    if (ballsSlider.value() < balls.length){
        while (ballsSlider.value() < balls.length){
            balls.pop();
        }
    }
    // add balls
    if (ballsSlider.value() > balls.length){
        while (ballsSlider.value() > balls.length){
            balls.push(new Ball());
        }
    }
}