import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
function App() {
  const api={
    key:'383cdd8a99e0b6da45df77070fc5c376',
    base:'https://api.openweathermap.org/data/2.5/'
  }
  const getCurrentweather  =async()=>{
    const response=await fetch("https://api.openweathermap.org/data/2.5/weather?q=Tunisia&units=metric&APPID=383cdd8a99e0b6da45df77070fc5c376");
    const data= await response.json();
    setWeather(data);
}

useEffect(()=>{getCurrentweather()},[]);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search =async evt => {
    if (evt.key === "Enter") {
      const res=await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      // console.log(res)
      const data= await res.json();
      console.log(data)
      setWeather(data);
      setQuery('');
        // .then(res => res.json())
        // .then(result => {
        //   setWeather(result);
        //   setQuery('');
        //   console.log(result);
        // });
    }
  }
  // weather?lat={lat}&lon={lon}&appid={API key}
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app'}>
    <main>
      <div className="search-box">
      <input
       type="text"
       className='search-bar'
       placeholder='enter a position'
       onChange={e => setQuery(e.target.value)}
       value={query}
       onKeyPress={search}
       />
      </div>
      {/* {(typeof weather.main == "undefined") && <div>
          <div className="location-box">
            <div className="location">El kef, Tunisia</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              15°c
            
            </div>
            <div className="weather">
           
              Sunny
              </div>
          </div>
        </div>} */}
        {(typeof weather.main != "undefined")  &&
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {/* {weather.main.temp} */}
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
              {weather.weather[0].main}
              
              </div>
          </div>
        </div>
        }
      
      
    </main>
    </div>
  );
}

export default App;
