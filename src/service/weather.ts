import { WeatherData } from "../state/slices/weatherSlice";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const API_KEY = '0032afd1c29e8f942849a4db3a826afd';


const getWeather = async (lon: string, lat: string): Promise<WeatherData> => {
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({ lon: lon, lat: lat, apikey: API_KEY }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch Weather Data: ${error}`);
    }
}

export default getWeather

