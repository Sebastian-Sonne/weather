import { WeatherState } from "../state/slices/weatherSlice";

const API_KEY = 'n0rT2n5MVVYBLV73taIUmBTaTf0FwNdf';

const BASE_URL = 'https://api.tomorrow.io/v4/weather/forecast';

'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=n0rT2n5MVVYBLV73taIUmBTaTf0FwNdf'

const fetchWeatherData = async (searchParams: Record<string, string | number>): Promise<any> => {
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


const formatCurrentWeather = (data: WeatherData): WeatherState => {
    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];

    return { value: { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon } }
}

const getCurrentWeatherData = async (searchParams: Record<string, string | number>): Promise<any> => { //Promise<WeatherState> => {
    return await fetchWeatherData(searchParams)
        .then(currentWeather => {
            console.log(currentWeather);
            //const formattedCurrentWeather = formatCurrentWeather(currentWeather);
            //console.log(formattedCurrentWeather);

            return null;
            //return formattedCurrentWeather;
        })
        .catch(error => {
            console.error("Error fetching or formatting weather data:", error);
            throw new Error("Failed to fetch or format weather data");
        });
}

export default getCurrentWeatherData

