function Game() {


    this.entities = [];
    this.bullets = [];

    this.player = new Player(100, height / 2);
    this.entities.push(this.player);

    this.entities.push(new TurretSniper(width / 2, height / 2, color(255, 0, 0)));

    // this.entities.push(new EnemySeeker(width / 3, height / 3, color(0, 255, 0)));

    this.lastUpdate = Date.now();

    this.xBound = 1200;
    this.yBound = 700;

    this.gameCam = new GameCam(this.xBound, this.yBound, this.player);

    this.playerBar = new StatBar(100, this.player, (player) => player.health);


}

Game.prototype.update = function() {
    // Calculate Delta time in order to have smooth movement
    var now = Date.now();
    dt = (now - this.lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    this.lastUpdate = now;

    this.gameCam.targetZoom = 1;

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update();
        if (!this.entities[i].alive) {
            this.entities.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].collisions(this.entities);
    }

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].move();
    }

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update(this.entities);
        if (this.bullets[i].hit) {
            this.bullets.splice(i, 1);
            i--;
        }
    }

    this.gameCam.update();
};

Game.prototype.draw = function() {
    background(0);
    noFill();
    fill(50);
    stroke(255, 0, 0);
    strokeWeight(5);
    rectMode(CORNER);
    var topLeft = this.gameCam.getDrawPos(createVector(0, 0));
    rect(topLeft.x, topLeft.y, this.gameCam.getDrawSize(this.xBound), this.gameCam.getDrawSize(this.yBound));

    for (var i = 0; i < this.bullets.length; i++) {
        if (!this.bullets[i].hit) {
            this.bullets[i].draw();
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].alive) {
            this.entities[i].draw();
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].alive && this.entities[i].showHealthBar > 0) {
            this.entities[i].healthBar.draw();
        }
    }
};
