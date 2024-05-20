import { useSelector } from "react-redux";
import SearchResults from "../header/SearchResult";
import InputError from "./Error";
import { RootState } from "../../state/store";

const Notification = () => {
    const searchIsVisible = useSelector((state: RootState) => state.query.searchIsVisible);
    const inputError = useSelector((state: RootState) => state.error.inputError);

    return (
        <div className="flex flex-col gap-1 absolute top-16 mt-2 w-[calc(100%-32px)] lg:w-[calc(66.66667%-34px)]">
            {searchIsVisible && <SearchResults />}
            {inputError !== '' && <InputError />}
        </div>
    );
}
export default Notification;