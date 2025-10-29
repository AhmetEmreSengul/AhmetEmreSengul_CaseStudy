/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const SEESAW_LENGTH = 400;
const SEESAW_X = canvas.width / 2;
const SEESAW_Y = canvas.height / 2;

let activeAngle = 0;
let tiltAngle = 0;
let weights = [];

function torque() {
  let leftTorque = 0;
  let rightTorque = 0;
  weights.map((circle) => {
    const dist = circle.x - SEESAW_X;
    const torque = circle.weight * Math.abs(dist); // assisted by AI
    if (dist < 0) {
      leftTorque += torque;
    } else {
      rightTorque += torque;
    }
  });
  tiltAngle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
  console.log(leftTorque, rightTorque, tiltAngle);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rot = (activeAngle * Math.PI) / 180;
  const dx = x - SEESAW_X;
  const dy = y - SEESAW_Y;
  const rotX = dx * Math.cos(-rot) - dy * Math.sin(-rot); // assisted by AI
  const rotY = dx * Math.sin(-rot) + dy * Math.cos(-rot); // assisted by AI

  if (Math.abs(rotX) <= SEESAW_LENGTH / 2 && Math.abs(rotY) <= 10) {
    weights.push({
      x: SEESAW_X + rotX,
      weight: Math.random() * 9 + 1,
      distance: x - SEESAW_X,
    });
    console.log("Created object:", weights);
  } else {
    console.log("missed");
  }
  torque();
});

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  activeAngle = tiltAngle;

  c.save();
  c.translate(SEESAW_X, SEESAW_Y);
  c.rotate((activeAngle * Math.PI) / 180);

  c.fillStyle = "#8B4513";
  c.fillRect(-SEESAW_LENGTH / 2, -10, SEESAW_LENGTH, 20);

  weights.map((circle) => {
    const localX = circle.x - SEESAW_X;
    const seesawY = -8;
    c.fillStyle = `hsl(${circle.weight * 36}, 70%, 60%)`; // assisted bu AI
    c.beginPath();
    c.arc(localX, seesawY - 15, 10, 0, Math.PI * 2);
    c.fill();
  });

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
