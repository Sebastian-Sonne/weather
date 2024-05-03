import { useEffect, useState } from 'react'

function App(): JSX.Element {

  //initial load
  var useTheme = false;
  if ('theme' in localStorage) {
    useTheme = localStorage.theme === 'dark';
  } else {
    useTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.theme = useTheme ? 'dark' : 'light';
  }
  const [dark, setDark] = useState<boolean>(useTheme);

  const toggleTheme = () => {
    setDark(!dark);
    localStorage.theme = dark ? 'light' : 'dark';
  }

  useEffect(() => {
    (dark) ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [dark]);

  return (
    <>
      
    </>
  )
}

export default App
