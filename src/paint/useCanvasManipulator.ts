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

    function fill(x: number, y: number) {
        const { ctx, canvas } = getContext();
        if (!ctx) {
            return;
        }
        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height, { colorSpace: 'srgb' }).data;
        const targetColor = getColor(x, y);

        const toPaint = new Set<string>();
        scan([x, y], [1, 0]);
        scan([x, y], [-1, 0]);
        scan([x, y], [0, -1]);
        scan([x, y], [0, 1]);

        for (const p of toPaint) {
            const coord = p.split(',').map(s => parseInt(s)) as Vec2;
            scan(coord, [1, 0]);
            scan(coord, [-1, 0]);
            scan(coord, [0, -1]);
            scan(coord, [0, 1]);
            setPixel(coord[0], coord[1], '#ff0000')
            // console.log(p);
        }


        for (const p of toPaint) {
            const coord = p.split(',').map(s => parseInt(s));
            setPixel(coord[0], coord[1], '#ff0000')
        }
        console.log(toPaint.size)

        function scan(vec: Vec2, dir: Vec2) {
            const isSame = checkColor(...vec, targetColor);
            if (isSame) {
                toPaint.add(vec.join(','));
                const next: Vec2 = [vec[0] + dir[0], vec[1] + dir[1]];
                scan(next, dir);
            }
        }


        function getColor(_x: number, _y: number) {
            const cursor = (Math.floor(_x) + Math.floor(_y) * width) * 4;
            return imageData.slice(cursor, cursor + 4);
        }

        function checkColor(_x: number, _y: number, color: Uint8ClampedArray) {
            const cursor = (Math.floor(_x) + Math.floor(_y) * width) * 4;
            if (_x >= 0 && _y >= 0 && _x < width && _y < height) {
                return imageData[cursor] === color[0] &&
                    imageData[cursor + 1] === color[1] &&
                    imageData[cursor + 2] === color[2] &&
                    imageData[cursor + 3] === color[3];
            }
            return false;
        }
    }

    return {
        canvasRef,
        setPixel,
        setCircle,
        fill

    }
}