# React Weather App

A beautiful and functional weather app built using React and TypeScript.

**Live Demo**: [React Weather App](https://weather.sebastian-sonne.com)

## Key Features

- **Search Preview**: Real-time search results for cities.
- **Location Fetching**: Automatically fetches your current location.
- **Dark/Light Mode**: User preference for light or dark theme.
- **Multi-language Support**: Available in German and English.
- **Time Format Switching**: Choose between 12-hour and 24-hour formats.
- **Unit System Options**: Supports Metric, Imperial, and Kelvin units.
- **Comprehensive Forecasts**: Detailed 3-hourly updates and 5-day outlook.
- **Additional Metrics**: Includes air pressure, humidity, and more.

## Technologies Used

- **React**
- **TypeScript**
- **OpenWeather API**
- **GeoDB API**

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/sebastian-sonne/react-weather-app.git
   cd react-weather-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Obtain API keys: 
   - [OpenWeather API Key](https://openweathermap.org/api)
   - [GeoDB API Key](https://rapidapi.com/wirefreethought/api/geodb-cities)

   Note: Both APIs offer a free tier, meaning you don't need the paid option.

4. Create a `.env` file in the root directory and add your API keys:
   ```plaintext
   REACT_APP_OPEN_WEATHER_API_KEY=your_openweather_api_key
   REACT_APP_X_RapidAPI_Key=your_geodb_api_key
   REACT_APP_X_RapidAPI_Host=your_geodb_host
   ```

5. Run the application:
   ```bash
   npm run dev
   ```

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
