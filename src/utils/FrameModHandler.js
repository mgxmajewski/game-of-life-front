/** Handles changes made by user to grid during frame
 * @param grid
 * @param {(options?: MutationFunctionOptions<*, OperationVariables>) => Promise<FetchResult<*>>} gridMutation
 * @param {string} cell
 */

export const frameModHandler = (grid, gridMutation, cell) => {
    let x = Number(cell.split(",")[0])
    let y = Number(cell.split(",")[1])
    if (grid){
        const isAlive = grid[x][y] === "#"
        grid[x][y] = isAlive ? "_" : "#";
        gridMutation({
            variables: {
                user: "Michal",
                grid: grid
            }
        })
    }
}
