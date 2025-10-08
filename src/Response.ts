// Definimos la forma que debe tener la respuesta de una predicción (prediction y confidence numéricos)
export interface ImageRecognitionResponse {
  process_time: string;
  prediction: number;
  accuracy: number;
}
