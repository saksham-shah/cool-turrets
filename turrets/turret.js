function Turret(x_, y_, health_, r_) {

    if (r_ === undefined) {
        r_ = 20;
    }

    // Inherit from Entity
    Entity.call(this, x_, y_, health_, r_);


    this.direction = 0;
    this.playerControlRadius = 50;
    this.colour = color(0, 100, 100);

    this.reloadTimer = 0;

    this.maxVel = 5;

    this.mass = 30;

    this.bodyDamage = 1;

    this.controller = null;
    this.latestShot = null;

    gameScreen.game.turretCount++;
}

// Adds the Entity prototype to the Turret object
Turret.prototype = Object.create(Entity.prototype);

Turret.prototype.update = function() {
    //Shoot Timer
    this.reloadTimer -= dt;

    if (this.controller) {
        // If current controller is no longer in range
        if (!(this.pos.dist(this.controller.pos) < this.playerControlRadius + this.controller.r)) {
            this.controller = null;
        }
    }

    var count = 0;
    if (!this.controller) {
        for (var i = 0; i < gameScreen.game.players.length; i++) {
            var player = gameScreen.game.players[i];
            // If the player is in range, it controls the turret
            if (this.pos.dist(player.pos) < this.playerControlRadius + player.r) {
                this.controller = player;
                count++;
            }
        }
        // If there is more than one player, no one can control it
        if (count !== 1) {
            this.controller = null;
        }
    }

    //Check if being controlled
    if (this.controller) {
        // Player controlled
        // this.controller = game.player;

        var vectorPlayerToTurret = p5.Vector.sub(this.pos, this.controller.pos);

        this.direction = vectorPlayerToTurret.heading();



        if (this instanceof TurretSniper) {
            this.controller.targetZoom = 0.7;
        }

        // 32 is the char code for space
        if (this.reloadTimer < 0 && keyIsDown(this.controller.controls.shoot)) {
            this.reloadTimer = this.reloadTime;
            this.latestShot = this.controller;
            this.shoot();
        }
    }
};

Turret.prototype.shoot = function() {
    var shootBullet = new Bullet(this.pos.copy(), this.direction, this);
    gameScreen.game.bullets.push(shootBullet);

    var recoilForce = p5.Vector.fromAngle(shootBullet.vel.heading()).rotate(PI);
    recoilForce.setMag(shootBullet.r * shootBullet.r * shootBullet.speed * 0.1);
    this.applyForce(recoilForce);
};

Turret.prototype.die = function() {
    gameScreen.game.turretCount--;
}
