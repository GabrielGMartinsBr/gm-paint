import { MouseEvent, useMemo, useRef } from 'react';
import { PaintActionType } from './store/actions';
import { usePaintContext } from './store/context';
import { PaintTool } from './store/state';
import useCanvasManipulator from './useCanvasManipulator';

interface Coord {
    x: number;
    y: number;
}

export default function Canvas() {
    const { paintStore, canvasRef } = usePaintContext();
    const { activeTool, activeColorA, activeColorB } = paintStore.state;
    const canvasManipulator = useCanvasManipulator();
    const paramsRef = useRef({
        drawing: false,
        lastCoord: { x: 0, y: 0 } as Coord,
    });
    const { zoomFactor } = paintStore.state;
    const scaleTransform = useMemo(() => {
        return `scale(${zoomFactor})`
    }, [zoomFactor]);

    function getCoords(e: MouseEvent) {
        const target = e.target as HTMLCanvasElement;
        const rect = target.getBoundingClientRect();
        const x = (e.pageX - rect.left) / zoomFactor;
        const y = (e.pageY - rect.top) / zoomFactor;
        return { x, y };
    }

    function handleMouseEnter(e: MouseEvent) {
        // console.log('handleMouseEnter', e.timeStamp);
    }

    function handleMouseLeave(e: MouseEvent) {
        // console.log('handleMouseLeave', e.timeStamp);
    }

    function handleMouseDown(e: MouseEvent) {
        // console.log('mouseDown', e.timeStamp);
        const { x, y } = getCoords(e);
        paramsRef.current.drawing = true;
        paramsRef.current.lastCoord = { x, y };
        useTool(x, y);
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
        console.log(e.pageY, e.clientY, e.screenY)
        let x = (e.pageX - rect.left) / zoomFactor;
        let y = (e.pageY - rect.top) / zoomFactor;
        x = Math.round(x);
        y = Math.round(y);
        handleToolMove(x, y);
    }

    function handleToolMove(x: number, y: number) {
        const { lastCoord } = paramsRef.current;

        const dx = x - lastCoord.x;
        const dy = y - lastCoord.y;
        const md = Math.max(Math.abs(dx), Math.abs(dy));

        const rx = dx / md;
        const ry = dy / md;

        for (let i = 0; i < md; i++) {
            const posX = lastCoord.x + Math.floor(i * rx);
            const posY = lastCoord.y + Math.floor(i * ry);
            useTool(posX, posY);
        }
        paramsRef.current.lastCoord = { x, y };
    }

    function useTool(x: number, y: number) {
        switch (activeTool) {
            case PaintTool.PENCIL: {
                pencilDraw(x, y);
                break;
            }
            case PaintTool.RUBBER: {
                erase(x, y, 12);
                break;
            }
            case PaintTool.PAINT_BUCKET: {
                fill(x, y);
                break;
            }
            case PaintTool.INSPECT: {
                getPixel(x, y);
                break;
            }
            case PaintTool.ZOOM: {
                useZoom(x, y);
                break;
            }
        }
    }

    function pencilDraw(x: number, y: number) {
        canvasManipulator.setPixel(x, y, activeColorA);
    }

    function erase(x: number, y: number, size = 4) {
        canvasManipulator.setRect(x, y, activeColorB, size);
    }

    function fill(x: number, y: number) {
        canvasManipulator.floodFill(x, y, activeColorA);
    }

    function getPixel(x: number, y: number) {
        console.log({ x, y })
        canvasManipulator.getPixel(x, y);
    }

    function useZoom(x: number, y: number) {
        const zoom = zoomFactor === 1 ? 2 : 1;
        paintStore.dispatch({
            type: PaintActionType.CHANGE_ZOOM,
            zoomFactor: zoom
        })
    }

    return (
        <>

            <canvas
                ref={canvasRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                width={800}
                height={480}
                className='bg-white origin-top-left'
                style={{
                    imageRendering: 'crisp-edges',
                    transform: scaleTransform,
                }}
            />
        </>
    )
}
