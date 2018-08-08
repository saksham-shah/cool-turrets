function MenuScreen() {
    this.buttons = [];
}

MenuScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
};

MenuScreen.prototype.draw = function() {
    background(0);
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
};