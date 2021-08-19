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
        console.log(gridState)
        let xShift = 0
        let yShift = 0
        const cellWidth = width/gridState[0].length
        const cellRadius = cellWidth/2
        console.log(cellWidth)
        for(let col = 0; col<gridState[0].length; col++) {
            for(let row = 0; row<gridState.length; row++) {
                new Cell(ctx, cellRadius + xShift, cellRadius + yShift, cellRadius, '#000127FF').draw()
                xShift+=cellWidth
            }
            xShift=0
            yShift+=cellWidth
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
