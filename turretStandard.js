function TurretStandard(x_, y_, colour_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, colour_, 20); // 1 for friction means there is no friction - turrets glide forever

    this.health = 30;

    this.playerControlRadius = 100;

    this.reloadTime = 20;

    this.bulletTemplate = {
        speed: 10,
        damage: 10,
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
    ellipse(0, 0, this.playerControlRadius * 2);

    // Draw turret body
    fill(this.colour);
    noStroke();
    ellipse(0, 0, this.r * 2);

    // Draw gun
    rect(0, -6, 30, 12);

    pop();
};
