import { FileManager } from '../base/FileManager';
import { PaintActionType } from '../store/actions';
import { usePaintContext } from '../store/context'
import { DialogKey } from '../store/state';

export function useMenuBarHandle() {
    const { canvasRef } = usePaintContext();
    const { paintStore } = usePaintContext();

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
        /** Reset Document */
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
        },
        /** Test Zoom */
        zoom() {
            const { canvas, ctx } = getContext();
            if (!canvas) {
                return;
            }
            const { width, height } = canvas;
            const img = ctx.getImageData(0, 0, width, height);
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.scale(2, 2);
            // ctx.putImageData(img, 0, 0);
        },
        openAboutDialog() {
            paintStore.dispatch({
                type: PaintActionType.OPEN_DIALOG,
                dialogKey: DialogKey.ABOUT
            });
        }
    }
}