function EnemyMissile(x_, y_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 50);

    this.colour = color(210, 100, 100);
    this.maxVel = 1;
    this.maxForce = 0.1;

    this.bodyDamage = 1;

    this.reloadTimer = 0;
    this.reloadTime = 60 * 4;

    this.bulletTemplate = {
        speed: 5,
        damage: 15,
        range: 250,
        r: 7
    };

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemyMissile.prototype = Object.create(Enemy.prototype);

EnemyMissile.prototype.update = function() {
    //Move perpendicular to player
    var vectorEnemytoPlayer = p5.Vector.sub(game.player.pos, this.pos);
    this.direction = vectorEnemytoPlayer.heading();
    vectorEnemytoPlayer.setMag(this.maxForce);
    vectorEnemytoPlayer.rotate(this.reloadTimer > this.reloadTime / 2 ? HALF_PI : -HALF_PI);



    this.acc.add(vectorEnemytoPlayer);

    //Shoot Timer
    this.reloadTimer -= dt;

    if (this.reloadTimer < 0) {
        this.reloadTimer = this.reloadTime;
        this.shoot();
    }
};

EnemyMissile.prototype.draw = function() {
    push();
    fill(this.colour);
    noStroke();
    translate(this.drawPos.x, this.drawPos.y);
    rotate(this.direction);

    // Draw body
    ellipse(0, 0, this.drawR * 2);

    // Draw gun
    var mult = game.gameCam.getDrawSize(1);
    var barrelWidth = 20;
    rect(0, -barrelWidth * mult / 2, 30 * mult, barrelWidth * mult);
    pop();
};

EnemyMissile.prototype.shoot = function() {
    var shootBullet = new SeekingMissile(this.pos.copy(), 20, this, game.player);
    game.bullets.push(shootBullet);

    //var recoilForce = p5.Vector.fromAngle(shootBullet.vel.heading()).rotate(PI);
    // recoilForce.setMag(shootBullet.r * shootBullet.r * shootBullet.speed * 0.1);
    //this.applyForce(recoilForce);
};