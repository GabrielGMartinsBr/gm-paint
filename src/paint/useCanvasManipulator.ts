import { useRef } from 'react';

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

    function setPixel(x: number, y: number, color: string) {
        const { ctx } = getContext();
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1)
        ctx.restore();
    }

    function setCircle(x: number, y: number, color: string, size: number) {
        const { ctx } = getContext();
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    return {
        canvasRef,
        setPixel,
        setCircle
    }
}