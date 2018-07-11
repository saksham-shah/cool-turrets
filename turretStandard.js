function TurretStandard(x_, y_, colour_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, colour_, 20); // 1 for friction means there is no friction - turrets glide forever

    this.playerControlRadius = 50;
    this.maxVel = 1.2;
    this.recoil = 8;
}
// Adds the Turret prototype to the TurretStandard object
TurretStandard.prototype = Object.create(Turret.prototype);

TurretStandard.prototype.movement = function() {
    this.acc.add(0, 0.1);
};

TurretStandard.prototype.shoot = function() {
    bullets.push(new Bullet(this.pos.copy(), this.direction, 10, this.colour));
    var recoilForce = p5.Vector.fromAngle(this.direction).rotate(PI);
    recoilForce.setMag(this.recoil);
    this.acc.add(recoilForce);
};

TurretStandard.prototype.draw = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.direction);

    // Draw control radius
    fill(0, 255, 0, 10);
    ellipse(0, 0, this.playerControlRadius * 2);

    // Draw turret body
    fill(this.colour);
    noStroke();
    ellipse(0, 0, this.r * 2);

    // Draw gun
    rect(0, -3, 30, 6);

    pop();
};