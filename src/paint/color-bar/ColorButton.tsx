import { PropsWithChildren } from 'react';
import { PaintActionType } from '../store/actions';
import { usePaintContext } from '../store/context';

export default function ColorButton(props: PropsWithChildren<{ color: string }>) {
    const { paintStore } = usePaintContext();

    function handleClick() {
        paintStore.dispatch({
            type: PaintActionType.SELECT_COLOR,
            color: props.color
        })
    }

    return (
        <button
            onClick={handleClick}
            className="p-3 w-9 h-9 bg-green-400 hover:bg-black/10"
            style={{
                backgroundColor: props.color,
            }}
        >
            {props.children}
        </button>
    )
}