import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

function History() {
  const [logs, setLogs] = useState<ResponseData[]>([]);

  useEffect(() => {
    const storedLogs = JSON.parse(sessionStorage.getItem("requestLogs") || "[]");
    setLogs(storedLogs);
  }, []);

  if (logs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <p className="text-gray-600 text-lg mb-4">No hay historial de solicitudes.</p>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Historial de solicitudes
          </h2>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
          >
            Volver
          </Link>
        </div>

        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-gray-50"
            >
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium"># {index + 1}</span>
                <span className="text-sm text-gray-500">
                  {log.operation || 'Operación'}
                </span>
              </div>
              <p className="text-gray-800 text-sm">
                <strong>Accuracy:</strong> {log.accuracy}
              </p>
              <p className="text-gray-800 text-sm">
                <strong>Prediction:</strong> {log.prediction}
              </p>
              <p className="text-gray-800 text-sm">
                <strong>Process time:</strong> {log.process_time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
