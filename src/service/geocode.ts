import { CityData } from "../state/slices/citySlice";

const BASE_URL = 'https://api.openweathermap.org/geo/1.0';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getCities = async (cityName: string): Promise<CityData[]> => {
    const url = new URL(BASE_URL + '/direct');
    //@ts-ignore
    url.search = new URLSearchParams({ q: cityName, appid: API_KEY, limit: '5' }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch city data: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`City API Error: ${error}`)
    }
}
export default getCities

export const getCitiesByCoordinates = async (lon: number, lat: number): Promise<CityData[]> => {
    const url = new URL(BASE_URL + '/reverse');
    //@ts-ignore
    url.search = new URLSearchParams({ lat: lat, lon: lon, limit: 5, appid: API_KEY }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch city data: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`City API Error: ${error}`)
    }
}

export const getUserLocation = async (): Promise<any> => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok)
            throw new Error(`Failed to fetch user location based on IP: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`Location API Error: ${error}`)
    }
}