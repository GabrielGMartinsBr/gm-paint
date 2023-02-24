import { saveAs } from 'file-saver';

export class FileManager {

    static saveImage(canvas: HTMLCanvasElement) {
        const src = canvas.toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        saveAs(src, 'image.png');
    }

    static async openImage() {
        const file = await FileManager.openFileSelector();
        if (!file) {
            return;
        }
        const data = await FileManager.readFile(file);
        const img = await FileManager.createImage(data);
        return img;
    }

    private static emulateClick(node: Node) {
        try {
            node.dispatchEvent(new MouseEvent('click'))
        } catch (e) {
            var evt = document.createEvent('MouseEvents')
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                20, false, false, false, false, 0, null)
            node.dispatchEvent(evt)
        }
    }

    private static openFileSelector() {
        return new Promise<File | null>((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = false;
            input.addEventListener('change', handleFileSelect);
            FileManager.emulateClick(input);

            function handleFileSelect() {
                if (!input.files?.length) {
                    resolve(null);
                    return;
                }
                const [file] = input.files;
                resolve(file);
            }
        });
    }

    private static readFile(file: File) {
        return new Promise<string>((resolve, reject) => {
            const fr = new FileReader();
            fr.addEventListener('loadend', handleFileRead)
            fr.addEventListener('error', handleError)
            fr.readAsDataURL(file);
            function handleFileRead() {
                if (fr.result && typeof fr.result === 'string') {
                    resolve(fr.result);
                } else {
                    reject(new Error('unexpected result', { cause: fr.result }));
                }
            }
            function handleError(e: ProgressEvent<FileReader>) {
                reject(e);
            }
        });
    }

    private static createImage(src: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = document.createElement('img');
            img.addEventListener('load', handleImageLoaded)
            img.src = src;
            function handleImageLoaded() {
                resolve(img);
            }
        });
    }

}
