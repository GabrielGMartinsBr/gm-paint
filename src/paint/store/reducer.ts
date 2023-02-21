import { useReducer } from 'react';
import { produce } from 'immer';
import { paintInitState, PaintState } from './state';
import { PaintAction, PaintActionType } from './actions';

const paintReducer = produce((draft: PaintState, action: PaintAction) => {
    switch (action.type) {
        case PaintActionType.SELECT_TOOL: {
            draft.activeTool = action.tool;
            break;
        }
        case PaintActionType.SELECT_COLOR: {
            draft.activeColorA = action.color;
            break;
        }
        default: {
            console.warn('unexpected action', action);
        }
    }
});

export function usePaintReducer() {
    return useReducer(paintReducer, paintInitState);
}
