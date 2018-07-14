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



    var drawW = game.gameCam.getDrawSize(this.w);
    var drawH = game.gameCam.getDrawSize(this.h);
    var mult = game.gameCam.getDrawSize(1);

    stroke(0);
    strokeWeight(mult);
    fill(0, 0, 78.4);


    rect(-drawW, -this.parent.drawR - drawH - 5 * mult, drawW * 2, drawH);

    var currentValue = this.getValueFunction(this.parent);
    var percentageFill = currentValue / this.maxValue;

    fill(120, 100, 100);
    rect(-drawW, -this.parent.drawR - drawH - 5 * mult, drawW * 2 * percentageFill, drawH);





    pop();






}