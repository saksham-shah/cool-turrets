function TurretStandard(x_, y_, colour_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 50, colour_, 20);

    // this.health = 30;

    this.playerControlRadius = 100;

    this.reloadTime = 20;

    this.bulletTemplate = {
        speed: 10,
        damage: 10,
        range: 300,
        r: 7
    };

    this.recoil = this.bulletTemplate.r * 0.1;
}
// Adds the Turret prototype to the TurretStandard object
TurretStandard.prototype = Object.create(Turret.prototype);

TurretStandard.prototype.movement = function() {
    // this.acc.add(0, 0.5);
};

TurretStandard.prototype.shoot = function() {
    game.bullets.push(new Bullet(this.pos.copy(), this.direction, this));

    var recoilForce = p5.Vector.fromAngle(this.direction).rotate(PI);
    recoilForce.setMag(this.recoil);
    this.acc.add(recoilForce);
};

TurretStandard.prototype.draw = function() {
    push();
    translate(this.drawPos.x, this.drawPos.y);
    rotate(this.direction);

    // Draw control radius
    fill(0, 255, 0, 10);
    noStroke();
    ellipse(0, 0, game.gameCam.getDrawSize(this.playerControlRadius) * 2);

    // Draw turret body
    fill(this.colour);
    noStroke();
    ellipse(0, 0, this.drawR * 2);

    // Draw gun
    var mult = game.gameCam.getDrawSize(1);
    rect(0, -6 * mult, 30 * mult, 12 * mult);

    pop();
};
