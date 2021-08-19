import React, { useRef, useEffect } from 'react'
import {dummyState} from "../utils/InitialState";
import {Cell} from "../canvas/Cell";

const CanvasGrid = props => {

    const canvasRef = useRef(null)

    const gridState = dummyState

    const draw = (ctx, canvas) => {

        const width = canvas.width
        const height = canvas.height
        ctx.fillStyle = '#5c5c5c'
        ctx.fillRect(0,0,width, height)
        ctx.fill()
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/gridState[0].length
        const cellRadius = cellWidth/2
        let xShift = 0;
        let yShift = 0;
        let colorAlive = '#00adff'
        let colorDead = '#000127FF'
        for(let col = 0; col < gridState[0].length; col++) {
            for(let row = 0; row < gridState.length; row++) {
                console.log(gridState[col][row])
                if(gridState[col][row] === "_"){
                    new Cell(ctx, cellRadius + xShift, cellRadius + yShift, cellRadius, colorAlive, colorDead, false).draw()
                } else if (gridState[col][row] === "#"){
                    new Cell(ctx, cellRadius + xShift, cellRadius + yShift, cellRadius, colorAlive, colorDead, true).draw()
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
        draw(context, canvas)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default CanvasGrid
