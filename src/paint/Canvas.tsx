import { MouseEvent, useRef } from 'react';
import { usePaintContext } from './store/context';
import { PaintTool } from './store/state';
import useCanvasManipulator from './useCanvasManipulator';

interface Coord {
    x: number;
    y: number;
}

export default function Canvas() {
    const { paintStore } = usePaintContext();
    const { activeTool, activeColorA } = paintStore.state;
    const canvasManipulator = useCanvasManipulator();
    const paramsRef = useRef({
        drawing: false,
        lastCoord: { x: 0, y: 0 } as Coord,
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
        paramsRef.current.lastCoord = { x, y };
        // canvasManipulator.setPixel(x, y);
    }

    function handleMouseUp(e: MouseEvent) {
        paramsRef.current.drawing = false;
        // console.log('mouseUp', e.timeStamp);
    }

    function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
        if (!paramsRef.current.drawing) {
            return;
        }
        const target = e.target as HTMLCanvasElement;
        const rect = target.getBoundingClientRect();
        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;
        switch (activeTool) {
            case PaintTool.PENCIL: {
                handlePencilMove({ x, y })
                break;
            }
        }
    }

    function handlePencilMove({ x, y }: Coord) {
        const { lastCoord } = paramsRef.current;

        const dx = x - lastCoord.x;
        const dy = y - lastCoord.y;
        const md = Math.max(Math.abs(dx), Math.abs(dy));

        const rx = dx / md;
        const ry = dy / md;

        for (let i = 0; i < md; i++) {
            const posX = lastCoord.x + Math.floor(i * rx);
            const posY = lastCoord.y + Math.floor(i * ry);
            canvasManipulator.setPixel(posX, posY, activeColorA);
        }
        paramsRef.current.lastCoord = { x, y };
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
