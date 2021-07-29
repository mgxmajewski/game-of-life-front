// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
import React, { useRef, useEffect } from 'react'

const DeadCell = props => {

    const canvasRef = useRef(null)

    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(20, 20, 20, 0, 2*Math.PI)
        // ctx.arc(0, 0, 99, 0, 6.283185307179586, false)
        ctx.fill()
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        //Our draw come here
        draw(context)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default DeadCell
