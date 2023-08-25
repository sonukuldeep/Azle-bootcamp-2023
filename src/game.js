const stars = [];
const countStar = 1000;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvas-container')
    textSize(30);
    textAlign(CENTER, CENTER);
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();

    }
}

function draw() {
    background(42, 52, 88);
    translate(width / 2, height / 2);
    for (let i = 0; i < stars.length; i++) {
        stars[i].updateLocation();
        stars[i].createStar();

    }
    fill(0, 102, 153);
    text('Coming soon', 0, 0);
}

//star object
function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    this.updateLocation = function () {
        this.z = this.z - 1;

        if (this.z < 1) {
            this.z = width;
        }
    }

    this.createStar = function () {
        fill(126, 214, 223);
        noStroke();
        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);
        ellipse(sx, sy, 8, 8);
    }
}
