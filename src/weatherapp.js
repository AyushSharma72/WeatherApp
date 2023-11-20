import React, { useEffect } from "react"
import { useState } from "react";
import { MdPlace } from "react-icons/md";
import "./weather.css"
import { RxCross1 } from "react-icons/rx";
function WeatherApp() {
    const [CityName, SetCityName] = useState("INDORE")
    const [Cityweather, SetCityWeather] = useState(null)

    useEffect(() => {
        const Fetch = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&units=metric&appid=4808d2b2960a08b020736d37fbd18c36`
            const result = await fetch(url);
            const data = await result.json();
            SetCityWeather(data);
            console.log(data);
        }
        Fetch();

    }, [CityName])

    function Novalue() {
        if (CityName === "") {
            SetCityName("INDORE")
        }
    }
    function deletetext() {
        document.getElementById("input").value = null
        SetCityName("INDORE")
    }
    return (

        <div className="ParentDiv">
            <div className="OuterBox">

                <div className="inputfield">
                    <input type="text" placeholder="Enter City Name" className="InputCity" onChange={(e) => { SetCityName(e.target.value); }} onBlur={Novalue} id="input">
                    </input>
                    <RxCross1 className="Cross" onClick={deletetext} />
                </div>
                {Cityweather && Cityweather.main && Cityweather.main.temp ?
                    <div className="WeatherInfo">
                        <h2 style={{ display: "flex", alignItems: "center" }} className="font"><MdPlace></MdPlace>{CityName} ({Cityweather.sys.country})</h2>
                        <h3 className="font">Temp: {Cityweather.main.temp} °C </h3>
                        <p className="font">Min: {Cityweather.main.temp_min} °C |  Max: {Cityweather.main.temp_max} °C </p>
                        <p className="font">Humidity: {Cityweather.main.humidity} % |  Wind: {Cityweather.wind.speed} km/h</p>
                        <p className="font">Clouds: {Cityweather.clouds.all} % | visibility : {Cityweather.visibility} meters </p>
                    </div> :
                    <h2 className="font" style={{ marginTop: "3rem" }}>No Such City Found</h2>
                }

            </div>


        </div>
    )
}
export default WeatherApp;