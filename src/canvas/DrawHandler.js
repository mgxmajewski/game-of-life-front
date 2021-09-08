export const DrawHandler = toDraw => {
    return function () {
        this.ctx.beginPath();
        toDraw();
        this.ctx.fill();
        this.ctx.closePath();
    }
}
