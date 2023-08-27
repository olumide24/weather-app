import { useState } from 'react'
import './style.css'
import axios from 'axios'
function Home() {
    const [data, setData] = useState ({
        celcius: 10, 
        name: 'Lagos',
        humidity: 10,
        speed: 2,
        image: '/Images/clouds.png'
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = ()=> {
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&&APPID=2a6f0f2b41db2916aee5fc0c60704a25&units=metric`;
        
        axios.get(apiUrl)
        
        .then(res => {
            let imagePath = '';
            if (res.data.weather[0].main === "Clouds") {
                imagePath = "/Images/clouds.png"
            } else if (res.data.weather[0].main === "Clear") {
                imagePath = "/Images/clear.png"
            } else if (res.data.weather[0].main === "Rain") {
                imagePath = "/Images/rain.png"
            } else if (res.data.weather[0].main === "Drizzle") {
                imagePath = "Images/drizzle.png"
            } else if (res.data.weather[0].main === "Mist") {
                imagePath = "Images/mist.png"
            } else {
                imagePath = "/Images/clouds.png"
            }
            
            setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath})
            setError("");
        })
        .catch( err => {
            if (err.response.status === 404) {
                setError("Invalid City Name")
            } else {
                setError("");
            }
        
                console.log(err)
            });
        }
    }


  return (
    <div className='container'>
        <div className='weather'>
            <h1>Weather App By Olumide</h1>
            <div className='search'>
                <input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)}/>
                <button><img src='/Images/search.png' alt='Search' onClick={handleClick} /></button>

            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img src={data.image} alt='cloud' />
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src='/Images/humidity.png' alt='humidity' />
                    </div>
                    <div className='humidity'>
                        <p>{Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                    <div className='col'>
                        <img src='/Images/wind.png' alt='windspeed' />
                    </div>
                    <div className='wind'>
                        <p>{Math.round(data.speed)} km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home