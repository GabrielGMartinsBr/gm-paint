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
            <ColorButton color="black" />
            <ColorButton color="white" />
            <ColorButton color="grey" />
            <ColorButton color="darkgrey" />
            <ColorButton color="firebrick" />
            <ColorButton color="red" />
            <ColorButton color="purple" />
            <ColorButton color="pink" />
            <ColorButton color="blue" />
            <ColorButton color="deepskyblue" />
            <ColorButton color="cyan" />
            <ColorButton color="turquoise" />
            <ColorButton color="goldenrod" />
            <ColorButton color="gold" />
            <ColorButton color="orange" />
            <ColorButton color="yellow" />
            <ColorButton color="green" />
            <ColorButton color="lime" />
            <ColorButton color="greenyellow" />
            <ColorButton color="brown" />
            <ColorButton color="saddlebrown" />
            <ColorButton color="sandybrown" />
        </div>
    )
}


function ColorButton(props: PropsWithChildren<{ color: string }>) {
    return (
        <button
            className="p-3 w-9 h-9 bg-green-400 hover:bg-black/10"
            style={{
                backgroundColor: props.color,
            }}
        >
            {props.children}
        </button>
    )
}