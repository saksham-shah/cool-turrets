// var player;
// var entities;
var dt;
var game;

function setup() {
    var canvas = createCanvas(960, 640);


    lastUpdate = Date.now();

    game = new Game();

}


function draw() {
    game.update();
    game.draw();

}

function keyPressed() {
    if (keyCode == 69) {
        game.entities.push(new EnemySeeker(random(0, game.xBound), random(0, game.yBound) / 3, color(0, 255, 0)));
    }
}
