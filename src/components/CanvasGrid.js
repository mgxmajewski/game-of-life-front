import React, { useRef, useEffect } from 'react'

const CanvasGrid = props => {

    const canvasRef = useRef(null)

    const draw = (ctx, canvas) => {
        const width = canvas.width
        const height = canvas.height
        ctx.fillStyle = '#fc0000'
        ctx.fillRect(0,0,width, height)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.style.width = '200px';
        canvas.style.heigth = '200px';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d')

        //Our draw come here
        draw(context, canvas)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default CanvasGrid
