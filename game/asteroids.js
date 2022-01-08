function Asteroid(pos, r) {
    if (pos) {
        this.pos = pos.copy()
    } else {
        this.pos = createVector(random(width), random(height))
    }

    if (r) {
        this.r = r * 0.5
    } else {
        this.r = random(15, 50)
    }

    let velocity = p5.Vector.random2D()
    let Asteroidtotal = floor(random(5, 15))
    this.offset = []
    for (let i = 0; i < Asteroidtotal; i++) {
        this.offset[i] = random(-this.r, this.r)
    }

    this.update = function () {
        this.pos.add(velocity)
    }

    this.render = function () {
        push()
        translate(this.pos.x, this.pos.y)
        stroke(255)
        noFill()
        beginShape()
        for (let i = 0; i < Asteroidtotal; i++) {
            var angle = map(i, 0, Asteroidtotal, 0, TWO_PI)
            var r = this.r + this.offset[i]
            var x = r * cos(angle)
            var y = r * sin(angle)
            vertex(x, y)
        }
        endShape(CLOSE)

        this.breakup = function () {
            var newA = []
            newA[0] = new Asteroid(this.pos, this.r)
            newA[1] = new Asteroid(this.pos, this.r)
            return newA
        }

        this.edges = function () {
            if (this.pos.x > width + this.r) {
                this.pos.x = -this.r
            } else if (this.pos.x < -this.r) {
                this.pos.x = width + this.r
            }

            if (this.pos.y > height + this.r) {
                this.pos.y = -this.r
            } else if (this.pos.y < -this.r) {
                this.pos.y = height + this.r
            }
        }
        pop()
    }
}