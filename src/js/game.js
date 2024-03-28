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

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
};

let lastKey = "";

const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

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
  context.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((b) => {
    b.drawBoundary();
    if (
      player.position.y - player.radius + player.velocity.y <=
        b.position.y + b.height &&
      player.position.x - player.radius + player.velocity.y <=
        b.position.x + b.width &&
      player.position.x + player.radius + player.velocity.x >= b.position.x &&
      player.position.y + player.radius + player.velocity.y >= b.position.y
    ) {
      player.velocity.y = 0;
      player.velocity.x = 0;
    }
  });
  player.update();
  // player.velocity.y = 0;
  // player.velocity.x = 0;

  if (keys.w.pressed && lastKey === "w") {
    player.velocity.y = -5;
  } else if (keys.a.pressed && lastKey === "a") {
    player.velocity.a = -5;
  } else if (keys.s.pressed && lastKey === "s") {
    player.velocity.y = 5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.a = 5;
  }
}
animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
  console.log(lastKey);
});
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
