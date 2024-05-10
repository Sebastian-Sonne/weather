import { useSelector } from "react-redux";
import { RootState } from "../state/store";


export const Loader = (): JSX.Element => {

    const isLoading = useSelector((state: RootState) => state.loading.value)

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center fixed backdrop-blur-sm dark:bg-opacity-50 top-0 left-0 z-30 w-screen h-screen">
                    <div className="bar w-[7px] h-[18px] mx-[9px] rounded-xl bg-gray-800 dark:bg-white"></div>
                    <div className="bar w-[7px] h-[18px] mx-[9px] rounded-xl bg-gray-800 dark:bg-white"></div>
                    <div className="bar w-[7px] h-[18px] mx-[9px] rounded-xl bg-gray-800 dark:bg-white"></div>
                    <div className="bar w-[7px] h-[18px] mx-[9px] rounded-xl bg-gray-800 dark:bg-white"></div>
                </div>

            )}
        </>
    );
}