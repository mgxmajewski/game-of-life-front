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

        const canvas = this.ctx
        const cell = this

        canvas.arc(
            cell.x,
            cell.y,
            cell.radius,
            0,
            Math.PI *2,
            false
        )

        if (cell.alive) {
            canvas.fillStyle = cell.colorAlive;
            canvas.strokeStyle = cell.colorDead;
        } else {
            canvas.fillStyle = cell.colorDead;
            canvas.strokeStyle = cell.colorAlive;
        }
    }

    coordinatesCanvas = ()=> {

        const canvas = this.ctx
        const cell = this

        canvas.font = `${cell.radius/3}px Arial`;
        canvas.textAlign = 'center'
        canvas.strokeText(
            `${cell.col++} | ${cell.row++}`,
            cell.x+cell.radius/cell.x,
            cell.y+cell.radius/cell.y*cell.row
        )

        if (cell.alive) {
            canvas.strokeStyle = cell.colorDead;
        } else {
            canvas.strokeStyle = cell.colorAlive;
        }
    }

    drawCell = DrawHandler(this.cellCanvas)
    drawCoordinates = DrawHandler(this.coordinatesCanvas)
}
