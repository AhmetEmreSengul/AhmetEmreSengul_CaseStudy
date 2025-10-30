# Seesaw Torque Visualizer

A small canvas app that lets you place weighted objects on a seesaw and calculates torque.

### I used this playlist as a guide.

[![Watch the video](https://img.youtube.com/vi/EO6OkltgudE/maxresdefault.jpg)](https://youtu.be/EO6OkltgudE)

### [Watch the playlist](https://youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&si=1xBLr4tfdytw_-RM)

## How it works

- Canvas draws a seesaw centered at the canvas midpoint and circles for placed weights.
- Clicking on the seesaw adds a weight with a random mass and stores its x position.
- Torques are computed from weight × distance to the pivot.
- Target tilt angle is calculated from the left vs right torque difference.
- Live totals for left/right weights and a scrolling log of placed items are displayed in the page.

## Thought process and design decisions

- Weights are independent and they have no collision only torque matters for visualization.
- User clicks converted to seesaws position to validate clicks on the seesaw, then stored back as x position for consistency.
- Smooth motion for `tiltAngle`.
- Minimal UI: two counters and a log keep it simple.

## Trade-offs and limitations

- There is no friction and collision between circles.
- Tilt angle is limited to 30 degrees but the value is static and not calculated.
- Weights can stack on top of each other.

## AI assistance

The following parts in `script.js` were assisted by AI (also annotated in code):

- Rotation math for transforming click coordinates
  - `rotX = dx * Math.cos(-rot) - dy * Math.sin(-rot)`
  - `rotY = dx * Math.sin(-rot) + dy * Math.cos(-rot)`
- Smooth animation
  - `activeAngle += (tiltAngle - activeAngle) * 0.1` => my version was `activeAngle == tilAngle` I couldnt do the smooth animation part
- Color mapping of weights
  - `hsl(${circle.weight * 36}, 70%, 60%)` => my version was `rgb(${Math.random(circle.weight,${Math.random(circle.weight,${Math.random(circle.weight)}` which did work but the colors were very limited due to weights having a value between 1-10.
- Torque calculation
  - `weight * Math.abs(circle.distance)` => my version was `weight * circle.distance` I just forgot to take the absolute value and since the distance can be a signed value and it threw off the calculations.

## Things I wanted to add

- Add a reset animation that has a gravity simulation similar to [this](https://youtu.be/3b7FyIxWW94?si=TENJG36XMmvZ3rbW).
- Add collison so weights cant stack on top of each other.
- Tilt based on inertia.
