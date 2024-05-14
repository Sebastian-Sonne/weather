import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ExitIconDark, ExitIconLight } from "./Icons";
import { decrementTimeout, setLoading, setTimeoutToValue } from "../state/slices/loadingSlice";
import { useEffect } from "react";

/**
 * Loading Screen with timeout to exit screen
 * @returns JSX Element
 */
export const Loader = (): JSX.Element => {
    const timeout = useSelector((state: RootState) => state.loading.timeout);

    return (
        <div className="flex flex-col items-center justify-center fixed backdrop-blur-sm dark:bg-opacity-50 top-0 left-0 z-30 w-screen h-screen">
            <LoaderCircle />
            {timeout === 0 && <ExitLoader />}
            {timeout > 0 && <LoaderTimer />}
        </div>
    );
}

/**
 * Loading Circle Animation
 * @returns JSX Element
 */
export const LoaderCircle = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" height="100px" width="100px" className="spinner w-[250px] h-[150px] relative rounded-full">
            <circle stroke={theme === 'dark' ? '#FFFFFF' : '#000000'} r="20" cy="33" cx="33" strokeWidth="2" fill="transparent" className="path"></circle>
            <linearGradient>
                <stop stopOpacity={theme === 'dark' ? "1" : "0"} stopColor="#FFFFFF" offset="0%"></stop>
                <stop stopOpacity={theme === 'dark' ? "0" : "1"} stopColor="#000000" offset="100%"></stop>
            </linearGradient>
        </svg>
    );
}

/**
 * Button to Exit the Loading Screen
 * @returns JSX Element
 */
export const ExitLoader = (): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setLoading(false));
        dispatch(setTimeoutToValue(10));
    }

    return (
        <button onClick={handleClick} className="absolute bottom-10">
            <div className="flex flex-col items-center gap-2 hover:bg-white dark:hover:bg-black rounded-lg p-4 transition-colors">
                <div className="w-8">
                    {theme === 'dark' ? <ExitIconDark /> : <ExitIconLight />}
                </div>
                <h3 className="font-semibold text-md text-primary-l dark:text-primary-d">CANCEL</h3>
            </div>
        </button>
    );
}

/**
 * Countdown for Loading Screen
 * @returns JSX Element
 */
export const LoaderTimer = (): JSX.Element => {
    const timeout = useSelector((state: RootState) => state.loading.timeout);
    const dispatch = useDispatch();

    //exit loading screen timeout
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(decrementTimeout());
        }, 1000);

        if (timeout === 0) clearInterval(interval);

        return () => clearInterval(interval);

    }, [timeout]);

    return (
        <div className="absolute bottom-10 text-md font-semibold text-primary-l dark:text-primary-d mt-2">
            {`CANCEL IN ${timeout} SECONDS`}
        </div>
    );
}