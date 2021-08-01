/**
 * Creates string with right amount of columns fractions
 * @param {number} columnsToRender
 */
export const dynamicColumns = (columnsToRender) => {
    let columns = ''
    for(let i = 0; i <columnsToRender; i++){
        columns+='1fr '
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
        gridTemplateColumns: `${columns}`
    }
);
