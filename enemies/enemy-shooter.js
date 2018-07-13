function EnemyShooter(x_, y_) {
    // Inherit from Enemy
    Enemy.call(this, x_, y_, 50);

    this.colour = color(0, 0, 255);
    this.maxVel = 1;
    this.maxForce = 0.1;

    this.bodyDamage = 1;

    this.reloadTimer = 0;
    this.reloadTime = 100;

    this.bulletTemplate = {
        speed: 5,
        damage: 15,
        range: 250,
        r: 7
    };

    // this.health = 10;
}

// Adds the Enemy prototype to the Turret object
EnemyShooter.prototype = Object.create(Enemy.prototype);

EnemyShooter.prototype.update = function() {
    //Rudimentary default behavior
    var vectorEnemytoPlayer = p5.Vector.sub(game.player.pos, this.pos);
    vectorEnemytoPlayer.setMag(this.maxForce);
    this.acc.add(vectorEnemytoPlayer);

    //Shoot Timer
    this.reloadTimer -= dt;

    var vectorPlayerToTurret = p5.Vector.sub(game.player.pos, this.pos);

    this.direction = vectorPlayerToTurret.heading();

    if (this.reloadTimer < 0) {
        this.reloadTimer = this.reloadTime;
        this.shoot();
    }
}

EnemyShooter.prototype.draw = function() {
    push();
    fill(this.colour);
    noStroke();
    translate(this.drawPos.x, this.drawPos.y);
    rotate(this.direction);

    // Draw body
    ellipse(0, 0, this.drawR * 2);

    // Draw gun
    var mult = game.gameCam.getDrawSize(1);
    rect(0, -6 * mult, 30 * mult, 12 * mult);
    pop();
}

EnemyShooter.prototype.shoot = function() {
    var shootBullet = new Bullet(this.pos.copy(), this.direction + random(-0.1, 0.1), this,
        function(bullet) {
            // Spawns a second bullet targeted at the player
            var direction = p5.Vector.sub(game.player.pos, bullet.pos).heading();
            var secondBullet = new Bullet(bullet.pos.copy(), direction, bullet.parent);
            game.bullets.push(secondBullet);

            // Blows up like a bomb
            // var areaEffect = new AreaEffect(bullet.pos.x, bullet.pos.y, 100,
            //     function(areaEffect, entity) {
            //         entity.loseHealth(10);
            //         var knockbackForce = p5.Vector.sub(entity.pos, areaEffect.pos);
            //         knockbackForce.setMag(100);
            //         entity.applyForce(knockbackForce);
            //         return true;
            //     }, {})
            // game.areaEffects.push(areaEffect);
        });
    game.bullets.push(shootBullet);

    var recoilForce = p5.Vector.fromAngle(shootBullet.vel.heading()).rotate(PI);
    recoilForce.setMag(shootBullet.r * shootBullet.r * shootBullet.speed * 0.1);
    this.applyForce(recoilForce);
};