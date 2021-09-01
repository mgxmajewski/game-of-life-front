import React, {useEffect, useRef} from 'react'
import {Cell} from "../canvas/Cell";
import {getLongestRow} from "../utils/GetLongestRow";

const CanvasGrid = props => {

    const canvasRef = useRef(null)


    const draw = (ctx, canvas, props) => {

        const gridState = props.state
        const showCoordinates = props.coordinates

        const width = canvas.width
        const height = canvas.height
        ctx.clearRect(0,0,width, height)
        // ctx.fill()
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/getLongestRow(gridState)
        const cellRadius = cellWidth/2
        let xShift = 0;
        let yShift = 0;
        let colorAlive = '#00adff'
        let colorDead = '#000127FF'
        for(let row = 0; row < gridState.length; row++) {
            for(let col = 0; col < gridState[row].length; col++) {
                const x =  cellRadius + xShift
                const y = cellRadius + yShift
                const cell =
                    new Cell(
                        ctx,
                        x,
                        y,
                        cellRadius ,
                        colorAlive,
                        colorDead,
                        row,
                        col)
                if(gridState[row][col] === "_"){
                    cell.isAlive = false
                } else if (gridState[row][col] === "#"){
                    cell.isAlive = true
                }
                cell.drawCell()
                if (showCoordinates === 'true'){
                    cell.drawCoordinates()
                }
                xShift+=cellWidth
            }
            xShift=0
            yShift+=cellHeight
        }
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
