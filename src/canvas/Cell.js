export class Cell {
    constructor(ctx, x, y, radius, row, col){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colorAlive = '#00adff';
        this.colorDead = '#000127FF';
        this.row = row;
        this.col = col;
        this.radians = 0;
        this.alive = null;
    }

    set setState(state) {
        this.alive = state
    }

    canvasWrapper = toDraw => {
        return function () {
            const cell = this
            const render = this.ctx
            this.ctx.beginPath();
            toDraw(cell, render);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    colorWrapper = toColor => {
        return function () {
            const isAlive = this.alive
            const dead = this.colorDead
            const alive = this.colorAlive
            toColor(isAlive, dead, alive)
        }
    }

    assignStateColors = (isAlive, dead, alive) => {
        const fill = (color) => this.ctx.fillStyle = color
        const stroke = (color) => this.ctx.strokeStyle = color
        // Colors cells wi
        isAlive ? fill(alive) : fill(dead)
        isAlive ? stroke(dead) : stroke(alive)
    }
    cellColor = this.colorWrapper(this.assignStateColors)

    renderCell = (cell, render) => {
        render.arc(
            cell.x,
            cell.y,
            cell.radius,
            0,
            Math.PI *2,
            false
        )
        this.cellColor()
    }

    renderCoordinates = (cell, render)=> {
        render.font = `${cell.radius/3}px Arial`;
        render.textAlign = 'center'
        render.strokeText(
            `${cell.col++} | ${cell.row++}`,
            cell.x+cell.radius/cell.x,
            cell.y+cell.radius/cell.y*cell.row
        )
    }

    drawCell = this.canvasWrapper(this.renderCell)
    drawCoordinates = this.canvasWrapper(this.renderCoordinates)
}
