import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const InputError = (): JSX.Element => {
    const inputError = useSelector((state: RootState) => state.error.inputError);

    return (
        <div className='absolute top-16 w-[calc(100%-32px)] lg:w-[calc(66.66667%-34px)]'>
            <div className='flex flex-col bg-component-light dark:bg-component-dark py-1 text-red-600 text-center font-semibold text-xl rounded-lg mt-2 shadow-lg'>
                <span className="inline-block h-min break-words">{inputError}</span>
                <a href='mailto:hello@sebastian-sonne.com' className='font-semibold text-secondary-l dark:text-secondary-d hover:text-red-600 text-lg'>Report Issue</a>
            </div>
        </div>
    );
}

export default InputError