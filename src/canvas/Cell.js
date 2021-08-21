export class Cell {
    constructor(ctx, x, y, radius, colorAlive,colorDead, row, col){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colorAlive = colorAlive;
        this.colorDead = colorDead;
        this.row = row;
        this.col = col;
        this.radians = 0;
        this.alive = null;
    }

    set isAlive(state) {
        this.alive = state
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);

        if (this.alive) {
            this.ctx.fillStyle = this.colorAlive;
        } else {
            this.ctx.fillStyle = this.colorDead;
        }

        this.ctx.fill();
        this.ctx.closePath();
    }
}
