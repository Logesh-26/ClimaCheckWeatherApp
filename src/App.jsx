import React from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";

const App = () => {

  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  } = useWeather();

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCity(currentWeather.name)
    } else {
      fetchWeatherByCity("Chennai")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */ }
      <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={ {
        backgroundImage: `url('/weather-background.jpg')`
      } }>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/*Header Section */ }
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl 
             tracking-tight">Clima <span className="bg-gradient-to-r from-blue400 to-purple-400
             bg-clip-text text-transparent">Check</span></h1>
            <p className="text-white/80 text-medium md:text-xl mb-8 max-w-2xl mx-auto
            leading-relaxed">
              Experience weather like never before with real-time data,
              beautiful visuals, and precise forecasts for any location
              worldwide
            </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6
            lg:space-y-0 lg:space-x-6 mb-12">
              <SearchBar
                onSearch={ fetchWeatherByCity }
                onLocationSearch={ fetchWeatherByLocation }
                loading={ loading }
              />
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>
          
          {/* Main content */ }
          <div className="space-y-8">
            {/* conditional rendering */ }
            { loading && (
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border
              border-white/20">
                <LoadingSpinner />
                <p className="text-white/80 text-center mt-4 font-medium">Fetching latest weather data.........</p>
              </div>
              </div>
            ) }

            {/* conditional rendering */ }
            { error && !loading && (
              <div className="max-w-2xl mx-auto">
                <ErrorMessage message={ error } onRetry={ handleRetry} />
              </div>
            ) }

            {/* conditional rendering */ }
            { currentWeather && !loading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <WeatherCard weather={currentWeather} unit={unit} />
              </div>
              <div className="xl-col-span-1">
                {/* conditional rendering */ }
                {forecast && <WeatherForecast forecast={forecast} unit={unit} />}
              </div>
              </div>
            ) }
          </div>
      </div>
      </div>
    </div>
  )
}
export default App