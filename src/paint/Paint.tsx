import CanvasContainer from './CanvasContainer';
import ColorBar from './ColorBar';
import MenuBar from './menu/MenuBar';
import ToolBar from './ToolBar';

export default function Paint() {
    return (
        <>

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
        </>
    )
}
