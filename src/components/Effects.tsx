import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ExitIcon } from "./Icons";
import { setLoading } from "../state/slices/loadingSlice";

export const Loader = (): JSX.Element => {
    const isLoading = useSelector((state: RootState) => state.loading.value);
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch();

    return (
        <>
            {isLoading && (
                <div className="flex flex-col items-center justify-center fixed backdrop-blur-sm dark:bg-opacity-50 top-0 left-0 z-30 w-screen h-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" height="100px" width="100px" className="spinner w-[250px] h-[150px] relative rounded-full">
                        <circle stroke={theme === 'dark' ? '#FFFFFF' : '#000000'} r="20" cy="33" cx="33" strokeWidth="2" fill="transparent" className="path"></circle>
                        <linearGradient>
                            <stop stopOpacity={theme === 'dark' ? "1" : "0"} stopColor="#FFFFFF" offset="0%"></stop>
                            <stop stopOpacity={theme === 'dark' ? "0" : "1"} stopColor="#000000" offset="100%"></stop>
                        </linearGradient>
                    </svg>

                    <button onClick={() => dispatch(setLoading(false))} className="absolute bottom-10">
                        <div className=" flex flex-col items-center gap-2 hover:bg-white dark:hover:bg-black rounded-lg p-4 transition-colors">
                            <div className="w-8">
                                <ExitIcon />
                            </div>
                            <h3 className="font-semibold text-md text-secondary-l">CANCEL</h3>
                        </div>
                    </button>
                </div>
            )}
        </>
    );
}