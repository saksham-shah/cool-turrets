function TurretSpike(x_, y_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 150, 30);

    this.playerControlRadius = 100;

    this.reloadTime = 100;

    this.maxVel = 20;

    this.mass = 100;

    this.bodyDamage = 10;
}
// Adds the Turret prototype to the TurretSpike object
TurretSpike.prototype = Object.create(Turret.prototype);

TurretSpike.prototype.shoot = function() {
    var recoilForce = p5.Vector.fromAngle(this.direction);
    recoilForce.setMag(1500);
    this.applyForce(recoilForce);
};


TurretSpike.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y)
    var drawR = cam.getDrawSize(this.r);
    scr.push();
    scr.translate(drawPos.x, drawPos.y);
    scr.rotate(this.direction);

    // Draw control radius
    scr.fill(120, 100, 100, 0.1);
    scr.noStroke();
    scr.ellipse(0, 0, cam.getDrawSize(this.playerControlRadius) * 2);

    // Draw turret body
    scr.fill(this.colour);
    scr.noStroke();
    scr.ellipse(0, 0, drawR * 2);

    // Draw triangle thing
    scr.beginShape();

    var mult = cam.getDrawSize(1);
    scr.vertex(0, -drawR);
    scr.vertex(0, drawR);
    scr.vertex((this.r + 20) * mult, 0);
    scr.vertex(0, -drawR);
    scr.endShape();

    scr.pop();
};
