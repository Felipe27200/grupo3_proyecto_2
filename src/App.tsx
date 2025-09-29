import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isInverted, setIsInverted] = useState(false);

  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    console.log(isInverted);
    console.log(file);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  } 
  return (
    <>
      <div className="flex w-full justify-center mt-7">
        <div className="md:w-1/2 lg:w-1/2">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 text-left">Subir imagen:</label>
              <input 
                type="file" 
                id="file" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input 
                  id="isInverted" 
                  type="checkbox" 
                  checked={isInverted}
                  onChange={e => setIsInverted(e.target.checked)}
                  className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" />
              </div>
              <label htmlFor="isInverted" className="ms-2 text-base font-medium text-gray-900">Es invertido?</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Subir imagen</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
