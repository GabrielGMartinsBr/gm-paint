import AboutDialog from '../dialogs/about/AboutDialog';
import MenuButton from './MenuButton';
import { useMenuBarHandle } from './useMenuBarHandle';

export default function MenuBar() {
    const menuHandler = useMenuBarHandle();

    return (
        <div className="flex">
            <MenuButton items={[
                { text: 'New', cb: menuHandler.resetDocument },
                { text: 'Open', cb: menuHandler.loadImage },
                { text: 'Save as', cb: menuHandler.save },
            ]}>
                File
            </MenuButton>
            <MenuButton items={[
                { text: 'Zoom', cb: menuHandler.zoom },
                { text: 'Clear', cb: menuHandler.clearImage },
            ]}>
                Edit
            </MenuButton>
            <MenuButton items={[
                { text: 'About', cb: menuHandler.openAboutDialog },
            ]}>
                Help
            </MenuButton>
            <AboutDialog />
        </div>
    )
}