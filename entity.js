// Base object for game objects that have a pos, vel and acc (all vectors)
function Entity(x_, y_, friction_, r_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.maxVel = 3.5;
    this.maxForce = 0.1;
    this.friction = friction_;

    // R for radius
    this.r = r_;

    this.drawPos = this.pos.copy();

    this.collided = false;
}

// Handles wall and entiity collisions
Entity.prototype.collisions = function(entities) {
    this.collided = false;

    this.borders();
    this.checkCollisions(entities);
}

// Moves using pos, vel and acc
Entity.prototype.move = function() {

    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.acc.mult(0);

    //Apply friction
    this.vel.mult(this.friction);

    //Get Position relative to camera
    this.drawPos = game.gameCam.getDrawPos(this.pos);
};

Entity.prototype.futurePos = function() {
    var future = this.pos.copy();
    future.add(p5.Vector.mult(this.vel, dt));
    return future;
}

Entity.prototype.collide = function(entity) {
    if (p5.Vector.dist(this.futurePos(), entity.pos) <= this.r + entity.r) {
        this.collided = true;

        //Bounce
        var normal = p5.Vector.sub(this.pos, entity.pos);
        normal.normalize();

        var reflectedVector = reflectVector(this.vel, normal);
        this.vel = reflectedVector.copy();
        //this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.add(normal);
        // console.log(this.vel);
    }
};

Entity.prototype.borderBounce = function() {
    //Bounce off walls
    if (this.pos.x < this.r || this.pos.x > game.xBound - this.r) {
        this.vel = reflectVector(this.vel, createVector(1, 0));
    }
    if (this.pos.y < this.r || this.pos.y > game.yBound - this.r) {
        this.vel = reflectVector(this.vel, createVector(0, 1));
    }
}

Entity.prototype.borders = function() {
    if (!rectContains(this.pos, 0, 0, game.xBound, game.yBound)) {
        var forceToCentre = p5.Vector.sub(createVector(game.xBound / 2, game.yBound / 2), this.pos);
        forceToCentre.setMag(0.3);
        this.acc.add(forceToCentre);
    }
};

Entity.prototype.checkCollisions = function(entities) {
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] != this) { //Don't test for collisions with self
            if (circleCollision(this, entities[i])) {
                this.collide(entities[i]);
            }
        }
    }
}

Entity.prototype.hitByBullet = function(bullet) {
    this.health -= bullet.damage;
    console.log("Hit for " + bullet.damage + " damage, health left: " + this.health);
}
