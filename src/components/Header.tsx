import { useDispatch, useSelector } from "react-redux";
import { ThemeDark, ThemeLight } from "./Icons";
import { RootState } from "../state/store";
import { toggle } from "../state/theme/themeSlice";


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
        <div className="w-full lg:w-2/3 h-12 mr-auto bg-secondary-light dark:bg-secondary-dark dark:bg-b rounded-xl">
            <input
                className="w-full h-full bg-transparent px-4 rounded-xl placeholder:text-slate-600 font-semibold dark:caret-white focus:outline-none"
                placeholder="Search for cities"
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export const ThemeSwitcher = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.theme.value);
    const dispatch = useDispatch();

    return (
        <div className="bg-secondary-light dark:bg-secondary-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            <button onClick={() => dispatch(toggle())} className="w-full aspect-square p-2 rounded-xl">

                {theme === 'dark' && <ThemeLight />}
                {theme !== 'dark' && <ThemeDark />}

            </button>
        </div>
    );
}