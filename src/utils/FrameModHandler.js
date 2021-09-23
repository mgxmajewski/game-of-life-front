/** Handles changes made by user to grid during frame
 * @param grid
 * @param setStateOfGrid
 * @param {string} cell
 */

export const frameModHandler = (grid, setStateOfGrid, cell) => {
    let x = Number(cell.split(",")[0])
    let y = Number(cell.split(",")[1])
        const isAlive = grid[x][y] === "#"
        grid[x][y] = isAlive ? "_" : "#";
        postFrameMod(grid, setStateOfGrid)
        return grid
}

/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param gridMutation
 */

const postFrameMod = (grid, gridMutation) => {
    gridMutation({
        variables: {
            user: "Michal",
            grid: grid
        }
    })
}


