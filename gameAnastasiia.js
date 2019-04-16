class Monster {
  constructor(x, y) {
    this.x = x; //current x position
    this.y = y; //current y position
    this.p = 1; //wish to turn
    this.dx = 0; //current x direction
    this.dy = 0; //current y direction
    this.v = S;
  }
}

class Game {
  constructor(map, speed, monsters) {
    this.map = this._createMap(map);
    this.score = 0;
    this.speed = speed;

    this.pacman = {
      x: 6, //pacman current x position
      y: 6, // pacman current y position
      dx: 0, // current x direction
      dy: 0 //current y direction
    }

    this.monsters = monsters;
    this.isFinished = false;
  }

  _createMap(m) {
    let result = [];
    for (let i = 0; i < m.length; i++) {
      result.push(m[i].slice());
    }
    return result;
  };

  startGame() {
    //this.isGameFinished() = false;
    document.onkeydown = (e) => {
      const L = 37; // left
      const U = 38; // up
      const R = 39; // right
      const D = 40; // down

      //console.log(e.keyCode)

      //choose pacman direction
      this.pacman.dx = (e.keyCode == L) ? -1 : (e.keyCode == R) ? +1 : 0;
      this.pacman.dy = (e.keyCode == U) ? -1 : (e.keyCode == D) ? +1 : 0;
    }

    this.loop()
  }

  isGameFinished() {
    return this.score >= 11 || this.isPacmanDead() || this.isFinished;
  }

  loop() {
    //console.log(this.pacman)
    if (!this.isGameFinished()) {
      this.movePacman();

      this.moveMonsters();

      this.isPacmanDead();

      this.drawMap();

      if (this.isPacmanDead()) {
        // this.animateResult("GAME OVER");
        console.log("game over");
      }

      if (this.score >= 11) {
        console.log("bravo!")
      }

      setTimeout(() => {
        this.loop()
      }, this.speed)
    }
  }

  drawMap() {
    let world = document.getElementById("world");
    world.innerHTML = "";
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === 1) {
          world.innerHTML += "<div class='wall'></div>";
        } else if (this.map[y][x] === 2) {
          world.innerHTML += "<div class='pacman'></div>";
        } else if (this.map[y][x] === 3) {
          world.innerHTML += "<div class='coin'></div>";
        } else if (this.map[y][x] === 4) {
          world.innerHTML += "<div class='monster'></div>";
        } else if (this.map[y][x] === 5) {
          world.innerHTML += "<div class='collision'></div>";
        } else if (this.map[y][x] === 0) {
          world.innerHTML += "<div class='space'></div>";
        }
      }
      world.innerHTML += "<br>";
    }
  }

  moveMonsters() {
    for (let i = 0; i < this.monsters.length; i++) {
      this.moveMonster(this.monsters[i]);
    }
  }

  getRandomDirection(x, y) { // choose monster random direction
    let opts = [];

    let w = this.map[0].length - 1
    let h = this.map.length - 1

    if (y > 0 && (this.map[y - 1][x + 0] == S || this.map[y - 1][x + 0] == C || this.map[y - 1][x + 0] == P)) opts.push([+0, -1]); // up
    if (x < w && (this.map[y - 0][x + 1] == S || this.map[y - 0][x + 1] == C || this.map[y - 0][x + 1] == P)) opts.push([+1, +0]); // right
    if (y < h && (this.map[y + 1][x + 0] == S || this.map[y + 1][x + 0] == C || this.map[y + 1][x + 0] == P)) opts.push([+0, +1]); // down
    if (x > 0 && (this.map[y - 0][x - 1] == S || this.map[y - 0][x - 1] == C || this.map[y - 0][x - 1] == P)) opts.push([-1, +0]); // left

    if (opts.length > 0)
      return opts[Math.floor(Math.random() * opts.length)];
    else
      return [0, 0];
  }

  moveMonster(m) {
    let x = m.x + m.dx;
    let y = m.y + m.dy;

    let r = Math.random();
    if ((this.map[y][x] == S || this.map[y][x] == C || this.map[y][x] == P) && (m.p < r)) {
      m.p += 0.1;
    } else {
      let [dx, dy] = this.getRandomDirection(m.x, m.y);
      m.dx = dx;
      m.dy = dy;
      x = m.x + m.dx;
      y = m.y + m.dy;
      m.p = 0;
    }

    this.map[m.y][m.x] = m.v;
    m.x = x;
    m.y = y;
    m.v = this.map[m.y][m.x];
    this.map[m.y][m.x] = M;
  }

  movePacman() {
    let x = this.pacman.x + this.pacman.dx;
    let y = this.pacman.y + this.pacman.dy;

    switch (this.map[y][x]) {
      case C:
        this.updateScore();
      case S:
        this.map[this.pacman.y][this.pacman.x] = S;
        this.pacman.x = x;
        this.pacman.y = y;
        this.map[this.pacman.y][this.pacman.x] = P;
    }
  }

  isPacmanDead() {
    for (let i = 0; i < this.monsters.length; i++) {
      if (this.monsters[i].x == this.pacman.x && this.monsters[i].y == this.pacman.y) {
        this.map[this.pacman.y][this.pacman.x] = 5;
        return true;
      }
    }
  }

  updateScore() {
    this.score++;
    console.log("Score is " + this.score);
  }

  // showResult(text) {
  //
  // }
  animateResult(text) {
    // let result = document.createElement("div");
    // result.id = "result";
    // result.innerHTML = text;
    //document.getElementById("world").appendChild(result);
    let result = document.getElementById("result");
    let posTop = 0;
    let posLeft = 0;
    let id = setInterval(frame, 50);

    function frame() {
      if (posTop == 3) {
        clearInterval(id);
      } else {
        posTop++;
        result.style.top = posTop + "em";
        result.style.left = posLeft + "em";
      }
    }
  }
}

const S = 0; // space
const W = 1; // wall
const P = 2; // pacman
const C = 3; // coin
const M = 4; // monster


const styles = ["space", "wall", "pacman", "coin", "monster", "collision"];

//1st level configs
let monsters = [
  new Monster(1, 11),
  new Monster(1, 9)
]


let originalMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


let game = new Game(originalMatrix, 11, 500, monsters);
game.drawMap();

function playFirst() {
  game.isFinished = true;
  let monsters = [new Monster(1, 11), new Monster(1, 9)];
  game = new Game(originalMatrix, 500, monsters);
  game.startGame();
}

function playSecond() {
  game.isFinished = true;
  let monsters = [new Monster(1, 11), new Monster(1, 9), new Monster(3, 10)];
  game = new Game(originalMatrix, 400, monsters);
  game.startGame();
}

function playThird() {
  game.isFinished = true;
  let monsters = [new Monster(1, 11), new Monster(1, 9), new Monster(3, 10), new Monster(10, 3)];
  game = new Game(originalMatrix, 300, monsters);
  game.startGame();
}