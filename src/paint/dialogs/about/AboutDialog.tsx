import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import { PaintActionType } from '../../store/actions';
import { usePaintContext } from '../../store/context';
import { DialogKey } from '../../store/state';

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
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-10" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className={
                            'flex min-h-full items-center justify-center p-4 text-center'
                        }>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={
                                    'w-full max-w-md transform overflow-hidden rounded-2xl ' +
                                    'bg-white p-6 text-left align-middle shadow-xl transition-all'
                                }>
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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
