const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '87e051b065msh4b3f55debd5161fp177bb3jsnee3ae9c1df66',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

interface SerachParams {
    namePrefix: string,
    minPopulation?: string
}

interface CityData {
    data: [
        {
            city: string,
            country: string,
            longitude: number,
            latitude: number,
        }
    ]
}

const fetchCity = async (params: SerachParams): Promise<CityData> => {
    params.minPopulation = params.minPopulation ?? '10000';

    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({ ...params }).toString();

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch City Data: ${error}`);
    }
}

interface CityDataLongLat {
    city: string,
    country: string,
    long: number,
    lat: number,
}

const fetchLongLat = async (params: SerachParams): Promise<CityDataLongLat> => {
    return await (fetchCity(params))
        .then((data) => data.data[0])
        .then((data) => {
            const { city, country, latitude: lat, longitude: long } = data;
            return { city, country, lat, long };
        })
        .catch((error) => {
            throw new Error("Failed to fetch or format weather data" + error);
        });
}

export default fetchLongLat