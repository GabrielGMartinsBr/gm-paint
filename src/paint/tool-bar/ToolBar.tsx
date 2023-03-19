import { BsPaintBucket, BsPencil } from 'react-icons/bs';
import { BiFontColor, BiPaintRoll, BiSelection, BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { CiEraser } from 'react-icons/ci';
import { CgColorPicker } from 'react-icons/cg';
import { GiFairyWand, GiSpray } from 'react-icons/gi';
import ToolBarButton from './ToolBarButton';
import { PaintTool } from '../store/state';
import { usePaintContext } from '../store/context';

export default function ToolBar() {
    const { paintStore: { state } } = usePaintContext();
    const { zoomFactor } = state;
    return (
        <div className="">
            <div className={
                'grid grid-cols-2 w-24  h-min'
            }>
                <ToolBarButton tool={PaintTool.SELECTION}>
                    <BiSelection />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.COLOR_SELECTION}>
                    <GiFairyWand />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.RUBBER}>
                    <CiEraser />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.PAINT_BUCKET}>
                    <BsPaintBucket />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.PENCIL}>
                    <BsPencil />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.BRUSH}>
                    <BiPaintRoll />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.SPRAY}>
                    <GiSpray />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.TEXT}>
                    <BiFontColor />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.INSPECT}>
                    <CgColorPicker />
                </ToolBarButton>
                <ToolBarButton tool={PaintTool.ZOOM}>
                    {zoomFactor === 1 ? (
                        <BiZoomIn />
                    ) : (
                        <BiZoomOut />
                    )}
                </ToolBarButton>
            </div>
        </div>

    )
}