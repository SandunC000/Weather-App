import React from "react"

const DailyWeather = ({ day, temperature, desc }) => {
  return (
    <div>
      <div className='text-black'>{day}</div>
      <div className='text-detail'>{temperature} °C</div>
      <div className='text-detail'>{desc}</div>
    </div>
  )
}

export default DailyWeather