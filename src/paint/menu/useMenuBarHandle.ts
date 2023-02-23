import { saveAs } from 'file-saver';
import { usePaintContext } from '../store/context'

export function useMenuBarHandle() {
    const { canvasRef } = usePaintContext();
    return {
        save() {
            const canvas = canvasRef.current;
            if (!canvas) {
                return;
            }
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return;
            }
            const img = canvas.toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            saveAs(img, 'image.png');
        }
    }
}