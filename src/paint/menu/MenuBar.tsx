import MenuButton from './MenuButton';
import { useMenuBarHandle } from './useMenuBarHandle';

export default function MenuBar() {
    const menuHandler = useMenuBarHandle();

    return (
        <div className="flex">
            <MenuButton items={[
                { text: 'New' },
                { text: 'Load' },
                { text: 'Save', cb: () => menuHandler.save() },
                { text: 'Save as' },
            ]}>
                File
            </MenuButton>
            <MenuButton items={[
                { text: 'Clear' },
            ]}>
                Edit
            </MenuButton>
            <MenuButton items={[
                { text: 'About' },
            ]}>
                Help
            </MenuButton>
        </div>
    )
}