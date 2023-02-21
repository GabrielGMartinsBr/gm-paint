import ColorButton from './ColorButton';

export default function ColorPalette() {
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