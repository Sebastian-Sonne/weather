const API_KEY = 'YOUR API KEY';

const BASE_URL = 'https://api.tomorrow.io/v4/weather/forecast';


const fetchWeatherData = async (searchParams: Record<string, string | number>): Promise<WeatherData> => {
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({ ...searchParams, apikey: API_KEY }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch Weather Data`);
    }
}

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    name: string;
    dt: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    weather: {
        main: string;
        icon: number;
    }[];
    wind: {
        speed: number;
    };
}

const getCurrentWeatherData = async (searchParams: Record<string, string | number>): Promise<WeatherData> => {
    return await fetchWeatherData(searchParams)
        .then(currentWeather => {
            return currentWeather;
        })
        .catch(error => {
            throw new Error(`Failed to fetch or format weather data ${error}`);
        });
}

export default getCurrentWeatherData

