import { DialogKey, PaintTool } from './state';

export enum PaintActionType {
    SELECT_TOOL = 'SELECT_TOOL',
    SELECT_COLOR = 'SELECT_COLOR',
    CHANGE_ZOOM = 'CHANGE_ZOOM',
    OPEN_DIALOG = 'OPEN_DIALOG',
    CLOSE_DIALOG = 'CLOSE_DIALOG',
}

export interface SelectToolAction {
    type: PaintActionType.SELECT_TOOL;
    tool: PaintTool;
}

export interface SelectColorAction {
    type: PaintActionType.SELECT_COLOR;
    color: string;
}

export interface ChangeZoom {
    type: PaintActionType.CHANGE_ZOOM;
    zoomFactor: number;
}

export interface OpenDialog {
    type: PaintActionType.OPEN_DIALOG;
    dialogKey: DialogKey
}

export interface CloseDialog {
    type: PaintActionType.CLOSE_DIALOG;
}

export type PaintAction = SelectToolAction | SelectColorAction |
    ChangeZoom | OpenDialog | CloseDialog;