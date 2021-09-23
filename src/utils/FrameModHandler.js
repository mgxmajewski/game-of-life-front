/** Handles changes made by user to grid during frame
 * @param grid
 * @param mutateStateOfGrid
 * @param {string} cell
 */

export const frameModHandler = (grid, mutateStateOfGrid, cell) => {
    let x = Number(cell.split(",")[0])
    let y = Number(cell.split(",")[1])
        const isAlive = grid[x][y] === "#"
        grid[x][y] = isAlive ? "_" : "#";
        postFrameMod(grid, mutateStateOfGrid)
        return grid
}

/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param mutateStateOfGrid
 */

const postFrameMod = (grid, mutateStateOfGrid) => {
    mutateStateOfGrid({
        variables: {
            user: "Michal",
            grid: grid
        }
    })
}


