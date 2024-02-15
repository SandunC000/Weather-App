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

  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [wIcon, setWIcon] = useState(loading_icon)

  const [weatherData, setWeatherData] = useState({
    humidity: "",
    wind: "",
    temperature: "",
    feelsLike: "",
    uvi: "",
    desc: "",
  })

  const [location, setLocation] = useState()

  const [lon, setLon] = useState("79.8612")
  const [lat, setlat] = useState("6.9271")

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api_key}`

    let urlA = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    try {
      let response = await axios.get(url)
      let responseA = await axios.get(urlA)

      let data = response.data
      let dataA = responseA.data

      console.log(dataA)

      if (dataA.cod === "404") {
        console.error("City not found")
        setErrorMessage("City not Found")
        setShowErrorPopup(true)
        return
      } else if (dataA.cod === "500" || responseA.cod === 400) {
        console.error(data.message)
        setErrorMessage(data.message)
        setShowErrorPopup(true)
        return
      }

      setWeatherData({
        humidity: data.current.humidity + " %",
        wind: Math.floor(data.current.wind_speed) + " km/h",
        temperature: Math.floor(data.current.temp) + " °C",
        feelsLike: "Feels Like : " + Math.floor(data.current.feels_like) + " °C",
        uvi: data.current.uvi,
        desc: data.current.weather[0].description,
      })

      setLocation(dataA.name)

      if (data.current.weather[0].icon === "01d" || data.current.weather[0].icon === "01n") {
        setWIcon(clear_icon)
      } else if (data.current.weather[0].icon === "02d" || data.current.weather[0].icon === "02n") {
        setWIcon(cloud_icon)
      } else if (data.current.weather[0].icon === "03d" || data.current.weather[0].icon === "03n") {
        setWIcon(cloud_icon)
      } else if (data.current.weather[0].icon === "04d" || data.current.weather[0].icon === "04n") {
        setWIcon(cloud_icon)
      } else if (data.current.weather[0].icon === "09d" || data.current.weather[0].icon === "09n") {
        setWIcon(drizzle_icon)
      } else if (data.current.weather[0].icon === "10d" || data.current.weather[0].icon === "10n") {
        setWIcon(rain_icon)
      } else if (data.current.weather[0].icon === "13d" || data.current.weather[0].icon === "13n") {
        setWIcon(snow_icon)
      } else {
        setWIcon(clear_icon)
      }
    } catch (error) {
      setErrorMessage("Error fetching weather data")
      setShowErrorPopup(true)
    }
  }

  const closeErrorPopup = () => {
    setShowErrorPopup(false)
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

      <div className='text'>Time: {new Date().toLocaleTimeString()}</div>

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

        <div className='element'>
          <img src={wind_icon} alt='' className='icon' />
          <div className='data'>
            <div className='weather-uvi'>{weatherData.uvi}</div>
            <div className='text'>UV Index</div>
          </div>
        </div>
      </div>

      {showErrorPopup && <div className='overlay'></div>}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}

      <div className='daily-weather-cards-row'>
        <div className='daily-weather-card-container'>
          <DailyWeather />
        </div>

        <div className='daily-weather-card-container'>
          <DailyWeather />
        </div>

        <div className='daily-weather-card-container'>
          <DailyWeather />
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default WeatherApp
