import { useSelector } from 'react-redux';
import Main from './components/Components';
import { RootState } from './state/store';
import { useEffect } from 'react';

function App(): JSX.Element {

    const theme = useSelector((state: RootState) => state.theme.value);
    useEffect(() => {
        (theme === 'dark') ? document.body.classList.add('dark')
            : document.body.classList.remove('dark');
    }, [theme]);
    //! onload theme does not work

    //! light icons; general color palete

    return (
        <div className='flex flex-col bg-bg-light dark:bg-bg-dark p-4 w-screen gap-6 text-primary-l dark:text-primary-d transition-colors'>

            {/* <Sidebar /> */}
            <Main />

            

            <h3 className='text-2xl font-semibold text-primary-l dark:text-primary-d'>Test primary</h3>
            <h3 className='text-2xl font-semibold text-secondary-l dark:text-secondary-d'>Test secondary</h3>
            <h3 className='text-2xl font-semibold text-accent-l dark:text-accent-d'>Test accent</h3>
        </div>
    )
}

export default App
