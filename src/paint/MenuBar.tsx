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
        <button className="px-9 py-3 text-base hover:bg-black/10">
            {props.children}
        </button>
    )
}
