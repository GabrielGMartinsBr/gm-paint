import MenuButton from './MenuButton';

export default function MenuBar() {
    return (
        <div className="flex">
            <MenuButton items={[
                { text: 'New' },
                { text: 'Load' },
                { text: 'Save' },
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

