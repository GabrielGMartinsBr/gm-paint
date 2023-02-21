import { PaintTool } from './state';

export enum PaintActionType {
    SELECT_TOOL = 'SELECT_TOOL',
    SELECT_COLOR = 'SELECT_COLOR',
}

export interface SelectToolAction {
    type: PaintActionType.SELECT_TOOL;
    tool: PaintTool;
}

export interface SelectColorAction {
    type: PaintActionType.SELECT_COLOR;
    color: string;
}

export type PaintAction = SelectToolAction | SelectColorAction;
