import { useSelector } from "react-redux";
import { RootState } from "../state/store";


export const Loader = (): JSX.Element => {

    const isLoading = useSelector((state: RootState) => state.loading.value)

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center fixed backdrop-blur-sm dark:bg-opacity-50 top-0 left-0 z-30 w-screen h-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" height="100px" width="100px" className="spinner w-[250px] h-[150px] relative rounded-full">
                        <circle stroke="url(#gradient)" r="20" cy="33" cx="33" strokeWidth="2" fill="transparent" className="path"></circle>
                        <linearGradient id="gradient">
                            <stop stopOpacity="1" stopColor="#000000" offset="0%"></stop>
                            <stop stopOpacity="0" stopColor="#222222" offset="100%"></stop>
                        </linearGradient>
                    </svg>
                </div>

            )}
        </>
    );
}