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


    return (
        <div className='flex flex-row bg-bg-light dark:bg-bg-dark p-4 w-screen gap-6 text-slate-950 dark:text-slate-50 transition-colors'>

            {/* <Sidebar /> */}
            
            <Main />
        </div>
    )
}

export default App
