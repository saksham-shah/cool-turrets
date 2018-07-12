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
StatBar.prototype.draw = function() {
    push();
    translate(this.parent.drawPos.x, this.parent.drawPos.y);

    stroke(0);
    strokeWeight(1);
    fill(200);

    rect(-this.w, -this.parent.r - this.h - 5, this.w * 2, this.h);

    var currentValue = this.getValueFunction(this.parent);
    var percentageFill = currentValue / this.maxValue;

    fill(0, 255, 0);
    rect(-this.w, -this.parent.r - this.h - 5, this.w * 2 * percentageFill, this.h);





    pop();






}
