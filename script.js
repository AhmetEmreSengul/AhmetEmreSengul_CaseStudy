/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const SEESAW_LENGTH = 400;
const SEESAW_X = canvas.width / 2;
const SEESAW_Y = canvas.height / 2;

let activeAngle = 15;

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.translate(SEESAW_X, SEESAW_Y);
  c.rotate((activeAngle * Math.PI) / 180);

  c.fillStyle = "#8B4513";
  c.fillRect(-SEESAW_LENGTH / 2, -10, SEESAW_LENGTH, 20);

  c.restore();

  c.fillStyle = "#333";
  c.beginPath();
  c.moveTo(SEESAW_X - 15, SEESAW_Y);
  c.lineTo(SEESAW_X + 15, SEESAW_Y);
  c.lineTo(SEESAW_X, SEESAW_Y + 15);
  c.closePath();
  c.fill();

  requestAnimationFrame(draw);
}
draw();
