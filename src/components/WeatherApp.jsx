import React, { useState, useEffect } from "react"
import axios from "axios"
import ErrorPopup from "./ErrorPopup"
import {
  search_icon,
  clear_icon,
  cloud_icon,
  drizzle_icon,
  rain_icon,
  snow_icon,
  wind_icon,
  humidity_icon,
  loading_icon,
} from "../assets/images"
import "../assets/styles/WeatherApp.css"
import "../assets/styles/DailyWeather.css"
import DailyWeather from "./DailyWeather"

const WeatherApp = () => {
  let api_key = "f1fcd1c89e2c502707ad67ecfbf5d9db"

  const [lon, setLon] = useState("79.8612")
  const [lat, setlat] = useState("6.9271")
  const [location, setLocation] = useState()

  const [weatherData, setWeatherData] = useState({
    humidity: "",
    wind: "",
    temperature: "",
    feelsLike: "",
    uvi: "",
    desc: "",
  })

  const [wIcon, setWIcon] = useState(loading_icon)

  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [showMoreDetails, setShowMoreDetails] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [dailyWeatherData, setdailyWeatherData] = useState(null)
  const [numDailyWeather, setNumDailyWeather] = useState(3)

  const search = async () => {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api_key}`

    let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    try {
      let weatherResponse = await axios.get(weatherUrl)
      let locationResponse = await axios.get(locationUrl)

      let weatherResData = weatherResponse.data
      let locationData = locationResponse.data

      if (locationData.cod === "404") {
        setErrorMessage("City not Found")
        setShowErrorPopup(true)
        return
      } else if (locationData.cod === "400" || locationData.cod === 400) {
        setErrorMessage(data.message)
        setShowErrorPopup(true)
        return
      }

      setWeatherData({
        humidity: weatherResData.current.humidity + " %",
        wind: Math.floor(weatherResData.current.wind_speed) + " km/h",
        temperature: Math.floor(weatherResData.current.temp) + " °C",
        feelsLike: "Feels Like : " + Math.floor(weatherResData.current.feels_like) + " °C",
        uvi: weatherResData.current.uvi,
        desc: weatherResData.current.weather[0].description,
      })

      setLocation(locationData.name)

      if (
        weatherResData.current.weather[0].icon === "01d" ||
        weatherResData.current.weather[0].icon === "01n"
      ) {
        setWIcon(clear_icon)
      } else if (
        weatherResData.current.weather[0].icon === "02d" ||
        weatherResData.current.weather[0].icon === "02n"
      ) {
        setWIcon(cloud_icon)
      } else if (
        weatherResData.current.weather[0].icon === "03d" ||
        weatherResData.current.weather[0].icon === "03n"
      ) {
        setWIcon(cloud_icon)
      } else if (
        weatherResData.current.weather[0].icon === "04d" ||
        weatherResData.current.weather[0].icon === "04n"
      ) {
        setWIcon(cloud_icon)
      } else if (
        weatherResData.current.weather[0].icon === "09d" ||
        weatherResData.current.weather[0].icon === "09n"
      ) {
        setWIcon(drizzle_icon)
      } else if (
        weatherResData.current.weather[0].icon === "10d" ||
        weatherResData.current.weather[0].icon === "10n"
      ) {
        setWIcon(rain_icon)
      } else if (
        weatherResData.current.weather[0].icon === "13d" ||
        weatherResData.current.weather[0].icon === "13n"
      ) {
        setWIcon(snow_icon)
      } else {
        setWIcon(clear_icon)
      }

      setdailyWeatherData(weatherResData)
    } catch (error) {
      setErrorMessage("Error fetching weather data")
      setShowErrorPopup(true)
    }
  }

  const closeErrorPopup = () => {
    setShowErrorPopup(false)
  }

  const handleViewMore = () => {
    setShowMoreDetails((prevShowMore) => !prevShowMore)
    setNumDailyWeather((prevNum) => (showMoreDetails ? 3 : 7))
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <div className={`weather-container ${showErrorPopup ? "show-overlay" : ""}`}>
      <div className='top-bar'>
        <div>
          <input type='text' placeholder='Latitude' onChange={(e) => setlat(e.target.value)} />
          <input type='text' placeholder='Longitude' onChange={(e) => setLon(e.target.value)} />
        </div>

        <div
          className='button'
          onClick={() => {
            search()
          }}
        >
          <img src={search_icon} alt='' />
        </div>
      </div>

      <div className='time'>Time: {new Date().toLocaleTimeString()}</div>

      <div className='weather-image'>
        <img src={wIcon} alt='' />
      </div>

      <div className='weather-location'>{location}</div>

      <div className='weather-temp'>{weatherData.temperature}</div>
      <div className='weather-temp-feels-like'>{weatherData.feelsLike}</div>

      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{weatherData.humidity}</div>
            <div className='text'>Humidity</div>
          </div>
        </div>

        <div className='element'>
          <img src={wind_icon} alt='' className='icon' />
          <div className='data'>
            <div className='wind-rate'>{weatherData.wind}</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>

      {showErrorPopup && <div className='overlay'></div>}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}

      <div className='daily-weather-cards-row'>
        {[...Array(numDailyWeather)].map((_, index) => (
          <div key={index} className='daily-weather-card-container'>
            {dailyWeatherData && dailyWeatherData.daily && dailyWeatherData.daily[index] && (
              <DailyWeather
                day={`Day ${index + 1}`}
                temperature={dailyWeatherData.daily[index].temp.max}
                desc={dailyWeatherData.daily[index].weather[0].description}
              />
            )}
          </div>
        ))}
      </div>

      <button className='view-more-button' onClick={handleViewMore}>
        {showMoreDetails ? "View Fewer Details" : "View More"}
      </button>
    </div>
  )
}

export default WeatherApp
