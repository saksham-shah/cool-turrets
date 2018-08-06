function Game() {


    this.entities = [];
    this.players = [];
    this.bullets = [];
    this.areaEffects = [];
    this.particles = [];

    this.enemyCount = 0;
    this.turretCount = 0;

     var player = new Player(100, height / 2, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 13]);
    this.entities.push(player);
    this.players.push(player);
    var second = new Player(100, height / 2, [87, 83, 65, 68, 32]);
    this.entities.push(second);
    this.players.push(second);

    // this.entities.push(new EnemySeeker(width / 3, height / 3, color(0, 255, 0)));

    this.lastUpdate = Date.now();

    this.xBound = XBOUND;
    this.yBound = YBOUND;

    // this.gameCam = new Cam(this.xBound, this.yBound, this.players[0]);
    // this.gameCamSet = createCamSet(ONE_PLAYER, this.players[0].pos, this.players[0], this.players[0]);
    this.gameCamSet = createCamSet(TWO_PLAYER, this.players[0].pos, this.players[1].pos, this.players[0], this.players[1], this.players[0], this.players[1]);


    // this.playerBar = new StatBar(100, this.player, (player) => player.health);

    //Interesting effect
    // this.gameCam.zoom = 0.1;

    // Test, will be commented out later
    this.timePassed = 0;

    this.score = 0;


}

Game.prototype.update = function() {
    // Calculate Delta time in order to have smooth movement
    var now = Date.now();
    dt = (now - this.lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    this.lastUpdate = now;

    if (!testMode) {
        this.addEntities();
    }

    // this.gameCam.targetZoom = 1;

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update(this.entities);
        if (this.bullets[i].hit) {
            this.bullets.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update();
        if (!this.entities[i].alive && this.entities[i] !== this.player) {
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

    for (var i = 0; i < this.areaEffects.length; i++) {
        this.areaEffects[i].update(this.entities);
        if (this.areaEffects[i].done) {
            this.areaEffects.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
        if (this.particles[i].life < 0) {
            this.particles.splice(i, 1);
            i--;
        }
    }

    // this.gameCam.update();
    this.gameCamSet.update();

    //Revive players
    // if (!this.player.alive) {
    //     this.timePassed += dt;
    //     // this.player.alive = true;
    //     // this.player.health = 100;
    //     if (this.timePassed > 60) {
    //         this.player.respawn();
    //         this.timePassed = 0;
    //     }
    // }


};

Game.prototype.addEntities = function() {
    while (this.enemyCount < ENEMYLIMIT) {
        var toSpawn = randomFromWeights(ENEMYSPAWN);
        switch (toSpawn) {
            case 0:
                this.entities.push(new EnemySeeker(random(0, this.xBound), random(0, this.yBound)));
                break;
            case 1:
                this.entities.push(new EnemyShooter(random(0, this.xBound), random(0, this.yBound)));
                break;
            case 2:
                this.entities.push(new EnemyMissile(random(0, this.xBound), random(0, this.yBound)));
                break;
            case 3:
                this.entities.push(new EnemyBossSeeker(random(0, this.xBound), random(0, this.yBound)));
                break;
        }
    }
    while (this.turretCount < TURRETLIMIT) {
        var toSpawn = randomFromWeights(TURRETSPAWN);
        switch (toSpawn) {
            case 0:
                this.entities.push(new TurretStandard(random(0, this.xBound), random(0, this.yBound)));
                break;
            case 1:
                this.entities.push(new TurretSniper(random(0, this.xBound), random(0, this.yBound)));
                break;
            case 2:
                this.entities.push(new TurretBomber(random(0, this.xBound), random(0, this.yBound)));
                break;
            case 3:
                this.entities.push(new TurretSpike(random(0, this.xBound), random(0, this.yBound)));
                break;
        }
    }
}

Game.prototype.draw = function() {
    // background(0);
    // this.drawBackground();
    this.gameCamSet.draw(this.drawBackground);


    for (var i = 0; i < this.areaEffects.length; i++) {
        // this.areaEffects[i].draw();
        this.gameCamSet.draw(this.areaEffects[i]);
    }

    for (var i = 0; i < this.particles.length; i++) {
        // this.particles[i].draw();
        this.gameCamSet.draw(this.particles[i]);
    }

    for (var i = 0; i < this.bullets.length; i++) {
        if (!this.bullets[i].hit) {
            // this.bullets[i].draw();
            this.gameCamSet.draw(this.bullets[i]);
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].alive) {
            // this.entities[i].draw();
            this.gameCamSet.draw(this.entities[i]);
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].alive && this.entities[i].showHealthBar > 0) {
            // this.entities[i].healthBar.draw();
            this.gameCamSet.draw(this.entities[i].healthBar);
        }
    }

    this.gameCamSet.drawToCanvas();

    // Draw score - could be seperate function?
    fill(255);
    noStroke();
    textSize(50);
    textAlign(CENTER);
    text(this.score, width / 2, 50);
};

// Game.prototype.drawBackground = function() {
//     background(0);
//     noFill();
//     fill(0, 0, 19.6);
//     stroke(0, 100, 100);
//     strokeWeight(5);
//     rectMode(CORNER);
//     var topLeft = this.gameCam.getDrawPos(createVector(0, 0));
//     var mult = this.gameCam.getDrawSize(1);
//     rect(topLeft.x, topLeft.y, this.xBound * mult, this.yBound * mult);
//
//     // Commented because I made the map bigger
//
//     // strokeWeight(1);
//     // //Draw some graphics
//     // var centre = this.gameCam.getDrawPos(createVector(this.xBound / 2, this.yBound / 2));
//     // var agons = [];
//     // for (var i = -16; i < 16; i++) {
//     //     for (var j = -10; j < 11; j++) {
//     //         agons.push([i, j]);
//     //     }
//     // }
//     // drawHexes(centre.x, centre.y, 20 * mult, 2 * mult, color(0, 0, 25, 0.5), agons);
// };

Game.prototype.drawBackground = function(cam, scr) {
    scr.background(5);
    scr.fill(0, 0, 19.6);
    scr.stroke(0, 100, 100);
    scr.strokeWeight(5);
    scr.rectMode(CORNER);
    var topLeft = cam.getDrawPos(0, 0);
    var mult = cam.getDrawSize(1);
    scr.rect(topLeft.x, topLeft.y, XBOUND * mult, YBOUND * mult);

    // Commented because I made the map bigger

    // strokeWeight(1);
    // //Draw some graphics
    // var centre = this.gameCam.getDrawPos(createVector(this.xBound / 2, this.yBound / 2));
    // var agons = [];
    // for (var i = -16; i < 16; i++) {
    //     for (var j = -10; j < 11; j++) {
    //         agons.push([i, j]);
    //     }
    // }
    // drawHexes(centre.x, centre.y, 20 * mult, 2 * mult, color(0, 0, 25, 0.5), agons);
};
