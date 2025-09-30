import { useState } from 'react'
import './App.css'

import Swal from 'sweetalert2';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isInverted, setIsInverted] = useState(false);

  async function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    if (!file) 
    {
      Swal.fire({
        icon: "info",
        title: "Sin imagen",
        text: "Debe subir una imagen para usar la IA",
        confirmButtonText: "Entendido",
      });

      console.error("No se selecciono ningún archivo");

      return;
    }

    // Read the form data
    const formData = new FormData();

    formData.append("image", file);
    formData.append("invert", isInverted ? "true" : "false");

    try 
    {
      const response = await fetch("api/predict", {
        method: "POST",
        body: formData,
      });

      console.log(response)

      if (!response.ok) 
      {
        Swal.fire({
          icon: "error",
          title: "Hubo un problema",
          text: "No fue posible realizar la petición a la IA",
        });

        throw new Error("Request failed: " + response.statusText);
      }

      const data = await response.json();
      console.log("Upload success:", data);
    } 
    catch (error) 
    {
      Swal.fire({
          icon: "error",
          title: "Ocurrio un error durante la petición",
          text: `${error}`,
        });

      console.error("Upload error:", error);
    }

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
