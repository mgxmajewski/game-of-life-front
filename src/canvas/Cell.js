export function Cell(ctx, x, y, radius, colorAlive,colorDead, alive) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colorAlive = colorAlive;
    this.colorDead = colorDead;
    this.radians = 0;
    this.alive = alive;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        if (this.alive) {
            ctx.fillStyle = this.colorAlive;
        } else {
            ctx.fillStyle = this.colorDead;
        }

        ctx.fill();
        ctx.closePath();
    }
}
