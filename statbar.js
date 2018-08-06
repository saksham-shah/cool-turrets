function StatBar(maxValue_, parent_, getValueFunction_) {
    this.maxValue = maxValue_;

    // This is the entity above which the stat bar will show
    this.parent = parent_;

    // This is a function which takes in the parent and returns the current value of the stat bar
    this.getValueFunction = getValueFunction_;

    // Dimensions of the bar - just constants right now
    this.w = 30;
    this.h = 10;
}

// Hard coded colours for now
StatBar.prototype.draw = function(cam, scr) {
    var drawPos = cam.getDrawPos(this.parent.pos.x, this.parent.pos.y);
    var drawR = cam.getDrawSize(this.parent.r);
    scr.push();
    scr.translate(drawPos.x, drawPos.y);

    var drawW = cam.getDrawSize(this.w);
    var drawH = cam.getDrawSize(this.h);
    var mult = cam.getDrawSize(1);

    scr.stroke(0);
    scr.strokeWeight(mult);
    scr.fill(0, 0, 78.4);

    scr.rect(-drawW, -drawR - drawH - 5 * mult, drawW * 2, drawH);

    var currentValue = this.getValueFunction(this.parent);
    var percentageFill = currentValue / this.maxValue;

    scr.fill(120, 100, 100);
    scr.rect(-drawW, -drawR - drawH - 5 * mult, drawW * 2 * percentageFill, drawH);

    scr.pop();
}
