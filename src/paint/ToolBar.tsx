import { PropsWithChildren } from 'react'
import { BsPaintBucket, BsPencil } from 'react-icons/bs';
import { BiPaintRoll, BiSelection } from 'react-icons/bi';
import { CiEraser } from 'react-icons/ci';
import { GiFairyWand } from 'react-icons/gi';

export default function ToolBar() {
    return (
        <div className="">
            <div className={
                'grid grid-cols-2 w-24  h-min'
            }>
                <ToolBarButton>
                    <BiSelection />
                </ToolBarButton>
                <ToolBarButton>
                    <GiFairyWand />
                </ToolBarButton>
                <ToolBarButton>
                    <CiEraser />
                </ToolBarButton>
                <ToolBarButton>
                    <BsPaintBucket />
                </ToolBarButton>
                <ToolBarButton>
                    <BsPencil />
                </ToolBarButton>
                <ToolBarButton>
                    <BiPaintRoll />
                </ToolBarButton>
            </div>
        </div>

    )
}


function ToolBarButton(props: PropsWithChildren) {
    return (
        <button className={
            'p-3 hover:bg-black/10 h-12 ' +
            'flex items-center justify-center'
        }>
            {props.children}
        </button>
    )
}