import { CityData } from "../state/slices/citySlice";

const BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct';

const API_KEY = '0032afd1c29e8f942849a4db3a826afd'

const getCities = async (cityName: string): Promise<CityData[]> => {
    const url = new URL(BASE_URL);
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
