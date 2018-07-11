function Turret(x_, y_, colour_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, 0.99, 20); // 1 for friction means there is no friction - turrets glide forever

    this.direction = 0;
    this.playerControlRadius = 50;
    this.colour = colour_;

    this.reloadTime = 60;
    this.reloadTimer = this.reloadTime;
}

// Adds the Entity prototype to the Turret object
Turret.prototype = Object.create(Entity.prototype);

Turret.prototype.update = function() {
    //Shoot Timer
    this.reloadTimer -= dt;

    //Move
    //this.acc.y = 0.05;

    //Check if player within range of turret
    if (this.pos.dist(game.player.pos) < this.playerControlRadius + game.player.r) {
        // Player controlled
        var vectorPlayerToTurret = p5.Vector.sub(this.pos, game.player.pos);

        this.direction = vectorPlayerToTurret.heading();


        if (this.reloadTimer < 0) {
            this.reloadTimer = this.reloadTime;
            this.shoot();
        }
    }



    //When off the screen, reposition turret
    if (this.pos.x - this.r > width) {
        this.pos.x = -this.r;
        this.pos.y = random(this.r, height - this.r);
    } else if (this.pos.y - this.r > height) {
        this.pos.y = -this.r;
        this.pos.x = random(this.r, width - this.r);
    } else if (this.pos.x + this.r < 0) {
        this.pos.y = random(this.r, height - this.r);
        this.pos.x = width + this.r;
    } else if (this.pos.y + this.r < 0) {
        this.pos.y = height + this.r;
        this.pos.x = random(this.r, width - this.r);

    }
};

Turret.prototype.shoot = function() {
    game.entities.push(new Bullet(this.pos.x, this.pos.y, this.direction, 10, this.colour));
    var recoilForce = p5.Vector.fromAngle(this.direction).rotate(PI);
    this.acc.add(recoilForce.div(3));

};

Turret.prototype.draw = function() {
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
