/**
 * Creates string to be passed into css 1fr
 * @param {number} columnsToRender
 */
export const columnParser = (columnsToRender) => {
    let columns = ''
    for(let i = 0; i <columnsToRender; i++){
        columns+='1fr '
    }
    return `${columns}`
}
