let turnspeedmultiplier = 1
let turnspeed = 0.07 * turnspeedmultiplier
let turnright = false
let turnleft = false
let shoot = false

// lasers.push(new laser(ship.pos, ship.heading))
//         sample.play()

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        turnleft = true
    } else if (keyCode == RIGHT_ARROW) {
        turnright = true
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true)
    } else if (keyCode == 32) {
        shoot = true
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
    shoot = false
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
}