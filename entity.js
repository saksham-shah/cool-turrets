// Base object for game objects that have a pos, vel and acc (all vectors)
function Entity(x_, y_, health_, r_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.maxVel = 3.5;
    this.maxForce = 0.1;
    this.friction = 0.96;

    // R for radius
    this.r = r_;

    this.mass = 10;

    this.bodyDamage = 1;

    this.drawPos = this.pos.copy();

    this.collided = false;

    this.alive = true;
    this.health = health_;
    this.healthBar = new StatBar(this.health, this,
        function(entity) {
            return entity.health;
        });

    this.timeAlive = 0;
    //(entity) => entity.health);
}

Entity.prototype.applyForce = function(force) {
    // F = ma
    var acceleration = force.div(this.mass);
    // console.log(acceleration.mag());
    this.acc.add(acceleration);
}

// Handles wall and entiity collisions
Entity.prototype.collisions = function(entities) {
    this.collided = false;

    this.borders();
    this.checkCollisions(entities);
}

// Moves using pos, vel and acc
Entity.prototype.move = function() {

    this.timeAlive += dt;

    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.acc.mult(0);

    //Apply friction
    this.vel.mult(this.friction);

    //Get Position relative to camera
    this.drawPos = game.gameCam.getDrawPos(this.pos);
    this.drawR = game.gameCam.getDrawSize(this.r);

    // General updates
    this.showHealthBar -= dt;
};

Entity.prototype.futurePos = function() {
    var future = this.pos.copy();
    future.add(p5.Vector.mult(this.vel, dt));
    return future;
};

Entity.prototype.collide = function(other) {
    if (!(this instanceof Enemy) || !(other instanceof Enemy)) {
        this.loseHealth(other.bodyDamage);
        other.loseHealth(this.bodyDamage);
    }
    this.collided = true;

    //taken from https://stackoverflow.com/questions/35907053/including-the-law-of-conservation-of-momentum-in-a-simple-collision

    //Bounce
    var bVect = p5.Vector.sub(other.pos, this.pos);

    // precalculate trig values
    var theta = bVect.heading();
    var sine = sin(theta);
    var cosine = cos(theta);

    /* bTemp will hold rotated ball positions. You
       just need to worry about bTemp[1] position*/
    bTemp = [createVector(0, 0), createVector(0, 0)];
    bTemp[1].x = cosine * bVect.x + sine * bVect.y;
    bTemp[1].y = cosine * bVect.y - sine * bVect.x;

    vTemp = [createVector(0, 0), createVector(0, 0)];

    vTemp[0].x = cosine * this.vel.x + sine * this.vel.y;
    vTemp[0].y = cosine * this.vel.y - sine * this.vel.x;
    vTemp[1].x = cosine * other.vel.x + sine * other.vel.y;
    vTemp[1].y = cosine * other.vel.y - sine * other.vel.x;

    /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate
       the final velocity along the x-axis. */

    vFinal = [createVector(0, 0), createVector(0, 0)];

    // final rotated velocity for b[0]
    vFinal[0].x = ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) / (this.mass + other.mass);
    vFinal[0].y = vTemp[0].y;

    // final rotated velocity for b[0]
    vFinal[1].x = ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) / (this.mass + other.mass);
    vFinal[1].y = vTemp[1].y;

    // hack to avoid clumping
    bTemp[0].x += vFinal[0].x;
    bTemp[1].x += vFinal[1].x;

    /* Rotate ball positions and velocities back
           Reverse signs in trig expressions to rotate
           in the opposite direction */
    // rotate balls
    bFinal = [createVector(0, 0), createVector(0, 0)];

    bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
    bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
    bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
    bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

    // update balls to screen position
    other.pos.x = this.pos.x + bFinal[1].x;
    other.pos.y = this.pos.y + bFinal[1].y;

    this.pos.add(bFinal[0]);

    // update velocities
    this.vel.x = cosine * vFinal[0].x - sine * vFinal[0].y;
    this.vel.y = cosine * vFinal[0].y + sine * vFinal[0].x;
    other.vel.x = cosine * vFinal[1].x - sine * vFinal[1].y;
    other.vel.y = cosine * vFinal[1].y + sine * vFinal[1].x;


    //Move objects away from each other if they intersect
    var maxForce = 3;
    var d = this.pos.dist(other.pos);
    if (d < this.r + other.r) {
        var desired = p5.Vector.sub(other.pos, this.pos);
        desired.normalize();
        desired.rotate(PI);
        desired.mult(map(d, 0, this.r + other.r, maxForce, 0.5));

        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(maxForce);

        this.acc.add(steer);

        var desired = p5.Vector.sub(this.pos, other.pos);
        desired.normalize();
        desired.rotate(PI);
        desired.mult(map(d, 0, other.r + this.r, maxForce, 0.5));

        var steer = p5.Vector.sub(desired, other.vel);
        steer.limit(maxForce);

        other.acc.add(steer);
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
};

Entity.prototype.borders = function() {
    if (!rectContains(this.pos, 0, 0, game.xBound, game.yBound)) {
        var forceToCentre = p5.Vector.sub(createVector(game.xBound / 2, game.yBound / 2), this.pos);
        forceToCentre.setMag(0.3);
        this.acc.add(forceToCentre);
    }
};

Entity.prototype.checkCollisions = function(entities) {
    var found = false;
    for (var i = 0; i < entities.length; i++) {
        if (entities[i] == this || found == false) {
            found = true;
        } else {
            if (circleCollision(this, entities[i])) {
                this.collide(entities[i]);

            }
        }
    }
};

Entity.prototype.loseHealth = function(healthLost) {

    if (this.timeAlive > 10) {
        this.health -= healthLost;
        this.showHealthBar = 250;
        if (this.health <= 0) {
            this.alive = false;
        }
    }
};

Entity.prototype.hitByBullet = function(bullet) {
    var knockbackForce = bullet.vel.copy();
    knockbackForce.setMag(bullet.r * bullet.r * bullet.speed * 0.1);
    this.applyForce(knockbackForce);

    this.loseHealth(bullet.damage);

    // console.log(knockback.mag());
    // console.log("Hit for " + bullet.damage + " damage, health left: " + this.health);
};