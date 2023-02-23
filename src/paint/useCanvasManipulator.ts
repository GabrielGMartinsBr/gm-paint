import { useRef } from 'react';

type Vec2 = [number, number];

export default function useCanvasManipulator() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function getContext() {
        const canvas = canvasRef.current;
        if (!canvas) {
            return {};
        }
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
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

    function floodFill(x: number, y: number, color: string) {
        const { ctx, canvas } = getContext();
        if (!ctx) {
            return;
        }
        const { width, height } = canvas;
        const image = ctx.getImageData(0, 0, width, height, { colorSpace: 'srgb' });
        const imageData = image.data;
        const targetColor = getColor(x, y);

        function getColor(_x: number, _y: number) {
            const cursor = (Math.floor(_x) + Math.floor(_y) * width) * 4;
            return imageData.slice(cursor, cursor + 4);
        }

        const arr: Vec2[] = [];
        const toPaint = new Set<string>();
        arr.push([x, y]);
        while (arr.length > 0) {
            const vec = arr.shift()!;
            const enc = vec.join(',');
            if (
                vec[0] < 0 || vec[0] >= width || vec[1] < 0 || vec[1] >= height ||
                toPaint.has(enc) || !isColor(vec, targetColor)
            ) {
                continue;
            }
            toPaint.add(enc);
            arr.push([vec[0] - 1, vec[1]]);
            arr.push([vec[0] + 1, vec[1]]);
            arr.push([vec[0], vec[1] - 1]);
            arr.push([vec[0], vec[1] + 1]);
        }

        for (const p of toPaint) {
            const coord = p.split(',').map(s => parseInt(s));
            setPixel(coord[0], coord[1], color)
        }

        function isColor(vec: Vec2, color: Uint8ClampedArray) {
            const cursor = (Math.floor(vec[0]) + Math.floor(vec[1]) * width) * 4;
            return imageData[cursor] === color[0] &&
                imageData[cursor + 1] === color[1] &&
                imageData[cursor + 2] === color[2] &&
                imageData[cursor + 3] === color[3];
        }
    }

    return {
        canvasRef,
        setPixel,
        setCircle,
        floodFill
    }
}