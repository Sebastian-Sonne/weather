const Footer = (): JSX.Element => {
    return (
        <div className='flex items-center justify-center bg-component-light dark:bg-component-dark w-full h-12 rounded-xl'>
            <p className='text-secondary-l dark:text-secondary-d font-semibold'>&copy; {new Date().getFullYear()}
                <a href='https://github.com/sebastian-sonne' className='dark:text-slate-400 dark:hover:text-white text-gray-600 hover:text-gray-800 transition-colors' target='_blank'> Sebastian Sonne</a>
            </p>
        </div>
    );
}
export default Footer