import { useMemo } from 'react'
import { Dialog } from '@headlessui/react'
import { PaintActionType } from '../../store/actions';
import { usePaintContext } from '../../store/context';
import { DialogKey } from '../../store/state';
import DialogBase from './DialogBase';

export default function AboutDialog() {
    const { paintStore } = usePaintContext();
    const { activeDialog } = paintStore.state;
    const isOpen = useMemo(() => activeDialog === DialogKey.ABOUT, [activeDialog]);

    function handleClose() {
        paintStore.dispatch({
            type: PaintActionType.CLOSE_DIALOG
        });
    }

    return (
        <DialogBase
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                About GM Paint
            </Dialog.Title>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    GM Paint was developed by Gabriel G. Martins, a
                    self-taught full stack developer.
                </p>
                <p className="text-sm text-gray-500">
                    This web application is a very simple bitmap
                    image editor.
                </p>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    className={
                        'inline-flex justify-center rounded-md border ' +
                        'border-transparent bg-zinc-100 px-4 py-2 ' +
                        'text-sm font-medium text-zinc-900 ' +
                        'hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 ' +
                        'focus-visible:ring-zinc-500 focus-visible:ring-offset-2'
                    }
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </DialogBase>
    )
}
