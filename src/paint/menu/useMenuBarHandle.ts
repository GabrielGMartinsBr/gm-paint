import { FileManager } from '../base/FileManager';
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
        resetDocument() {
            const { canvas, ctx } = getContext();
            if (!ctx) {
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = 800;
            canvas.height = 480;
        },
        /** Save Image */
        save() {
            const { canvas, ctx } = getContext();
            if (!ctx) {
                return;
            }
            FileManager.saveImage(canvas);
        },

        /** Clear Image */
        clearImage() {
            const { canvas, ctx } = getContext();
            if (!ctx) {
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        /** Load Image */
        async loadImage() {
            const { canvas, ctx } = getContext();
            if (!canvas) {
                return;
            }
            const img = await FileManager.openImage();
            if (!img) {
                return;
            }
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0)
        }
    }
}