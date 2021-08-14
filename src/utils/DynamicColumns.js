/**
 * Creates string with right amount of columns fractions
 * @param {number} columnsToRender
 */
export const dynamicColumns = (columnsToRender) => {
    let columns = 0
    for(let i = 0; i <columnsToRender; i++){
        columns+=1
    }
    return `${columns}`
}

/**
 * Crate CSS grid style with dynamic number of columns
 * @param {string} columns
 */
export const divGridStyle = (columns) => (
    {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`
    }
);
