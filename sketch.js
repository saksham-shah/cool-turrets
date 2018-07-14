// var player;
// var entities;
var dt;
var game;

function setup() {
    var canvas = createCanvas(960, 640);

    colorMode(HSB);


    lastUpdate = Date.now();

    game = new Game();

}


function draw() {
    game.update();
    game.draw();

}