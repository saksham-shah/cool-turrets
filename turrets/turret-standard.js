function TurretStandard(x_, y_) {
    // Inherit from Entity
    Turret.call(this, x_, y_, 100);

    // this.health = 30;

    this.playerControlRadius = 100;

    this.reloadTime = 30;

    this.bulletTemplate = {
        speed: 10,
        damage: 10,
        range: 400,
        r: 7
    };

    this.recoil = this.bulletTemplate.r * 0.1;
}
// Adds the Turret prototype to the TurretStandard object
TurretStandard.prototype = Object.create(Turret.prototype);

TurretStandard.prototype.draw = function(cam, scr) {
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

    // Draw gun
    var barrelWidth = 12;
    var barrelLength = 30;
    var mult = cam.getDrawSize(1);
    scr.rect(0, -barrelWidth * 0.5 * mult, barrelLength * mult, barrelWidth * mult);

    scr.pop();
};
