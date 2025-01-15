import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'b511aefd1e138985c01ba13a241706da';

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to retrieve data. Please check the city name and try again.');
      setWeatherData(null);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 font-sans p-4">
      <h1 className="text-5xl font-bold text-white mb-8">Weather App</h1>
      
      <div className="flex space-x-3 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
        >
          Get Weather
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weatherData && !loading && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 text-center w-80">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            {weatherData.name}
          </h2>
          <p className="text-lg">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
          <p className="text-lg capitalize">Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;