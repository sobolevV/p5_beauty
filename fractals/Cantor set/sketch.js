let width = 700;
let height = 500;
let start;
let end;

let slider;
let N; // num iterarion

function setup() {
  colorMode(HSB, 360);
  createCanvas(width, height);
  createSpan("Count iterations [1, 10]")
  slider = createSlider(2, 10, 4, 1);

  start = createVector(0, height * (1 / 3)); // start point
  end = createVector(width, height * (1 / 3)); // end point
}

function draw() {
  background(330);
  N = slider.value();
  drawLine(start, end, N); // recursion cycle for N
}

function drawLine(start, end, N) {
  if (N == 0) {
    return
  }

  let len = end.x - start.x;
  fill(30);
  strokeWeight(0);
  rect(start.x, start.y, len, 10); // draw it
  // line(start.x, start.y + 1, end.x, end.y + 1);
    
  // determine left line
  let leftLineStart = createVector(start.x, start.y + 20);
  let leftLineEnd = createVector(start.x + len * (1 / 3), start.y + 20);
  // draw left line
  drawLine(leftLineStart, leftLineEnd, N - 1);

  // determine right line
  let rightLineStart = createVector(end.x - len * (1 / 3), start.y + 20);
  let rightLineEnd = createVector(end.x, start.y + 20);
  // draw right line
  drawLine(rightLineStart, rightLineEnd, N - 1);
}