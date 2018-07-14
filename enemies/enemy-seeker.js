function EnemySeeker(x_, y_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 20);

    this.colour = color(120, 100, 100);
    this.maxVel = 10;
    this.maxForce = 0.1;

    this.bodyDamage = 10;

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemySeeker.prototype = Object.create(Enemy.prototype);

EnemySeeker.prototype.update = function() {
    switch (this.state) {
        case "wander":
            // A slow wander
            this.wander();
            this.maxVel = 1;

            // If within range, chase the player
            if (this.playerInRange(300)) {
                this.state = "chase";
            }
            break;
        case "chase":
            // Chase the player
            var vectorEnemytoPlayer = p5.Vector.sub(game.player.pos, this.pos);
            vectorEnemytoPlayer.setMag(this.maxForce);
            this.acc.add(vectorEnemytoPlayer);
            this.maxVel = 10;

            // If out of range, stop chasing
            if (!this.playerInRange(500)) {
                this.state = "wander";
            }
            break;
    }
}

EnemySeeker.prototype.draw = function() {
    push();
    fill(this.colour);
    if (this.state != "wander") {
        stroke(0, 100, 100);
        strokeWeight(game.gameCam.getDrawSize(2));
    } else {
        noStroke();
    }
    translate(this.drawPos.x, this.drawPos.y);
    ellipse(0, 0, this.drawR * 2);
    pop();
}
