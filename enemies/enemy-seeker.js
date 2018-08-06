function EnemySeeker(x_, y_, parent_, parentRange_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 20, parent_, parentRange_);

    this.colour = color(120, 100, 100);
    this.maxVel = 10;

    this.bodyDamage = 10;

    this.scoreValue = 100;

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemySeeker.prototype = Object.create(Enemy.prototype);

EnemySeeker.prototype.stateUpdate = function() {
    switch (this.state) {
        case "wander":
            // A slow wander
            this.wander();
            this.maxVel = 1;

            // If within range of any players, chase the player
            this.target = this.getTarget(game.players, 300);
            if (this.target) {
                this.state = "chase";
            }
            break;
        case "chase":
            // Chase the player
            var vectorEnemytoPlayer = p5.Vector.sub(this.target.pos, this.pos);
            vectorEnemytoPlayer.setMag(this.maxForce);
            this.acc.add(vectorEnemytoPlayer);
            this.maxVel = 10;

            // If out of range, stop chasing
            if (!this.inRange(this.target, 500)) {
                this.state = "wander";
            }
            break;
    }
}

EnemySeeker.prototype.generalUpdate = function() {
    // nothing
}

EnemySeeker.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y)
    var drawR = cam.getDrawSize(this.r);
    scr.push();
    scr.fill(this.colour);
    if (this.state != "wander") {
        scr.stroke(0, 100, 100);
        scr.strokeWeight(cam.getDrawSize(2));
    } else {
        scr.noStroke();
    }
    scr.translate(drawPos.x, drawPos.y);
    scr.ellipse(0, 0, drawR * 2);
    scr.pop();
}
