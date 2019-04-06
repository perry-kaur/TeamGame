class Monster {
  constructor(x, y) {
    this.x = x; //current x position
    this.y = y; //current y position
    this.p = 1; //
    this.dx = 0; //current x direction
    this.dy = 0; //current y direction
    this.v = S;
  }
}

class Game {
  constructor(map, pacmanX, pacmanY) {
    this.map = map;
    this.score = 0;
    this.lifes = 5;

    this.pacman = {
      x: pacmanX, //pacman current x position
      y: pacmanY, // pacman current y position
      dx: 0, // current x direction
      dy: 0 //current y direction
    }

    this.monsters = [
      new Monster(1, 11),
      new Monster(1, 9)
    ]
  }

  startGame() {
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
    return this.score >= 11 || this.lifes == 0;
  }

  loop() {
    //console.log(this.pacman)
    if (!this.isGameFinished()) {
      this.movePacman();

      this.moveMonsters();

      this.drawMap();

      setTimeout(() => {
        this.loop()
      }, 500)
    }
  }


  drawMap() {
    document.getElementById("map").innerHTML = "";

    for (let j = 0; j < this.map.length; j++) {

      let row = document.createElement("div");
      row.className = "row";
      document.getElementById("map").appendChild(row);

      for (let i = 0; i < this.map[j].length; i++) {
        let block = this._createBlock(this.map[j][i]);
        row.appendChild(block);
      }
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

    if (y > 0 && (this.map[y - 1][x + 0] == S || this.map[y - 1][x + 0] == C)) opts.push([+0, -1]); // up
    if (x < w && (this.map[y - 0][x + 1] == S || this.map[y - 0][x + 1] == C)) opts.push([+1, +0]); // right
    if (y < h && (this.map[y + 1][x + 0] == S || this.map[y + 1][x + 0] == C)) opts.push([+0, +1]); // down
    if (x > 0 && (this.map[y - 0][x - 1] == S || this.map[y - 0][x - 1] == C)) opts.push([-1, +0]); // left

    if (opts.length > 0)
      return opts[Math.floor(Math.random() * opts.length)];
    else
      return [0, 0];
  }

  moveMonster(m) {
    let x = m.x + m.dx;
    let y = m.y + m.dy;

    let r = Math.random();
    if ((this.map[y][x] == S || this.map[y][x] == C) && (m.p < r)) {
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

  // mpMeet() {
  //
  // }

  updateScore() {
    this.score++;
    console.log("Score is " + this.score);
  }

  looseLifes() {
    this.lifes--;
    console.log("Lifes is " + this.lifes);
  }

  _createBlock(n) {
    let block = document.createElement("div");
    block.className = styles[n];
    return block;
  }
}

const S = 0; // spce
const W = 1; // wall
const P = 2; // pacman
const C = 3; // coin
const M = 4; // monster

const styles = ["space", "wall", "pacman", "coin", "monster"];

let matrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let game = new Game(matrix, 6, 6);
game.startGame();