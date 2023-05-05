const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const print = (t) => console.log(t)

const data = {
    width: canvas.width,
    height: canvas.height,
    O: { x: 400, y: 400 },
    Length: 8,
    Radius: 100,
}

let seta = 0
const PI2 = Math.PI * 2
const dRGB = 255 / data.Length

function lineTo(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

function fromOlineTo(dx, dy, _rad = 0) {
    ctx.save()

    ctx.translate(data.O.x, data.O.y)
    ctx.rotate(_rad)
    ctx.translate(-data.O.x, -data.O.y)

    ctx.moveTo(data.O.x, data.O.y)
    ctx.lineTo(data.O.x + dx, data.O.y + dy)
    ctx.stroke()

    ctx.restore()
}

class Circle {
    constructor(i, radius, hangObj, angleSpeed) {
        this.radius = radius
        this.hangObj = hangObj
        this.seta = 0
        this.angleSpeed = angleSpeed
        this.index = i
    }
    get Origin() {
        if (this.hangObj == undefined) {
            return { x: data.O.x, y: data.O.y }
        }
        return this.hangObj.pos
    }
    get pos() {
        let O = this.Origin
        return {
            x: O.x + this.radius * Math.cos(this.seta),
            y: O.y + this.radius * Math.sin(this.seta)
        }

    }
    draw() {
        let O = this.Origin
        let pos = this.pos
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'
        ctx.arc(O.x, O.y, Math.floor(this.radius), 0, PI2)
        ctx.stroke()
        ctx.closePath()

        ctx.strokeStyle = `rgb(${this.index * dRGB},${255 -this.index * dRGB},215`
        lineTo(O.x, O.y, Math.floor(pos.x), Math.floor(pos.y))


    }
    addSeta() {
        this.seta += this.angleSpeed
        if (this.seta > PI2) {
            this.seta -= PI2
        }
    }
}

const renderObj = []

for (var i = 0; i < data.Length; i++) {
    renderObj.push(new Circle(i, data.Radius / (i/3 + 1), renderObj[i - 1], (i+ 1) * 0.01))
}

function render() {
    ctx.clearRect(0, 0, data.width, data.height)
    for (var i = 0; i < renderObj.length; i++) {
        renderObj[i].draw()
        renderObj[i].addSeta()
    }
    requestAnimationFrame(render)
}

render()