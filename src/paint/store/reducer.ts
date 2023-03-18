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
        case PaintActionType.OPEN_DIALOG: {
            draft.activeDialog = action.dialogKey;
            break;
        }
        case PaintActionType.CLOSE_DIALOG: {
            draft.activeDialog = null;
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