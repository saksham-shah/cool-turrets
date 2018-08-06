function AreaEffect(x_, y_, r_, effect_, data_) {
    this.pos = createVector(x_, y_);
    this.r = r_;
    this.currentR = 0;

    // How fast it expands
    this.speed = 15;

    // A function applied to any entities in the area - e.g. entity.loseHealth(50);
    this.effect = effect_;

    // An array of entities that have been affected (so they only lose health once)
    this.affected = [];

    // Any data can be passed in - used for bomb.js
    this.data = data_;

    this.done = false;
}

AreaEffect.prototype.update = function(entities) {
    // It expands
    if (this.currentR < this.r) {
        this.currentR += dt * this.speed;
    } else {
        // Disappears once it reaches its maximum radius
        this.done = true;
    }

    for (var i = 0; i < entities.length; i++) {
        var d = p5.Vector.dist(this.pos, entities[i].pos);
        if (d <= this.currentR) {
            if (!this.affected.includes(entities[i])) {
                if (this.effect(this, entities[i])) {
                    this.affected.push(entities[i]);
                }
            }
        }
    }
}

AreaEffect.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(this.currentR);

    scr.push();

    scr.translate(drawPos.x, drawPos.y);

    scr.fill(0, 100, 58.8, 100);
    scr.noStroke();

    scr.ellipse(0, 0, drawR * 2);

    scr.pop();
}
