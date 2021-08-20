import React, {useEffect, useRef} from 'react'
import {Cell} from "../canvas/Cell";
import {getLongestRow} from "../utils/GetLongestRow";

const CanvasGrid = props => {

    const canvasRef = useRef(null)

    const gridState = props.state

    const draw = (ctx, canvas) => {

        const width = canvas.width
        const height = canvas.height
        ctx.clearRect(0,0,width, height)
        ctx.fill()
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
                // console.log(gridState[col][row])
                if(gridState[row][col] === "_"){
                    new Cell(ctx, cellRadius + xShift, cellRadius + yShift,
                        cellRadius, colorAlive, colorDead,
                        false).draw()
                } else if (gridState[row][col] === "#"){
                    new Cell(ctx, cellRadius + xShift, cellRadius + yShift,
                        cellRadius, colorAlive, colorDead,
                        true).draw()
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
        draw(context, canvas, gridState)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default CanvasGrid
