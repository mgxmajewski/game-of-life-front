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
        this.ctx.arc(
            this.x,
            this.y, this.radius,
            0,
            Math.PI *2,
            false
        );
        if (this.alive) {
            this.ctx.fillStyle = this.colorAlive;
            this.ctx.strokeStyle = this.colorDead;
        } else {
            this.ctx.fillStyle = this.colorDead;
            this.ctx.strokeStyle = this.colorAlive;
        }
    }

    coordinatesCanvas = ()=> {
        this.ctx.font = `${this.radius/3}px Arial`;
        this.ctx.textAlign = 'center'
        this.ctx.strokeText(
            `${this.col+1} | ${this.row+1}`,
            this.x+this.radius/this.x,
            this.y+this.radius/this.y*this.row
        );
        if (this.alive) {
            this.ctx.strokeStyle = this.colorDead;
        } else {
            this.ctx.strokeStyle = this.colorAlive;
        }
    }

    drawCell = DrawHandler(this.cellCanvas)
    drawCoordinates = DrawHandler(this.coordinatesCanvas)
}
