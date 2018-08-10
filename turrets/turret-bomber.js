function TurretBomber(x_, y_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 100);

    this.playerControlRadius = 150;

    this.reloadTime = 100;

}
// Adds the Turret prototype to the TurretBomber object
TurretBomber.prototype = Object.create(Turret.prototype);

TurretBomber.prototype.shoot = function() {
    // Throw bomb
    var vector = p5.Vector.fromAngle(this.direction);
    var offset = vector.setMag(20 + this.r);
    var shootBomb = new Bomb(this.pos.x + offset.x, this.pos.y + offset.y, vector.setMag(15), 35, 100, this.latestShot);
    gameScreen.game.entities.push(shootBomb);

    var recoilForce = p5.Vector.fromAngle(shootBomb.acc.heading()).rotate(PI);
    recoilForce.setMag(shootBomb.mass * shootBomb.acc.mag());
    this.applyForce(recoilForce);
};


TurretBomber.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
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

    // Draw gun
    var barrelWidth = 25;
    var barrelLength = 25;
    var mult = cam.getDrawSize(1);
    scr.rect(0, -barrelWidth * 0.5 * mult, barrelLength * mult, barrelWidth * mult);

    scr.pop();
};
