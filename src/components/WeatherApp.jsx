import React, { useState } from "react"
import {
  search_icon,
  clear_icon,
  cloud_icon,
  drizzle_icon,
  rain_icon,
  snow_icon,
  wind_icon,
  humidity_icon,
} from "../assets"

import "./WeatherApp.css"

const WeatherApp = () => {
  let api_key = ""

  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [wIcon, setWIcon] = useState(cloud_icon)

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value === "") {
      return 0
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    try {
      let response = await fetch(url)
      let data = await response.json()

      if (data.cod === "404") {
        console.error("City not found")
        setShowErrorPopup(true)
        return
      }

      const humidity = document.getElementsByClassName("humidity-percent")
      const wind = document.getElementsByClassName("wind-rate")
      const temperature = document.getElementsByClassName("weather-temp")
      const location = document.getElementsByClassName("weather-location")

      humidity[0].innerHTML = data.main.humidity + " %"
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h"
      temperature[0].innerHTML = Math.floor(data.main.temp) + " C"
      location[0].innerHTML = data.name

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWIcon(clear_icon)
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWIcon(cloud_icon)
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWIcon(drizzle_icon)
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWIcon(drizzle_icon)
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWIcon(rain_icon)
      } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWIcon(rain_icon)
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWIcon(snow_icon)
      } else {
        setWIcon(clear_icon)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  const closeErrorPopup = () => {
    setShowErrorPopup(false)
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search'></input>

        <div
          className='search-icon'
          onClick={() => {
            search()
          }}
        >
          <img src={search_icon} alt='' />
        </div>
      </div>

      <div className='weather-image'>
        <img src={wIcon} alt='' />
      </div>
      <div className='weather-temp'>20</div>

      <div className='weather-location'>London</div>

      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>

        <div className='element'>
          <img src={wind_icon} alt='' className='icon' />
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>

      {showErrorPopup && (
        <div className='error-popup'>
          <p>City not found. Please try again.</p>
          <button onClick={closeErrorPopup}>OK</button>
        </div>
      )}
    </div>
  )
}

export default WeatherApp
