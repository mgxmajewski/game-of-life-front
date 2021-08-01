/** Handles changes made by user to grid during frame
 * @param stateOfGrid
 * @param {(options?: MutationFunctionOptions<*, OperationVariables>) => Promise<FetchResult<*>>} setStateOfGrid
 * @param {string} cell
 */

export const frameModHandler = (stateOfGrid, setStateOfGrid, cell) => {
    let x = Number(cell.split(",")[0])
    let y = Number(cell.split(",")[1])
    if (stateOfGrid){
        if (stateOfGrid[x][y] === "#"){
            stateOfGrid[x][y] = "_"
        } else if (stateOfGrid[x][y] === "_"){
            stateOfGrid[x][y] = "#"
        }
        setStateOfGrid({
            variables: {
                user: "Michal",
                grid: stateOfGrid
            }
        })
    }
}
