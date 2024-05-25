import { useSelector } from "react-redux";
import SearchResults from "../header/SearchResult";
import InputError from "./Error";
import { RootState } from "../../state/store";

const Notification = (): JSX.Element => {
    const searchIsVisible = useSelector((state: RootState) => state.query.searchIsVisible);
    const inputError = useSelector((state: RootState) => state.error.inputError);

    return (
        <div className="flex flex-col gap-1 absolute lg:relative mt-2 w-[calc(100%-2rem)] lg:w-full">
            {searchIsVisible && <SearchResults />}
            {inputError !== '' && <InputError />}
        </div>
    );
}
export default Notification;