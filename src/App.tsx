import { useState } from 'react'
import { Link } from 'react-router-dom'; 
import './App.css'
import Swal from 'sweetalert2';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isInverted, setIsInverted] = useState(false);

  const [resultsData, setResultsData] = useState<ResponseData | null>(null);

  interface PredictionResults {
    [key: string]: number;
  }

  interface ResponseData {
    success: boolean;
    process_time: string;
    operation: string;
    results: PredictionResults;
    prediction: number;
    accuracy: number;
  }

function Item(response: ResponseData | null) {
  if (!response) return null; // No renderiza nada si es null

  return (
    <>
      <p className="text-left text-xs bg-white p-2 rounded-sm border border-gray-300 overflow-x-auto text-gray-900">
        Accuracy: {response.accuracy}
      </p>
      <p className="text-left text-xs bg-white p-2 rounded-sm border border-gray-300 overflow-x-auto text-gray-900">
        Prediction: {response.prediction}
      </p>
    </>
  );
}

  async function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    

    if (!file) {
      Swal.fire({
        icon: "info",
        title: "Sin imagen",
        text: "Debe subir una imagen para usarla",
        confirmButtonText: "Entendido",
      });

      console.error("No se selecciono ningún archivo");

      return;
    }

    // Lee los datos del formulario
    const formData = new FormData();

    formData.append("image", file);
    formData.append("invert", isInverted ? "true" : "false");

    try {
      const response = await fetch("http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict", {
        method: "POST",
        body: formData,
      });

      console.log(response)

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Hubo un problema",
          text: "No fue posible realizar la petición",
        });

        throw new Error("Request failed: " + response.statusText);
      }

      const data: ResponseData = await response.json();
      console.log("Upload success:", data);

      if (data && data.results) {
        setResultsData(data);
      }
      // Usando sessionStorage
const logs: ResponseData[] = JSON.parse(sessionStorage.getItem("requestLogs") || "[]");
logs.unshift(data); // Para agregar al inicio (último primero)
sessionStorage.setItem("requestLogs", JSON.stringify(logs));
    }
    catch (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <Link 
        to="/history" 
        className="text-blue-600 hover:text-blue-800 underline text-sm mb-6 self-end sm:self-center"
      >
        Ver historial de peticiones
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Cargar imagen para análisis
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label 
              htmlFor="file" 
              className="block mb-2 text-sm font-medium text-gray-700 text-left"
            >
              Subir imagen:
            </label>
            <input
              type="file"
              id="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>

          <div className="flex items-center">
            <input
              id="isInverted"
              type="checkbox"
              checked={isInverted}
              onChange={e => setIsInverted(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isInverted" className="ml-2 text-sm text-gray-700">
              ¿Es invertido?
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                       px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            Subir imagen
          </button>
        </form>

        {resultsData && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200 text-left">
            <p className="text-sm text-gray-700 mb-1">
              <strong>Accuracy:</strong> {resultsData.accuracy}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Prediction:</strong> {resultsData.prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  </>
);
}

export default App
