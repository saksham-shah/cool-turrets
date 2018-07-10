var player;
var entities;
var dt;

function setup() {
    var canvas = createCanvas(960, 640);

    entities = [];
    player = new Player(0, 0);
    entities.push(player);

    entities.push(new Turret(width / 2, height / 2, color(255, 0, 0)));

    lastUpdate = Date.now();
}

function draw() {
    // Calculate Delta time in order to have smooth movement
    var now = Date.now();
    dt = (now - lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    lastUpdate = now;

    background(50);

    for (var i = 0; i < entities.length; i++) {
        entities[i].update();
        entities[i].move();
    }
    for (var i = 0; i < entities.length; i++) {
        entities[i].draw();
    }
}
