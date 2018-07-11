function Game() {


    this.entities = [];
    this.bullets = [];

    this.player = new Player(width / 2, height / 2);
    this.entities.push(this.player);

    this.entities.push(new TurretStandard(width / 2, height / 2, color(255, 0, 0)));

    this.entities.push(new EnemySeeker(width / 3, height / 3, color(0, 255, 0)));

    this.lastUpdate = Date.now();

    this.xBound = 1000;
    this.yBound = 667;

    this.gameCam = new GameCam(this.xBound, this.yBound, this.player);


}

Game.prototype.update = function() {
    // Calculate Delta time in order to have smooth movement
    var now = Date.now();
    dt = (now - this.lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    this.lastUpdate = now;

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update();
        /*        this.entities[i].move();
            }
            for (var i = 0; i < this.bullets.length; i++) {
                this.bullets[i].update();
            }
            //Test for collisions
            for (var i = 0; i < this.entities.length; i++) {*/
        this.entities[i].move(this.entities);

        //Test for collisions
        // for (var j = 0; j < this.entities.length; j++) {
        //     if (j != i) { //Don't test for collisions with self
        //         if (circleCollision(this.entities[i], this.entities[j])) {
        //             this.entities[i].collide(this.entities[j]);
        //             this.entities[j].collide(this.entities[i]);
        //         }
        //     }
        // }
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
    rect(topLeft.x, topLeft.y, this.xBound, this.yBound);

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw();
    }
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw();
    }
};