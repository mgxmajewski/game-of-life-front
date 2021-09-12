export class Cell {
    constructor(ctx, x, y, radius, row, col){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.row = row;
        this.col = col;
        this.alive = null;
        this.colorAlive = '#00adff';
        this.colorDead = '#000127FF';
    }

    set setState(state) {
        this.alive = state
    }

    /**
     * Provides context to wrapped function and executes
     * default begin/close path methods of HTML Canvas API.
     * @param toDraw - function consuming provided data
     * @return {(function(): void)|*}
     */
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
    /**
     * Provides color context data.
     * @param toColor - function consuming provided data
     * @return {(function(): void)|*}
     */
    colorWrapper = toColor => {
        return function () {
            const isAlive = this.alive
            const dead = this.colorDead
            const alive = this.colorAlive
            toColor(isAlive, dead, alive)
        }
    }

    /**
     * Analise which color should be cell rendered in.
     * @param isAlive - state of cell
     * @param dead - color of dead cell
     * @param alive - color of alive cell
     */
    assignStateColors = (isAlive, dead, alive) => {
        const fill = (color) => this.ctx.fillStyle = color
        const stroke = (contrastColor) => this.ctx.strokeStyle = contrastColor
        // Colors cell so that fill and stroke colors are contrasted (reversed).
        isAlive ? fill(alive) : fill(dead)
        isAlive ? stroke(dead) : stroke(alive)
    }

    /**
     * Renders circular cell
     * @param cell - cell
     * @param render - canvas context
     */
    renderCell = (cell, render) => {
        render.arc(
            cell.x,
            cell.y,
            cell.radius,
            0,
            Math.PI *2,
            false
        )
        this.#colorCell()
    }

    /**
     * Renders coordinates of cell
     * @param cell - cell
     * @param render - canvas context
     */
    renderCoordinates = (cell, render)=> {
        render.font = `${cell.radius/2}px Arial`;
        render.textAlign = 'center'
        render.strokeText(
            `${cell.col++} | ${cell.row++}`,
            cell.x,
            cell.y
        )
    }

    /**
     * Private method to color cell according to it's state
     * @type {(function(): void)|*}
     */
    #colorCell = this.colorWrapper(this.assignStateColors)

    /**
     * Public methods to draw cell and coordinates
     * @type {(function(): void)|*}
     */
    drawCell = this.canvasWrapper(this.renderCell)
    drawCoordinates = this.canvasWrapper(this.renderCoordinates)
}
