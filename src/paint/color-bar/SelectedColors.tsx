import { usePaintContext } from '../store/context'

export default function SelectedColors() {
    const { paintStore } = usePaintContext();
    const { activeColorA, activeColorB } = paintStore.state;
    return (
        <div className='w-24 shadow-2xl flex items-center justify-center'>
            <div
                className='w-9 h-9 mr-1.5 transition-colors duration-300 ease-in'
                style={{
                    backgroundColor: activeColorA
                }}
            />
            <div
                className='w-9 h-9 transition-colors duration-300 ease-in'
                style={{
                    backgroundColor: activeColorB
                }}
            />
        </div>
    )
}