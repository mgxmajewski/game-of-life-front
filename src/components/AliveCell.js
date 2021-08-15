// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
import React, { useRef, useEffect } from 'react'

const AliveCell = props => {

    const canvasRef = useRef(null)

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#00adff'
        ctx.beginPath()
        ctx.arc(25, 25, 24*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
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
        let frameCount = 0
        let animationFrameId

        //Our draw came here
        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default AliveCell
