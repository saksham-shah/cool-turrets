var player;

function setup() {
  createCanvas(600, 400);
  player = new Player(0, 0);
}

function draw() {
  background(50);
  player.update();
  player.move();
  player.draw();

}
