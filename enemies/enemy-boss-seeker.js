function EnemyBossSeeker(x_, y_, parent_, parentRange_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 500, parent_, parentRange_, 50);

    this.colour = color(120, 100, 50);

    this.bodyDamage = 10;

    this.reloadTimer = 60;
    this.reloadTime = 60 * 29;

    this.spawnTimer = 60;
    this.spawnTime = 60 * 11;

    this.mass = 100;

    this.maxVel = 0.3;

    this.maxChildren = 5;
    this.children = 0;

    this.scoreValue = 2000;

    // this.health = 10;
}

// Adds the Enemy prototype to the EnemyBossSeeker object
EnemyBossSeeker.prototype = Object.create(Enemy.prototype);

EnemyBossSeeker.prototype.stateUpdate = function() {
    switch (this.state) {
        case "wander":
            // A slow wander
            this.wander();

            // If within range of any players, chase the player
            this.target = this.getTarget(game.players, 1000);
            if (this.target) {
                this.state = "chase";
            }
            // // If within range, chase the player
            // if (this.inRange(game.player, 1000)) {
            //     this.state = "chase";
            // }
            break;
        case "chase":
            // Chase the player
            var vectorEnemytoPlayer = p5.Vector.sub(this.target.pos, this.pos);
            vectorEnemytoPlayer.setMag(this.maxForce);
            this.acc.add(vectorEnemytoPlayer);

            // If out of range, stop chasing
            if (!this.inRange(this.target, 1200)) {
                this.state = "wander";
            }
            break;
    }
}

EnemyBossSeeker.prototype.generalUpdate = function() {
    // Timers
    this.reloadTimer -= dt;
    this.spawnTimer -= dt;

    if (!(this.state == "wander")) {
        if (this.reloadTimer < 0) {
            this.reloadTimer = this.reloadTime;
            this.launchMissle();
        }
    }
    if (this.spawnTimer < 0 && this.children < this.maxChildren) {
        this.spawnTimer = this.spawnTime;
        this.spawnSeeker();
    }

};

EnemyBossSeeker.prototype.draw = function() {
    push();
    fill(this.colour);
    if (this.state != "wander") {
        stroke(0, 100, 100);
        strokeWeight(game.gameCam.getDrawSize(2));
    } else {
        noStroke();
    }
    translate(this.drawPos.x, this.drawPos.y);

    // Draw body
    ellipse(0, 0, this.drawR * 2);

    pop();
};

EnemyBossSeeker.prototype.spawnSeeker = function() {
    var vector = this.vel.copy();
    var offset = vector.setMag(20 + this.r);
    var spawnedSeeker = new EnemySeeker(this.pos.x + offset.x, this.pos.y + offset.y, this, 400);
    game.entities.push(spawnedSeeker);
    this.children++;
};

EnemyBossSeeker.prototype.launchMissle = function() {
    game.bullets.push(new Missile(this.target.pos, 75, this.target, this));
}
