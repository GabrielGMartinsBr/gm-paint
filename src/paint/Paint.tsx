import CanvasContainer from './CanvasContainer';
import ColorBar from './ColorBar';
import MenuBar from './MenuBar';
import ToolBar from './ToolBar';

export default function Paint() {
    return (
        <>

            <div className={
                'bg-zinc-100 min-w-full min-h-screen'
            }>
                <MenuBar />
                <div className="flex bg-orange-500">
                    <ToolBar />
                    <CanvasContainer />
                </div>
                <ColorBar />

            </div>
        </>
    )
}
