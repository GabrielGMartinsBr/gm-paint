import { PropsWithChildren } from 'react'

export default function ColorBar() {
    return (
        <div className="flex">
            <SelectedColors />
            <ColorPalette />
        </div>

    )
}

function SelectedColors() {
    return (
        <div className="w-24 shadow-2xl flex items-center justify-center">

            <div className="w-9 h-9 bg-black mr-1.5"></div>
            <div className="w-9 h-9 bg-white"></div>

        </div>
    )
}

function ColorPalette() {
    return (
        <div className={
            'w-min ' +
            'grid grid-flow-col grid-rows-2'
        }>
            <ColorBarButton>SS</ColorBarButton>
            <ColorBarButton>SR</ColorBarButton>
            <ColorBarButton>B</ColorBarButton>
            <ColorBarButton>P</ColorBarButton>
            <ColorBarButton>C</ColorBarButton>
            <ColorBarButton>L</ColorBarButton>
        </div>
    )
}


function ColorBarButton(props: PropsWithChildren) {
    return (
        <button className="p-3 w-12 bg-green-400 hover:bg-black/10">
            {props.children}
        </button>
    )
}