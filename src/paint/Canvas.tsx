import { MouseEvent, useRef } from 'react';
import useCanvasManipulator from './useCanvasManipulator';

export default function Canvas() {
    const canvasManipulator = useCanvasManipulator();
    const paramsRef = useRef({
        drawing: false
    });

    function getCoords(e: MouseEvent) {
        const target = e.target as HTMLCanvasElement;
        const rect = target.getBoundingClientRect();
        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;
        return { x, y };
    }

    function handleMouseEnter(e: MouseEvent) {
        // console.log('handleMouseEnter', e.timeStamp);
    }

    function handleMouseLeave(e: MouseEvent) {
        // console.log('handleMouseLeave', e.timeStamp);
    }

    function handleMouseDown(e: MouseEvent) {
        console.log('mouseDown', e.timeStamp);
        const { x, y } = getCoords(e);
        paramsRef.current.drawing = true;
        // canvasManipulator.setPixel(x, y);
    }

    function handleMouseUp(e: MouseEvent) {
        paramsRef.current.drawing = false;
        // console.log('mouseUp', e.timeStamp);
    }

    function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
        const target = e.target as HTMLCanvasElement;
        const rect = target.getBoundingClientRect();
        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;

        if (paramsRef.current.drawing) {
            canvasManipulator.setPixel(x, y);
        }
    }

    return (
        <>

            <canvas
                ref={canvasManipulator.canvasRef}
                className='bg-white'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                width={800}
                height={480}
            />
        </>
    )
}
