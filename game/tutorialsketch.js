var ship
var asteroids = []
var lasers = []

function setup() {
    sample = loadSound('game/sounds/Pew.mp3');
    createCanvas(windowWidth, windowHeight);
    ship = new Ship()
    for (let i = 0; i < 1; i++) {
        asteroids.push(new Asteroid())
    }
}

function draw() {
    background(0)

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('oops')
        }
        asteroids[i].render()
        asteroids[i].update()
        asteroids[i].edges()
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render()
        lasers[i].update()
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1)
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 25) {
                        var newAsteroids = asteroids[j].breakup()
                        asteroids = asteroids.concat(newAsteroids)
                    }
                    asteroids.splice(j, 1)
                    asteroids.push(new Asteroid())
                    lasers.splice(i, 1)
                    break
                }
            }
        }
    }

    ship.render()
    ship.turn()
    ship.update()
    ship.edges()
}

function keyReleased() {
    if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0)
    }
    if (keyCode == LEFT_ARROW) {
        ship.setRotation(0)
    }
    if (keyCode == UP_ARROW) {
        ship.boosting(false)
    }
    if (keyCode == 32) {}
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.07)
    } else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.07)
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true)
    } else if (keyCode == 32) {
        lasers.push(new laser(ship.pos, ship.heading))
        sample.play()
    }
}