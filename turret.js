function Turret(x_, y_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, 5);
    // this.r = 5;
    // this.pos = createVector(x_, y_);
    this.direction = createVector(0, 1); // It might make sense for this to be a number in radians
    this.playerControlRadius = 200;
}

// Adds the Entity prototype to the Turret object
Player.prototype = Object.create(Entity.prototype);

Turret.prototype.update = function() {
    if (this.pos.dist(player.pos) < this.playerControlRadius) {
        //Player controlled
        this.direction = player.pos.copy().sub(this.pos).normalize();
    }
}

Turret.prototype.draw = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.direction.heading());
    
    //Draw control radius
    fill(0, 255, 0, 10);
    ellipse(0, 0, this.playerControlRadius * 2);

    //Draw Turret
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(0, 0, 30, 50);


    pop();
}
