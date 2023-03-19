import { usePaintReducer } from './store/reducer';
import CanvasContainer from './CanvasContainer';
import ColorBar from './color-bar/ColorBar';
import MenuBar from './menu/MenuBar';
import { PaintContext } from './store/context';
import ToolBar from './tool-bar/ToolBar';
import { useRef } from 'react';

export default function Paint() {
    const [state, dispatch] = usePaintReducer();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <PaintContext.Provider value={{
            paintStore: { state, dispatch },
            canvasRef
        }}>
            <div className={
                'bg-zinc-100 min-w-full h-screen ' +
                'flex flex-col overflow-auto '
            }>
                <MenuBar />
                <div className="flex flex-grow h-0">
                    <ToolBar />
                    <CanvasContainer />
                </div>
                <ColorBar />
            </div>
        </PaintContext.Provider>
    )
}