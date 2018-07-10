function Turret(x_, y_, colour_) {
    // Inherit from Entity
    Entity.call(this, x_, y_, 20);
    // this.r = 5;
    // this.pos = createVector(x_, y_);
    this.direction = 0;
    this.playerControlRadius = 200;
    this.colour = colour_;
}

// Adds the Entity prototype to the Turret object
Turret.prototype = Object.create(Entity.prototype);

Turret.prototype.update = function() {
    if (this.pos.dist(player.pos) < this.playerControlRadius) {
        // Player controlled
        var vectorPlayerToTurret = p5.Vector.sub(this.pos, player.pos);

        this.direction = vectorPlayerToTurret.heading();
        // this.direction = player.pos.copy().sub(this.pos).normalize();
    }
}

Turret.prototype.draw = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.direction);
    
    // Draw control radius
    fill(0, 255, 0, 10);
    ellipse(0, 0, this.playerControlRadius * 2);

    // Draw Turret
    //fill(255, 0, 0);
    //rectMode(CENTER);
    //rect(0, 0, 30, 50);
    
    fill(this.colour);
    noStroke();
    ellipse(0, 0, this.r * 2);
    // Draw gun
    rect(0, -3, 30, 6);    
    
    pop();
}
