import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const InputError = (): JSX.Element => {
    const inputError = useSelector((state: RootState) => state.error.inputError);
    const lang = useSelector((state: RootState) => state.settings.lang);

    return (
        <div className='w-full'>
            <div className='flex flex-col bg-component-light dark:bg-component-dark py-1 text-red-600 text-center font-semibold text-xl rounded-lg mt-2 shadow-lg'>
                <span className="inline-block h-min break-words">{inputError}</span>
                <a href='mailto:hello@sebastian-sonne.com' className='font-semibold text-secondary-l dark:text-secondary-d hover:text-red-600 text-lg'>{lang === 'en' ? 'Report Issue' : 'Fehler Melden'}</a>
            </div>
        </div>
    );
}

export default InputError