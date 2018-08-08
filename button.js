function Button(x_, y_, r_, onClick_) {
    this.pos = createVector(x_, y_);

    this.r = r_;

    this.onClick = onClick_;

    this.hover = false;


}

Button.prototype.update = function() {
    if (p5.Vector.dist(this.pos, createVector(mouseX, mouseY)) < this.r) {
        this.hover = true;
    } else {
        this.hover = false;
    }

    if (this.hover && mouseIsPressed) {
        this.onClick();
    }
};

Button.prototype.draw = function() {
    fill(255);

    if (this.hover) {
        push();
        translate(this.pos.x, this.pos.y);
        beginShape();
        for (var a = 0; a < TWO_PI; a += 0.01) {
            let r = this.r / 2 + noise(a / 3 + this.pos.x, frameCount * 0.02) * this.r;
            vertex(cos(a) * r, sin(a) * r);
        }

        endShape();


        pop();
    } else {
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

    }



};