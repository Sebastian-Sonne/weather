import { CityData } from "../state/slices/citySlice";

const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getCities = async (cityName: string): Promise<CityData[]> => {
    const url = new URL(BASE_URL);
    //@ts-ignore
    url.search = new URLSearchParams({ q: cityName, appid: API_KEY, limit: '5' }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch city data: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch city data: ${error}`)
    }
}

export default getCities

export const getUserLocation = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok)
            throw new Error(`Failed to fetch user location based on IP: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error(`Error: ${error}`)
    }
}