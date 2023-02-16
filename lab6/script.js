const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function updateVal(){
  BALL_COUNT = document.getElementById("ballscount").value;
  LINE_DISTANCE = document.getElementById("linedistance").value;
}


//const BALL_COUNT = ballscount;
const BALL_RADIUS = 10;
const BALL_SPEED = 3;
//const LINE_DISTANCE = linedistance;

let balls = [];
let animationFrame;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(ball1, ball2) {
  const distance = Math.sqrt((ball2.x - ball1.x) ** 2 + (ball2.y - ball1.y) ** 2);
  if (distance < LINE_DISTANCE) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.stroke();
  }
}

function updateBall(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.x - BALL_RADIUS < 0 || ball.x + BALL_RADIUS > canvas.width) {
    ball.vx *= -1;
  }

  if (ball.y - BALL_RADIUS < 0 || ball.y + BALL_RADIUS > canvas.height) {
    ball.vy *= -1;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball1, i) => {
    drawBall(ball1.x, ball1.y);

    balls.slice(i + 1).forEach(ball2 => {
      drawLine(ball1, ball2);
    });

    updateBall(ball1);
  });

  animationFrame = requestAnimationFrame(update);
}

function init() {
  balls = Array.from({ length: BALL_COUNT }, () => ({
    x: randomInt(BALL_RADIUS, canvas.width - BALL_RADIUS),
    y: randomInt(BALL_RADIUS, canvas.height - BALL_RADIUS),
    vx: randomInt(-BALL_SPEED, BALL_SPEED),
    vy: randomInt(-BALL_SPEED, BALL_SPEED),
  }));

  update();
}

function start() {
  if (!animationFrame) {
    updateVal();
    init();
  }
}

function reset() {
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
  balls = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("ballscount").addEventListener("click", updateVal);
document.getElementById("ballscount").addEventListener("click", reset);
document.getElementById("ballscount").addEventListener("click", start);
document.getElementById("linedistance").addEventListener("click", updateVal);
document.getElementById("linedistance").addEventListener("click", reset);
document.getElementById("linedistance").addEventListener("click", start);