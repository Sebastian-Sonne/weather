import SearchBar from "./SearchBar";
import ThemeSwitcher from "../util-buttons/ThemeButton";
import LocationButton from "../util-buttons/LocationButton"
import MapButton from "../util-buttons/MapButton";
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
                    <LocationButton />
                    <MapButton />
                    <ThemeSwitcher />
                </div>
            </div>
            {mapIsVisible && <MapContainer />}
        </>
    );
}

export default Header