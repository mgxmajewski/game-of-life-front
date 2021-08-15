// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
import React, { useRef, useEffect } from 'react'

const DeadCell = props => {

    const canvasRef = useRef(null)

    const draw = (ctx, canvas) => {
        const width = canvas.width/2
        const height = canvas.height/2
        const radius = canvas.height/2-canvas.height/2*.08
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.arc(width, height, radius, 0, 2*Math.PI, false)
        // ctx.arc(0, 0, 99, 0, 6.283185307179586, false)
        ctx.fill()
    }

    useEffect(() => {

        const canvas = canvasRef.current
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d')

        //Our draw come here
        draw(context, canvas)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default DeadCell
