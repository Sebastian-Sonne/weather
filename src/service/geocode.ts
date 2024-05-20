import { CityData } from "../state/slices/citySlice";
import { SearchResponse } from "../state/slices/querySlice";

const BASE_URL_OPEN_WEATHER = 'https://api.openweathermap.org/geo/1.0';
const API_KEY_OPEN_WEATHER = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getCities = async (cityName: string, limit: number = 1): Promise<CityData[]> => {
    const url = new URL(BASE_URL_OPEN_WEATHER + '/direct');
    //@ts-ignore
    url.search = new URLSearchParams({ q: cityName, appid: API_KEY_OPEN_WEATHER, limit: limit }).toString();

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
    const url = new URL(BASE_URL_OPEN_WEATHER + '/reverse');
    //@ts-ignore
    url.search = new URLSearchParams({ lat: lat, lon: lon, limit: 5, appid: API_KEY_OPEN_WEATHER }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch city data: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch city data (coords)');
    }
}

export const getUserLocation = async (): Promise<any> => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok)
            throw new Error(`Failed to fetch user location based on IP: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user location');
    }
}


const BASE_URL_GEO_DB = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAP_Host
    }
};

export const getCityResults = async (namePrefix: string): Promise<SearchResponse> => {
    const url = new URL(BASE_URL_GEO_DB);
    url.search = new URLSearchParams({ namePrefix: namePrefix, limit: '5', sort: '-population' }).toString();
    try {
        //@ts-ignore
        const response = await fetch(url, options);
        if (!response.ok)
            throw new Error(`${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`GeoDB API Error: ${error}`)
    }
}
