import { PropsWithChildren } from 'react';
import { PaintActionType } from '../store/actions';
import { usePaintContext } from '../store/context';
import { PaintTool } from '../store/state';

export interface ToolBarButtonProps {
    tool: PaintTool;
}

export default function ToolBarButton(props: PropsWithChildren<ToolBarButtonProps>) {
    const { paintStore } = usePaintContext();
    const { activeTool } = paintStore.state;

    const isActive = activeTool === props.tool;

    function handleClick() {
        paintStore.dispatch({
            type: PaintActionType.SELECT_TOOL,
            tool: props.tool
        });
    }

    return (
        <button
            onClick={handleClick}
            className={
                'p-3 h-12 text-zinc-900 transition-colors ease-in ' +
                'flex items-center justify-center ' +
                (isActive ? 'bg-black/30' : 'hover:bg-black/10')
            }
        >
            {props.children}
        </button>
    )
}