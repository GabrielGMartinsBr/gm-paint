import ColorPalette from './ColorPalette'
import SelectedColors from './SelectedColors'

export default function ColorBar() {
    return (
        <div className="flex">
            <SelectedColors />
            <ColorPalette />
        </div>
    )
}