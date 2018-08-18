function MenuScreen() {
    this.buttons = [];
    var white = color(255);
    var red = color(0, 100, 100);
    var green = color(120, 100, 100);
    var blue = color(240, 100, 100);

    this.buttons.push(new Button(400, 400, 80, 0, "1P", 50,
        function() {
            gameScreen.newGame("single-player");
            screen = gameScreen;
        }
    ));
    this.buttons.push(new Button(650, 400, 80, 120, "2P co-op", 30,
        function() {
            gameScreen.newGame("coop");
            screen = gameScreen;
        }
    ));
    this.buttons.push(new Button(900, 400, 80, 240, "2P vs", 30,
        function() {
            gameScreen.newGame("two-player");
            screen = gameScreen;
        }
    ));

    this.lastButtonID = 0;
}

MenuScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
        if (this.buttons[i].hover) {
            this.lastButtonID = i;
        }
    }
};

MenuScreen.prototype.draw = function() {
    background(0);
    fill(this.buttons[this.lastButtonID].color);
    textSize(128);
    textAlign(CENTER);
    text("Cool Turrets", 650, 200);

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
};