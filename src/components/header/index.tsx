import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import Location from "./Location"

const Header = (): JSX.Element => {

    return (
        <div className="flex flex-row justify-between w-full">
            <SearchBar />

            <div className='flex flex-r'>
                <Location />
                <ThemeSwitcher />
            </div>
        </div>
    );
}

export default Header