import { CityData } from "../state/slices/citySlice";

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

/*

export const getCityResults = async (queryStartsWith: string): Promise<QuerySearchResults> => {
    const url = new URL(BASE_URL_GEO_NAMES);
    //@ts-ignore
    url.search = new URLSearchParams({ q: queryStartsWith, orderby: 'relevancy', maxRows: 5, username: API_KEY_GEO_NAMES }).toString();

    console.log(url.toString());

    //! geonames invalid ssl

    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://api.geonames.org/searchJSON?q=erlangen');

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok)
            throw new Error(`Failed to fetch cities: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        throw new Error(`GeoNames API Error: ${error}`)
    }
}

*/