import { PropsWithChildren } from 'react';

export default function MenuBar() {
    return (
        <div className="flex">
            <MenuButton>File</MenuButton>
            <MenuButton>Edit</MenuButton>
            <MenuButton>Help</MenuButton>
        </div>
    )
}

function MenuButton(props: PropsWithChildren) {
    return (
        <button className="px-6 py-1.5 text-sm hover:bg-black/10">
            {props.children}
        </button>
    )
}
