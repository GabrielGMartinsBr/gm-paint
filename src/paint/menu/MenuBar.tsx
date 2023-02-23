import MenuButton from './MenuButton';
import { useMenuBarHandle } from './useMenuBarHandle';

export default function MenuBar() {
    const menuHandler = useMenuBarHandle();

    return (
        <div className="flex">
            <MenuButton items={[
                { text: 'New', cb: menuHandler.clearImage },
                { text: 'Load', cb: menuHandler.loadImage },
                { text: 'Save as', cb: menuHandler.save },
            ]}>
                File
            </MenuButton>
            <MenuButton items={[
                { text: 'Clear', cb: menuHandler.clearImage },
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