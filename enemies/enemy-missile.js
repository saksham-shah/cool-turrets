function EnemyMissile(x_, y_, parent_, parentRange_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 50, parent_, parentRange_);

    this.colour = color(210, 100, 100);

    this.bodyDamage = 1;

    this.reloadTimer = 0;
    this.reloadTime = 60 * 4;

    this.scoreValue = 500;

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemyMissile.prototype = Object.create(Enemy.prototype);

EnemyMissile.prototype.stateUpdate = function() {
    switch (this.state) {
        case "wander":
            // A slow wander
            this.wander();
            this.direction = this.vel.heading();

            this.maxVel = 1;

            // If within range of any players, chase the player
            this.target = this.getTarget(game.players, 750);
            if (this.target) {
                this.state = "camp";
            }
            // // If within range, shoot at the player
            // if (this.inRange(game.player, 750)) {
            //     this.state = "camp";
            // }
            break;
        case "camp":
            //Move perpendicular to player
            var vectorEnemytoPlayer = p5.Vector.sub(this.target.pos, this.pos);
            this.direction = vectorEnemytoPlayer.heading();
            vectorEnemytoPlayer.setMag(this.maxForce);
            vectorEnemytoPlayer.rotate(this.reloadTimer > this.reloadTime / 2 ? HALF_PI : -HALF_PI);
            this.acc.add(vectorEnemytoPlayer);

            // If out of range, stop chasing
            if (!this.inRange(this.target, 1000)) {
                this.state = "wander";
            }
            break;
    }
}

EnemyMissile.prototype.generalUpdate = function() {
    //Shoot Timer
    this.reloadTimer -= dt;

    if (!(this.state == "wander")) {
        if (this.reloadTimer < 0) {
            this.reloadTimer = this.reloadTime;
            this.shoot();
        }
    }

};

EnemyMissile.prototype.draw = function() {
    push();
    fill(this.colour);
    if (this.state != "wander") {
        stroke(0, 100, 100);
        strokeWeight(game.gameCam.getDrawSize(2));
    } else {
        noStroke();
    }
    translate(this.drawPos.x, this.drawPos.y);
    rotate(this.direction);

    // Draw body
    ellipse(0, 0, this.drawR * 2);

    // Draw gun
    noStroke();
    var mult = game.gameCam.getDrawSize(1);
    var barrelWidth = 20;
    rect(0, -barrelWidth * mult / 2, 30 * mult, barrelWidth * mult);
    pop();
};

EnemyMissile.prototype.shoot = function() {
    var shootBullet = new SeekingMissile(this.pos.copy(), 20, this, this.target);
    game.bullets.push(shootBullet);

    //var recoilForce = p5.Vector.fromAngle(shootBullet.vel.heading()).rotate(PI);
    // recoilForce.setMag(shootBullet.r * shootBullet.r * shootBullet.speed * 0.1);
    //this.applyForce(recoilForce);
};
