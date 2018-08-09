function Button(x_, y_, r_, hue_, text_, textSize_, onClick_) {
    this.pos = createVector(x_, y_);

    this.r = r_;

    this.hue = hue_;

    this.text = text_;
    this.textSize = textSize_;

    this.onClick = onClick_;

    this.hover = false;

    // The current weight of the noise
    this.noiseWeight = 0;

    // The target weight - this is 0 when not hovered, and 1 when hovered
    this.targetNoiseWeight = 0;

    // How fast the button gets bigger and smaller
    this.noiseWeightSpeed = 0.05;

    // Noise buffer makes the button slow down as it reaches its maximum size, so it looks super smooth
    this.noiseBuffer = 1;
}

Button.prototype.update = function() {
    // noiseWeightChange is positive when the current noise is too small, and vice versa
    var noiseWeightChange = (this.targetNoiseWeight - this.noiseWeight) / this.noiseBuffer;

    // These if statements are never met right now. If the noiseBuffer is lower than 0.75 they will be met.
    if (noiseWeightChange > 1) {
        noiseWeightChange = 1;
    } else if (noiseWeightChange < -1) {
        noiseWeightChange = -1;
    }

    // Changes the noiseWeight as required
    this.noiseWeight += this.noiseWeightSpeed * noiseWeightChange;

    if (p5.Vector.dist(this.pos, createVector(mouseX, mouseY)) < this.r) {
        this.hover = true;
        this.targetNoiseWeight = 1;
    } else {
        this.hover = false;
        // When the weight is 0, the button will be a normal circle
        this.targetNoiseWeight = 0;
    }

    if (this.hover && mouseIsPressed) {
        this.onClick();
    }
};

Button.prototype.draw = function() {
    // var white = color(255);
    // var red = color(0, 100, 100);

    fill(this.hue, 100 * this.noiseWeight, 100);
    noStroke();

    // if (this.hover) {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    var angleStep = TWO_PI / 100;
    for (var a = 0; a <= TWO_PI; a += angleStep) {
        // The sin(a) and cos(a) makes the noise look smooth all round the circle
        // The +1 prevents the noise from being symmetric
        var noiseR = noise((sin(a) + 1) * 0.3, (cos(a) + 1) * 0.3, frameCount * 0.01 + this.pos.x + this.pos.y);
        var changedR = this.r + noiseR * this.noiseWeight * this.r * 0.75;
        // let r = this.r / 2 + noise(a / 3 + this.pos.x, frameCount * 0.02) * this.r;
        curveVertex(cos(a) * changedR, sin(a) * changedR);
    }

    endShape();

    textAlign(CENTER);
    var size = this.textSize + this.noiseWeight * this.textSize * 0.5;
    textSize(size);
    fill(0);
    noStroke();
    text(this.text, 0, size / 3);


    pop();
    // } else {
    //     ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    //
    // }



};
