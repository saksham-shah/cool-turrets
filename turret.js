function Turret(x_, y_, colour_, r_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, 0.98, r_); // 1 for friction means there is no friction - turrets glide forever

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
    this.movement();

    //Check if player within range of turret
    if (this.pos.dist(player.pos) < this.playerControlRadius + player.r) {
        var vectorPlayerToTurret = p5.Vector.sub(this.pos, player.pos);

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