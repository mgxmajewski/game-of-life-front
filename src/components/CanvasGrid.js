import React, {useEffect, useRef} from 'react'
import {Cell} from "../canvas/Cell";
import {getLongestRow} from "../utils/GetLongestRow";

const CanvasGrid = props => {

    const canvasRef = useRef(null)

    const draw = (ctx, canvas, props) => {

        // Destructure arguments
        const {width, height} = canvas
        const {state, coordinates} = props

        // Draw transparent canvas
        ctx.clearRect(0,0,width, height)

        // Declare size and position of cell
        const cellDiameter = width/getLongestRow(state)
        const cellRadius = cellDiameter/2
        let xShift, yShift = 0;

        // Iterate through all rows and columns to draw cells and conditionally coordinates.
        state.forEach((cellsRow, rowIndex) => {
            xShift = 0
            cellsRow.forEach((cellCol, colIndex) => {
                const x =  cellRadius + xShift
                const y = cellRadius + yShift
                const cell =
                    new Cell(
                        ctx,
                        x,
                        y,
                        cellRadius ,
                        rowIndex,
                        colIndex)
                cell.setState = cellCol === "#"
                cell.drawCell()
                if (coordinates === 'true') {
                    cell.drawCoordinates()
                }
                xShift+=cellDiameter
            })
            yShift+=cellDiameter
        })
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d')
        //Our draw come here
        draw(context, canvas, props)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default CanvasGrid
