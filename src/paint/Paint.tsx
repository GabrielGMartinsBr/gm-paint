import { usePaintReducer } from './store/reducer';
import CanvasContainer from './CanvasContainer';
import ColorBar from './color-bar/ColorBar';
import MenuBar from './menu/MenuBar';
import { PaintContext } from './store/context';
import ToolBar from './tool-bar/ToolBar';

export default function Paint() {
    const [state, dispatch] = usePaintReducer();
    return (
        <PaintContext.Provider value={{
            paintStore: { state, dispatch }
        }}>
            <div className={
                'bg-zinc-100 min-w-full min-h-screen'
            }>
                <MenuBar />
                <div className="flex">
                    <ToolBar />
                    <CanvasContainer />
                </div>
                <ColorBar />
            </div>
        </PaintContext.Provider>
    )
}