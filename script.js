/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const SEESAW_LENGTH = 400;
const SEESAW_X = canvas.width / 2;
const SEESAW_Y = canvas.height / 2;

c.fillStyle = "#8B4513";
c.fillRect(SEESAW_X - SEESAW_LENGTH / 2, SEESAW_Y - 10, SEESAW_LENGTH, 20);

c.fillStyle = "#333";
c.beginPath();
c.moveTo(SEESAW_X - 15, SEESAW_Y);
c.lineTo(SEESAW_X + 15, SEESAW_Y);
c.lineTo(SEESAW_X, SEESAW_Y + 15);
c.closePath();
c.fill();
