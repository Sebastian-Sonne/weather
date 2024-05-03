import { useEffect, useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  var useTheme = false;
  if ('theme' in localStorage) {
    useTheme = localStorage.theme === 'dark';
  } else {
    useTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.theme = useTheme ? 'dark' : 'light';
  }
  const [dark, setDark] = useState(useTheme);

  const toggleTheme = () => {
    setDark(!dark);
    localStorage.theme = dark ? 'light' : 'dark';
  }

  useEffect(() => {
    (dark) ? document.body.classList.add("dark")
      : document.body.classList.remove('dark');
  }, [dark]);

  const handleClick = () => {
    setCount(c => c + 1);
    toggleTheme();
  }

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen dark:bg-gray-800'>
        <button 
          className='px-4 py-2 m-4 border dark:text-white border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-800 active:border-blue-800 font-semibold rounded-lg transition-all' 
          onClick={handleClick}>Count: {count}
        </button>
      </div>
    </>
  )
}

export default App
