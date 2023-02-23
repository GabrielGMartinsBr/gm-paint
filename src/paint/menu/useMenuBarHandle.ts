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
        /** Save Image */
        save() {
            const { canvas, ctx } = getContext();
            if (!ctx) {
                return;
            }
            const img = canvas.toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            saveAs(img, 'image.png');
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
        loadImage() {
            function openFileSelector() {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = false;
                input.addEventListener('change', handleFileSelect);
                function handleFileSelect() {
                    if (!input.files?.length) {
                        return;
                    }
                    const [file] = input.files;
                    readFile(file);
                }
                function emulateClick(node: Node) {
                    try {
                        node.dispatchEvent(new MouseEvent('click'))
                    } catch (e) {
                        var evt = document.createEvent('MouseEvents')
                        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                            20, false, false, false, false, 0, null)
                        node.dispatchEvent(evt)
                    }
                }
                emulateClick(input);
            }

            function readFile(file: File) {
                const fr = new FileReader();
                fr.addEventListener('loadend', handleFileRead)
                fr.readAsDataURL(file);
                function handleFileRead() {
                    if (fr.result && typeof fr.result === 'string') {
                        drawImage(fr.result);
                    }
                }
            }

            function drawImage(src: string) {
                const { canvas, ctx } = getContext();
                if (!canvas) {
                    return;
                }
                // canvas.width = 320;
                const img = document.createElement('img');
                img.addEventListener('load', handleImageLoaded)
                img.src = src;
                function handleImageLoaded() {
                    if (!canvas) {
                        return;
                    }
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0)
                }
            }

            openFileSelector();
        }
    }
}