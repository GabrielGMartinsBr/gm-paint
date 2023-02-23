import { Menu } from '@headlessui/react';
import { PropsWithChildren } from 'react';

interface MenuItem {
    text: string;
    cb?: () => void;
}

interface MenuButtonProps {
    items: MenuItem[];
}

export default function MenuButton(props: PropsWithChildren<MenuButtonProps>) {
    const { items } = props;

    return (
        <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={
                            'px-6 py-3 text-base ' +
                            (open ? 'bg-black/10' : 'hover:bg-black/10')
                        }
                    >
                        {props.children}
                    </Menu.Button>
                    <Menu.Items
                        className={
                            'absolute left-0 w-36 origin-top-right ' +
                            'divide-y divide-gray-100 ' +
                            'bg-white shadow-lg ring-1 ring-black ' +
                            'ring-opacity-5 focus:outline-none'
                        }
                    >
                        <div className="px-2 py-2">
                            {items.map(i => (
                                <Menu.Item key={i.text}>
                                    <button onClick={i.cb} className={
                                        'flex w-full items-center rounded-md px-2 py-2 text-sm ' +
                                        'hover:bg-slate-600/5'
                                    }>
                                        {i.text}
                                    </button>
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </>
            )}
        </Menu>
    )
}
