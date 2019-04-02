class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Game {
  constructor(map, pacmanX, pacmanY) {
    this.map = map;
    this.score = 0;
    this.pacman = {
      x: pacmanX,
      y: pacmanY
    }

    this.monsters = [
      new Monster(1, 11),
      new Monster(1, 9),
      new Monster(1, 5),
      new Monster(1, 3)
    ]
  }

  drawMap() {
    document.getElementById("map").innerHTML = "";
    this._positionPacman();
    for (let j = 0; j < this.map.length; j++) {

      let row = document.createElement("div");
      row.className = "row"
      document.getElementById("map").appendChild(row);

      for (let i = 0; i < this.map[j].length; i++) {
        let block = this._createBlock(this.map[j][i]);
        row.appendChild(block);
      }
    }
  }

  moveMonsters() {
    if (this.score < 11) {
      for (let i = 0; i < this.monsters.length; i++) {
        this.moveMonster(this.monsters[i]);
      }

      this.drawMap();

      setTimeout(() => {
        this.moveMonsters();
      }, 200);
    }
  }

  moveMonster(monster) {
    let dx = 0, dy = 0;

    let r = Math.random();
    if (r < 0.25) {
      dx = +0; dy = +1;
    } else if (r < 0.50) {
      dx = +0; dy = -1;
    } else if (r < 0.75) {
      dx = +1; dy = +0;
    } else {
      dx = -1; dy = +0;
    }

    if (this.map[monster.y + dy][monster.x + dx] == 0) {
      this.map[monster.y][monster.x] = 0;
      monster.x += dx;
      monster.y += dy;
      this.map[monster.y][monster.x] = 4;
    }
  }

  movePacman() {
    this.map[this.monsters[0].y][this.monsters[0].x] = 4;
    this.drawMap();

    this.moveMonsters()

    document.onkeydown = (e) => {
      let dx = 0, dy = 0;
      switch (e.keyCode) {
        case 37: dx = -1; dy = +0; break; // left
        case 38: dx = +0; dy = -1; break; // up
        case 39: dx = +1; dy = +0; break; // right
        case 40: dx = +0; dy = +1; break; // down
      }

      switch (this.map[this.pacman.y + dy][this.pacman.x + dx]) {
        case 3: this.updateScore();
        case 0: this.map[this.pacman.y][this.pacman.x] = 0;
                this.pacman.x += dx;
                this.pacman.y += dy;
                this.drawMap();
      }
    }
  }

  updateScore() {
    this.score++;
  }


  _positionPacman() {
    this.map[this.pacman.y][this.pacman.x] = 2;
  }

  _createBlock(n) {
    const styles = ["space", "wall", "pacman", "coin", "monster"];
    let block = document.createElement("div");
    block.className = styles[n];
    return block;
  }

}

let matrix = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];



let game = new Game(matrix, 6, 6);
game.drawMap();
game.movePacman();
