export enum PaintTool {
    SELECTION = 'SELECTION',
    COLOR_SELECTION = 'COLOR_SELECTION',
    RUBBER = 'RUBBER',
    PAINT_BUCKET = 'PAINT_BUCKET',
    PENCIL = 'PENCIL',
    BRUSH = 'BRUSH',
    SPRAY = 'SPRAY',
    TEXT = 'TEXT',
}

export interface PaintState {
    activeTool: PaintTool;
    activeColorA: string;
    activeColorB: string;
}

export const paintInitState: PaintState = {
    activeTool: PaintTool.PENCIL,
    activeColorA: '#000000',
    activeColorB: '#FFFFFF',
}
