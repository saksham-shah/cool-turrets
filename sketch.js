var player;
// var player;
// var entities;
var dt;
var gameHeight;

function setup() {
    var canvas = createCanvas(960, 640);
    gameWidth = 960;
    gameHeight = 640;

    entities = [];
    bullets = [];

    player = new Player(gameWidth / 2, gameHeight / 2);
    entities.push(player);

    entities.push(new TurretStandard(gameWidth / 2, gameHeight / 2, color(255, 0, 0)));

    entities.push(new EnemySeeker(gameWidth / 3, gameHeight / 3, color(0, 255, 0)));

    lastUpdate = Date.now();
    game = new Game();
    //
    // entities = [];
    // entities.push(player);
    //
    // entities.push(new Turret(width / 2, height / 2, color(255, 0, 0)));
    //
    // entities.push(new EnemySeeker(width / 3, height / 3, color(0, 255, 0)));
    //
    // lastUpdate = Date.now();
}


function draw() {
    // Calculate Delta time in order to have smooth movement
    var now = Date.now();
    dt = (now - lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    lastUpdate = now;

    background(50);
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update();
    }
    // var now = Date.now();
    // dt = (now - lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    // lastUpdate = now;
    //
    // background(50);
    //
    // for (var i = 0; i < entities.length; i++) {
    //     entities[i].update();
    //     entities[i].move();
    // }
    // for (var i = 0; i < entities.length; i++) {
    //     entities[i].draw();
    // }
    game.update();
    game.draw();

}