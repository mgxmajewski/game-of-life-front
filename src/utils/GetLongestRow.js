export const getLongestRow = grid => {
    let max = 0;
    for (let row =0; row < grid.length; row++){
        if(max < grid[row].length){
            max = grid[row].length
        }
    }
    return max
}

export const getLongestColumn = grid => {
    let max = 0;
    for (let column =0; column < grid.length; column++){
        if(max < grid.length){
            max = grid.length
        }
    }
    return max
}
