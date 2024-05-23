import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import Location from "./LocationButton"
import MapButton from "../map/MapButton";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import MapContainer from "../map";

const Header = (): JSX.Element => {
    const mapIsVisible = useSelector((state: RootState) => state.map.isVisible);

    return (
        <>
            <div className="flex flex-row justify-between w-full">
                <SearchBar />

                <div className='flex flex-r'>
                    <Location />
                    <MapButton />
                    <ThemeSwitcher />
                </div>
            </div>
            {mapIsVisible && <MapContainer />}
        </>
    );
}

export default Header