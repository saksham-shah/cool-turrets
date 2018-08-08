// var player;
// var entities;
var dt;
var game;

function setup() {
    // Multiplied by sqrt(2) because the split screen halved the view area
    var canvas = createCanvas(960 * 1.4, 640 * 1.4);

    colorMode(HSB);


    lastUpdate = Date.now();

    // game = new Game("single-player");
    game = new Game("two-player");

}


function draw() {
    game.update();
    game.draw();

}
