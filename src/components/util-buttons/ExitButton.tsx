import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ExitIconDark, ExitIconLight } from "../icons/Icons";

interface ExitButtonProps {
    onClick: () => void;
}
const ExitButton: React.FC<ExitButtonProps> = ({ onClick }): JSX.Element => {
    const theme = useSelector((state: RootState) => state.settings.theme);

    return (
        <div className="bg-component-light dark:bg-component-dark h-12 ml-4 aspect-square rounded-xl cursor-pointer hover:bg-component-light-hover dark:hover:bg-component-dark-hover transition-colors">
            <button onClick={onClick} className="w-full aspect-square p-3 rounded-xl">

                {theme === 'dark' ? <ExitIconDark /> : <ExitIconLight />}

            </button>
        </div>
    );
}
export default ExitButton