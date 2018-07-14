function hexCorner(x, y, size, i) {
    var angle_deg = 60 * i + 30;
    var angle_rad = PI / 180 * angle_deg;
    return createVector(x + size * cos(angle_rad),
        y + size * sin(angle_rad));
}

function drawHex(x, y, size) {
    beginShape();
    for (var i = 0; i < 6; i++) {
        let c = hexCorner(x, y, size, i);
        vertex(c.x, c.y);
    }
    endShape(CLOSE);
}


function drawHexes(x, y, size, gap, color, hexes) {
    //Draws A whole bunch of hexagons given their coords
    let hexHeight = size * 2;
    let hexWidth = sqrt(3) / 2 * hexHeight;
    let hexHDist = hexWidth + gap;
    let hexVDist = hexHeight * 3 / 4 + gap;

    push();
    translate(x, y);
    fill(color);
    noStroke();
    for (var i = 0; i < hexes.length; i++) {
        if (hexes[i][1] % 2 == 0) {
            drawHex(hexes[i][0] * hexHDist, hexes[i][1] * hexVDist, size);
        } else {
            drawHex((hexes[i][0] + 0.5) * hexHDist, hexes[i][1] * hexVDist, size);
        }

    }
    pop();

}