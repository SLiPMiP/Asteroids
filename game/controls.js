let turnspeedmultiplier = 1
let turnspeed = 0.07 * turnspeedmultiplier
let turnright = false
let turnleft = false
let shooting = false
let shootthing = 0
let attackspeed = 200 //time in ms between attacks

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        turnleft = true
    } else if (keyCode == RIGHT_ARROW) {
        turnright = true
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true)
    } else if (keyCode == 32) {
        shooting = true
        shootthing = millis()
        lasers.push(new laser(ship.pos, ship.heading))
        sample.play()
    }
}


function keyReleased() {
    if (keyCode == LEFT_ARROW) {
        turnleft = false
        ship.setRotation(0)
    }
    if (keyCode == RIGHT_ARROW) {
        turnright = false
        ship.setRotation(0)
    }
    if (keyCode == UP_ARROW) {
        ship.boosting(false)
    }
    if (keyCode == 32) {
        shooting = false
    }
}


function Controls() {
    if (turnleft) {
        ship.setRotation(-turnspeed)
    }
    if (turnright) {
        ship.setRotation(turnspeed)
    }
    if (turnright & turnleft) {
        ship.setRotation(0)
    }
    if (shooting) {
        if (millis() > shootthing + attackspeed) {
            lasers.push(new laser(ship.pos, ship.heading))
            sample.play()
            shootthing = millis()
        }
    }
}