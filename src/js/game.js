const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  drawBoundary() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  drawBrownieman() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
  }

  update() {
    this.drawBrownieman();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

map.forEach((row, i) => {
  row.forEach((dash, j) => {
    switch (dash) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
        break;
    }
  });
});
function animate() {
  requestAnimationFrame(animate);
  boundaries.forEach((b) => {
    b.drawBoundary();
  });
  player.update();
}
animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      player.velocity.y = -5;
      break;
    case "a":
      player.velocity.x = -5;
      break;
    case "s":
      player.velocity.y = 5;
      break;
    case "d":
      player.velocity.x = 5;
      break;
  }
  console.log(player.velocity.x,player.velocity.y)
});
