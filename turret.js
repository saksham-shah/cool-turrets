function Turret(x_, y_, health_, colour_, r_) {
    // Inherit from Entity

    Entity.call(this, x_, y_, health_, r_); // 1 for friction means there is no friction - turrets glide forever


    this.direction = 0;
    this.playerControlRadius = 50;
    this.colour = colour_;

    this.reloadTimer = 0;

    this.maxVel = 5;

    this.mass = 30;

    this.bodyDamage = 1;
}

// Adds the Entity prototype to the Turret object
Turret.prototype = Object.create(Entity.prototype);

Turret.prototype.update = function() {
    //Shoot Timer
    this.reloadTimer -= dt;

    //Move
    // this.movement(); commented for now

    //Check if player within range of turret
    if (this.pos.dist(game.player.pos) < this.playerControlRadius + game.player.r) {
        // Player controlled
        var vectorPlayerToTurret = p5.Vector.sub(this.pos, game.player.pos);

        this.direction = vectorPlayerToTurret.heading();

        if (this instanceof TurretSniper) {
            game.gameCam.targetZoom = 0.9;
        }

        // 32 is the char code for space
        if (this.reloadTimer < 0 && keyIsDown(32)) {
            this.reloadTimer = this.reloadTime;
            this.shoot();
        }
    }
};

Turret.prototype.shoot = function() {
    var shootBullet = new Bullet(this.pos.copy(), this.direction, this);
    game.bullets.push(shootBullet);

    var recoilForce = p5.Vector.fromAngle(this.direction).rotate(PI);
    recoilForce.setMag(shootBullet.r * shootBullet.r * shootBullet.speed);
    this.applyForce(recoilForce);
};