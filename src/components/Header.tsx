import { ThemeLight } from "./Icons";


const Header = (): JSX.Element => {

    return (
        <div className="flex flex-row justify-between w-full">
            <SearchBar />
            <ThemeSwitcher />
        </div>
    );
}

export default Header

export const SearchBar = (): JSX.Element => {

    const handleKeyDown = () => {

    }

    return (
        <div className="w-full lg:w-2/3 h-12 mr-auto bg-bg-secondary rounded-xl">
            <input
                className="w-full h-full bg-transparent px-4 rounded-xl caret-white focus:outline-none"
                placeholder="Search for cities"
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export const ThemeSwitcher = (): JSX.Element => {

    return (
        <div className="bg-bg-secondary h-12 p-2 aspect-square rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
            <ThemeLight />
        </div>
    );
}