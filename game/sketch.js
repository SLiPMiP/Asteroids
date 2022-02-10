let ship
let deaths = 0
let asteroids = []
let lasers = []
let sample
let backstuff
let ruggedness = 3 //higher = more round, lower = more spikey
let asteroidAmount = 10 //amount of asteroids on the field at all times.

function preload() {
    backstuff = loadSound("sounds/back.mp3");
}

function setup() {
    sample = loadSound('sounds/Pew.mp3');
    backstuff.play()
    backstuff.loop()
    createCanvas(windowWidth, windowHeight);
    ship = new Ship()
    for (let i = 0; i < asteroidAmount; i++) {
        asteroids.push(new Asteroid())
    }
    noFill()
}

function draw() {
    background(0)
    for (let i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {  
            
            noLoop();
            fill(230, 230, 230, 50);
            textSize(150);
            text('man im dead', 200, 200, 20000, 2000);
            text('so bad', 350, 0, 20000, 2000);
        }
        asteroids[i].render()
        asteroids[i].update()
        asteroids[i].edges()
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render()
        lasers[i].update()
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1)
        } else {
            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 25) {
                        let newAsteroids = asteroids[j].breakup()
                        asteroids = asteroids.concat(newAsteroids)
                        asteroids.push(new Asteroid())   
                    }
                    asteroids.splice(j, 1)
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

    rect(0, 0, windowWidth, windowHeight)
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
