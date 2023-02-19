import { useMemo, useRef } from 'react';

export default function useCanvasManipulator() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function getContext() {
        const canvas = canvasRef.current;
        if (!canvas) {
            return {};
        }
        const ctx = canvas.getContext('2d');
        return { canvas, ctx };
    }

    function setPixel(x: number, y: number) {
        const { ctx } = getContext();
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, 1, 1)
        ctx.restore();
    }

    return {
        canvasRef,
        setPixel
    }
}