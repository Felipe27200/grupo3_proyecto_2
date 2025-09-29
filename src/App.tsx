import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex w-full justify-center mt-7">
        <div className="md:w-1/2 lg:w-1/2">
          <form className="max-w-sm mx-auto">
            <div className="mb-5">
              <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 text-left">Subir imagen:</label>
              <input type="file" id="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
              </div>
              <label htmlFor="remember" className="ms-2 text-base font-medium text-gray-900">Es invertido?</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Subir imagen</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
