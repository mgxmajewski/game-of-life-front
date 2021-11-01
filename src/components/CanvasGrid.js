import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types';
import {Cell} from "../canvas/Cell";
import {getLongestDimension} from "../utils/GetLongestDimension";

const CanvasGrid = props => {

    const canvasRef = useRef(null)
    console.log('canvas '+ props.state)
    const draw = (ctx, canvas, props) => {

        // Destructure arguments
        const {width, height} = canvas
        const {state, coordinates} = props

        // Draw transparent canvas
        ctx.clearRect(0,0,width, height)

        // Declare size and position of cell
        let longestDimension = getLongestDimension(state)

        const cellDiameter = width/longestDimension
        const cellRadius = cellDiameter/2
        let xShift= 0;
        let yShift = 0;

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
    }, [props.state, props.coordinates, props])

    return <canvas ref={canvasRef} {...props}/>
}

CanvasGrid.propTypes = {
    state: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    coordinates: PropTypes.arrayOf(PropTypes.number)
};

export default CanvasGrid
