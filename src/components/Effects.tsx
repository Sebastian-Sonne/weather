import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ErrorIcon } from "./Icons";


export const Loader = (): JSX.Element => {
    const isLoading = useSelector((state: RootState) => state.loading.value);
    const theme = useSelector((state: RootState) => state.settings.theme);

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center fixed backdrop-blur-sm dark:bg-opacity-50 top-0 left-0 z-30 w-screen h-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" height="100px" width="100px" className="spinner w-[250px] h-[150px] relative rounded-full">
                        <circle stroke={theme === 'dark' ? '#FFFFFF' : '#000000'} r="20" cy="33" cx="33" strokeWidth="2" fill="transparent" className="path"></circle>
                        <linearGradient>
                            <stop stopOpacity={theme === 'dark' ? "1" : "0"} stopColor="#FFFFFF" offset="0%"></stop>
                            <stop stopOpacity={theme === 'dark' ? "0" : "1"} stopColor="#000000" offset="100%"></stop>
                        </linearGradient>
                    </svg>
                </div>

            )}
        </>
    );
}

export const Error = (): JSX.Element => {

    return (
        <div className="flex items-center justify-center fixed backdrop-blur-sm dark:bg-opacity-50 top-0 left-0 p-4 z-30 w-screen h-screen">
            <div className="flex flex-col items-center justify-center gap-8 p-6 bg-component-light rounded-xl shadow-lg">
                <div className="w-36 aspect-square">
                    <ErrorIcon />
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <h2 className="font-bold text-4xl text-red-600 px-6">ERROR</h2>
                    <p className="font-semibold text-xl text-secondary-l">ERROR MESSAGE HERE</p>
                </div>

                <button className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-lg">Try Again</button>
            </div>
        </div>
    );
}