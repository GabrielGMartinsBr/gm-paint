import { createContext, Dispatch, useContext } from 'react'
import { PaintAction } from './actions';
import { paintInitState, PaintState } from './state';

interface PaintContextValue {
    paintStore: {
        state: PaintState;
        dispatch: Dispatch<PaintAction>;
    },
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const initialValue: PaintContextValue = {
    paintStore: {
        state: paintInitState,
        dispatch: () => null,
    },
    canvasRef: { current: null }
}

export const PaintContext = createContext<PaintContextValue>(initialValue);

export function usePaintContext() {
    return useContext(PaintContext);
}
