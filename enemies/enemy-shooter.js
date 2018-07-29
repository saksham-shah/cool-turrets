function EnemyShooter(x_, y_, parent_, parentRange_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 50, parent_, parentRange_);

    this.colour = color(240, 100, 100);

    this.bodyDamage = 1;

    this.reloadTimer = 0;
    this.reloadTime = 100;

    this.bulletTemplate = {
        speed: 5,
        damage: 15,
        range: 250,
        r: 7
    };

    this.scoreValue = 300;

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemyShooter.prototype = Object.create(Enemy.prototype);

EnemyShooter.prototype.stateUpdate = function() {
    switch (this.state) {
        case "wander":
            // A slow wander
            this.wander();
            this.maxVel = 1;
            this.direction = this.vel.heading();

            // If within range of any players, chase the player
            this.target = this.getTarget(game.players, 600);
            if (this.target) {
                this.state = "chase";
            }
            // // If within range, chase the player
            // if (this.inRange(game.player, 600)) {
            //     this.state = "chase";
            // }
            break;
        case "chase":
            // Chase the player
            var vectorEnemytoPlayer = p5.Vector.sub(this.target.pos, this.pos);
            vectorEnemytoPlayer.setMag(this.maxForce);
            this.acc.add(vectorEnemytoPlayer);
            this.maxVel = 1;

            // If out of range, stop chasing
            if (!this.inRange(this.target, 750)) {
                this.state = "wander";
            } else if (this.inRange(this.target, 350)) {
                this.state = "camp";
            }
            break;
        case "camp":
            // Stay still and shoot from a distance
            this.maxVel = 1;
            if (!this.inRange(this.target, 450)) {
                this.state = "chase";
            } else if (this.inRange(this.target, 150)) {
                this.state = "flee";
            }
            break;
        case "flee":
            // Flee from the player to avoid colliding
            var vectorPlayertoEnemy = p5.Vector.sub(this.pos, this.target.pos);
            vectorPlayertoEnemy.setMag(this.maxForce);
            this.acc.add(vectorPlayertoEnemy);
            this.maxVel = 1.5;

            if (!this.inRange(this.target, 300)) {
                this.state = "camp";
            }
            break;
    }
}

EnemyShooter.prototype.generalUpdate = function() {
    //Shoot Timer
    this.reloadTimer -= dt;

    if (!(this.state == "wander")) {
        var vectorPlayerToTurret = p5.Vector.sub(this.target.pos, this.pos);

        this.direction = vectorPlayerToTurret.heading();

        if (this.reloadTimer < 0) {
            this.reloadTimer = this.reloadTime;
            this.shoot();
        }
    }
}

EnemyShooter.prototype.draw = function() {
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
    rect(0, -6 * mult, 30 * mult, 12 * mult);
    pop();
}

EnemyShooter.prototype.shoot = function() {
    var shootBullet = new Bullet(this.pos.copy(), this.direction + random(-0.3, 0.3), this,
        function(bullet) {
            if (bullet.data.target) {
                // Spawns a second bullet targeted at the player
                var direction = p5.Vector.sub(bullet.data.target.pos, bullet.pos).heading() + random(-0.3, 0.3);
                // Big bug here which needs to be solved, hard to reproduce
                // Cannot read property pos of bullet.data.target
                // But bullet.data.target shouldn't be null
                var secondBullet = new Bullet(bullet.pos.copy(), direction, bullet.parent);
                game.bullets.push(secondBullet);
            } else {
                console.log("KNOWN BUG - enemy-shooter.js - shoot()")
                console.log(bullet);
                console.log("This bug is pretty much impossible to reproduce so if it happens please tell me (Saksham).")
                console.log("Maybe even take a picture of the bullet object above.")
            }
        }, {
            target: this.target
        });
    game.bullets.push(shootBullet);

    var recoilForce = p5.Vector.fromAngle(shootBullet.vel.heading()).rotate(PI);
    recoilForce.setMag(shootBullet.r * shootBullet.r * shootBullet.speed * 0.1);
    this.applyForce(recoilForce);
};
