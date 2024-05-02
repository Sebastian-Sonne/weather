import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <button className='px-4 py-2 m-4 border border-blue-500 hover:bg-blue-500 hover:text-white font-semibold rounded-lg transition-color' onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      </div>
    </>
  )
}

export default App
