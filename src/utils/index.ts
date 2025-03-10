import axios, { AxiosError } from 'axios';
import { ResponseAPI } from "../interfaces";


const ACCESS_KEY = import.meta.env.VITE_API_KEY as string;

// Validamos que la API Key esté definida
if (!ACCESS_KEY) {
    throw new Error("API Key no encontrada. Verifica tu archivo .env");
}

export const getImages = async (query: string): Promise<ResponseAPI> => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`;

    try {
        const { data } = await axios.get<ResponseAPI>(url);
        return data;
    } catch (error) {
        // Aseguramos que el error sea del tipo AxiosError
        const axiosError = error as AxiosError;

        // Si hay un error de respuesta, capturamos el mensaje de Unsplash
        if (axiosError.response && axiosError.response.data) {
           
            const unsplashError = axiosError.response.data as { errors?: string[] };
            throw new Error(unsplashError.errors?.join(", ") || "Error desconocido en Unsplash API");
        }

        
        throw new Error(axiosError.message || "Error en la solicitud");
    }
};
