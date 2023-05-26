import React, { useState } from "react";
import "./App.css";
//import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=11b5b6d66b892977820929cb90855181`;

  // два варианта get запроса через axios(реже употребляется - 1 промис) and fetch(чаще употребляется, в нём 2 промиса)
  /*const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }*/

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetch(url).then((response) => {
        response.text().then(function (text) {
          setData(JSON.parse(text));
          console.log(JSON.parse(text));
        });
      });
      setLocation("");
    }
  };

  /* const tempCelcium = (data) => {
    data.main.temp.toFixed()
 //   console.log(data.main.temp())
  }

  console.log (searchLocation(data.main.temp))*/

  return (
    <div className="app">
      <div className="wrapper">
        <div className="container">
          <div className="search">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={searchLocation}
              placeholder="Enter Location"
              type="text"
              className="search__input"
            />
          </div>
          {data.name !== undefined && (
            <div className="container-two">
              <div className="container__description">
                <div className="top">
                  <div className="top__location">
                    <p className="top__name">{data.name}</p>
                  </div>
                </div>
                <div className="bottom">
                  <div className="bottom__style">
                    {" "}
                    <div>
                      {data.main ? (
                        <h1 className="temp">
                          {Math.round((data.main.temp - 32) / 1.8)}°
                        </h1>
                      ) : null}
                    </div>
                    <div className="description">
                      <p className="description__about">Mostly</p>
                      {data.weather ? (
                        <p className="description__about">
                          {data.weather[0].main}
                        </p>
                      ) : null}
                    </div>
                    <div className="feels">
                      <p className="description__about">Feels Like</p>
                      {data.main ? (
                        <p className="description__about">
                          {Math.round(
                            (data.main.feels_like - 32) / 1.8
                          )}
                          °
                        </p>
                      ) : null}
                    </div>
                    <div className="humidity">
                      <p className="description__about">Humidity</p>
                      {data.main ? (
                        <p className="description__about">
                          {data.main.humidity}%
                        </p>
                      ) : null}
                    </div>
                    <div className="wind">
                      <p className="description__about">Wind Speed</p>
                      {data.wind ? (
                        <p className="description__about">
                          {data.wind.speed.toFixed()} m/s
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="container__description additional">
              <div className="Visibility">
                      <p className="description__about">Visibility</p>
                      {data.sys ? (
                        <p className="description__about">
                          {data.visibility}
                        </p>
                      ) : null}
                    </div>
                    <div className="Pressure">
                      <p className="description__about">Pressure</p>
                      {data.main ? (
                        <p className="description__about">
                          {data.main.pressure} hPa
                        </p>
                      ) : null}
                    </div>
                    <div className="Longitude">
                      <p className="description__about">Longitude</p>
                      {data.coord ? (
                        <p className="description__about">
                          {data.coord.lon.toFixed(2)}
                        </p>
                      ) : null}
                    </div>
                    <div className="Latitude">
                      <p className="description__about">Latitude</p>
                      {data.coord ? (
                        <p className="description__about">
                          {data.coord.lat.toFixed(2)}
                        </p>
                      ) : null}
                    </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
