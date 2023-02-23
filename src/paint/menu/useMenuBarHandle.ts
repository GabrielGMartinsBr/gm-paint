import { saveAs } from 'file-saver';
import { usePaintContext } from '../store/context'

export function useMenuBarHandle() {
    const { canvasRef } = usePaintContext();

    function getContext() {
        const canvas = canvasRef.current;
        if (!canvas) {
            return {};
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return {};
        }
        return { canvas, ctx };
    }

    return {
        save() {
            const { canvas, ctx } = getContext();
            if (!ctx) {
                return;
            }
            const img = canvas.toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            saveAs(img, 'image.png');
        },
        clearImage() {
            const { canvas, ctx } = getContext();
            if (!ctx) {
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}