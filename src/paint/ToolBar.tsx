import { PropsWithChildren } from 'react'

export default function ToolBar() {
    return (
        <div className="shadow-lg bg-green-200">
            <div className={
                'grid grid-cols-2 w-24  h-min'
            }>
                <ToolBarButton>SS</ToolBarButton>
                <ToolBarButton>SR</ToolBarButton>
                <ToolBarButton>B</ToolBarButton>
                <ToolBarButton>P</ToolBarButton>
                <ToolBarButton>C</ToolBarButton>
                <ToolBarButton>L</ToolBarButton>
            </div>
        </div>

    )
}


function ToolBarButton(props: PropsWithChildren) {
    return (
        <button className="p-3 hover:bg-black/10 h-12">
            {props.children}
        </button>
    )
}