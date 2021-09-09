import {DrawHandler} from "./DrawHandler";

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

    cellCanvas = () => {

        const render = this.ctx
        const cell = this

        render.arc(
            cell.x,
            cell.y,
            cell.radius,
            0,
            Math.PI *2,
            false
        )

        if (cell.alive) {
            render.fillStyle = cell.colorAlive;
            render.strokeStyle = cell.colorDead;
        } else {
            render.fillStyle = cell.colorDead;
            render.strokeStyle = cell.colorAlive;
        }
    }

    coordinatesCanvas = ()=> {

        const render = this.ctx
        const cell = this

        render.font = `${cell.radius/3}px Arial`;
        render.textAlign = 'center'
        render.strokeText(
            `${cell.col++} | ${cell.row++}`,
            cell.x+cell.radius/cell.x,
            cell.y+cell.radius/cell.y*cell.row
        )

        // Flips coordinates font color to be visible according to cell state.
        const flipColor = (style) => render.strokeStyle = style
        const isAlive = cell.alive
        const contrastAlive = cell.colorDead
        const contrastDead = cell.colorAlive

        isAlive ? flipColor(contrastAlive) : flipColor(contrastDead)

    }

    drawCell = DrawHandler(this.cellCanvas)
    drawCoordinates = DrawHandler(this.coordinatesCanvas)
}
