import "./App.css";
import React from 'react';
import {useState} from 'react';

const apikey = "26a820ee3ae67040973d2b5332e92131";

//using geolocation get lat and lon
class App extends React.Component {
  // const [placevalue,setPlacevalue] = useState("");
  constructor(props) {
    super(props);
    this.state = {
      place: 'Delhi',
      degree: '26 °C '
    };
  }
  
  componentDidMount() {
    console.log('components did mount');
    window.addEventListener("load", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lon = position.coords.longitude;
          let lat = position.coords.latitude;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
          fetch(url)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("Event Listener: " + data);
              console.log(new Date().getTime());
              var dat = new Date(data.dt);
              console.log(dat.toLocaleString(undefined, "Asia/Kolkata"));
              console.log(new Date().getMinutes());
              this.weatherReport(data);
            });
        });
      }
    });
  }

  searchByCity() {
    var place = document.getElementById("input").value;
    var urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.weatherReport(data);
      });
    document.getElementById("input").value = "";
  }

  weatherReport(data) {
    var urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

    fetch(urlcast)
      .then((res) => {
        return res.json();
      })
      .then((forecast) => {
        console.log(forecast.city);
        this.hourForecast(forecast);
        this.dayForecast(forecast);

        console.log(data);
        document.getElementById("city").innerText =
          data.name + ", " + data.sys.country;
        console.log("Name: " + data.name, data.sys.country);

        console.log(Math.floor(data.main.temp - 273));
        document.getElementById("temperature").innerText =
          Math.floor(data.main.temp - 273) + " °C";

        document.getElementById("clouds").innerText =
          data.weather[0].description;
        console.log(data.weather[0].description);

        let icon1 = data.weather[0].icon;
        let iconurl = "http://api.openweathermap.org/img/w/" + icon1 + ".png";
        document.getElementById("img").src = iconurl;
      });
  }

  hourForecast(forecast) {
    document.querySelector(".templist").innerHTML = "";
    for (let i = 0; i < 5; i++) {
      var date = new Date(forecast.list[i].dt * 1000);
      console.log(
        date.toLocaleTimeString(undefined, "Asia/Kolkata").replace(":00", "")
      );

      let hourR = document.createElement("div");
      hourR.setAttribute("class", "next");

      let div = document.createElement("div");
      let time = document.createElement("p");
      time.setAttribute("class", "time");
      time.innerText = date
        .toLocaleTimeString(undefined, "Asia/Kolkata")
        .replace(":00", "");
      let temp = document.createElement("p");
      temp.innerText =
        Math.floor(forecast.list[i].main.temp_max - 273) +
        " °C" +
        " / " +
        Math.floor(forecast.list[i].main.temp_min - 273) +
        " °C";
      div.appendChild(time);
      div.appendChild(temp);

      let desc = document.createElement("p");
      desc.setAttribute("class", "desc");
      desc.innerText = forecast.list[i].weather[0].description;

      hourR.appendChild(div);
      hourR.appendChild(desc);
      document.querySelector(".templist").appendChild(hourR);
    }
  }

  dayForecast(forecast) {
    document.querySelector(".weekF").innerHTML = "";
    console.log("forcase list length" + forecast.list.length);
    for (let i = 8; i < forecast.list.length; i += 8) {
      console.log(forecast.list[i]);
      let div = document.createElement("div");
      div.setAttribute("class", "dayF");
      let day = document.createElement("p");
      day.setAttribute("class", "date");
      day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(
        undefined,
        "Asia/Kolkata"
      );
      div.appendChild(day);

      let temp = document.createElement("p");
      temp.innerText =
        Math.floor(forecast.list[i].main.temp_max - 273) +
        " °C" +
        " / " +
        Math.floor(forecast.list[i].main.temp_min - 273) +
        " °C";
      div.appendChild(temp);

      let description = document.createElement("p");
      description.setAttribute("class", "desc");
      description.innerText = forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector(".weekF").appendChild(div);
    }
  }

  render() {

    // const placevalue = () => {
    //   this.setState({
    //     place: this.state.place
    //   })

    // }
    return (
      <div className="App">
        <div className="header">
          <h1>WEATHER APP</h1>
          <div>
            <input
              type="text"
              name=""
              id="input"
              placeholder="Enter city name"
            />
            <button id="search" onClick={() => this.searchByCity()}>
              Search
            </button>
          </div>
        </div>

        <main>
          <div className="weather">
            {/* <h2 id="city">Delhi,IN</h2> */}
            <h2 id="city">{this.state.place}</h2>
            <div className="temp-box">
              <img
                src="/WeatherApi/assests/images/weathericon.png"
                alt=""
                id="img"
              />
              {/* <p id="temperature">26 °C</p> */}
              <p id="temperature">{this.state.degree}</p>
            </div>
            <span id="clouds">Broken Clouds</span>
          </div>
          <div className="divider1"></div>

          <div className="forecstH">
            <p className="cast-header">Upcoming forecast</p>
            <div className="templist">
              <div className="next">
                <div>
                  <p className="time">8:30 PM</p>
                  <p>29 °C / 29 °C</p>
                </div>
                <p className="desc">Light Rain</p>
              </div>

              <div className="next">
                <div>
                  <p className="time">8:30 PM</p>
                  <p>29 °C / 29 °C</p>
                </div>
                <p className="desc">Light Rain</p>
              </div>

              <div className="next">
                <div>
                  <p className="time">8:30 PM</p>
                  <p>29 °C / 29 °C</p>
                </div>
                <p className="desc">Light Rain</p>
              </div>

              <div className="next">
                <div>
                  <p className="time">8:30 PM</p>
                  <p>29 °C / 29 °C</p>
                </div>
                <p className="desc">Light Rain</p>
              </div>
              <div className="next">
                <div>
                  <p className="time">8:30 PM</p>
                  <p>29 °C / 29 °C</p>
                </div>
                <p className="desc">Light Rain</p>
              </div>
            </div>
          </div>
        </main>

        <div className="forecstD">
          <div className="divider2"></div>
          <p className="cast-header"> Next 4 days forecast</p>
          <div className="weekF">
            <div className="dayF">
              <p className="date">Sun Jul 03 2023</p>
              <p>31 °C / 31 °C</p>
              <p className="desc">Overcast Clouds</p>
            </div>
            <div className="dayF">
              <p className="date">Sun Jul 03 2023</p>
              <p>31 °C / 31 °C</p>
              <p className="desc">Overcast Clouds</p>
            </div>

            <div className="dayF">
              <p className="date">Sun Jul 03 2023</p>
              <p>31 °C / 31 °C</p>
              <p className="desc">Overcast Clouds</p>
            </div>

            <div className="dayF">
              <p className="date">Sun Jul 03 2023</p>
              <p>31 °C / 31 °C</p>
              <p className="desc">Overcast Clouds</p>
            </div>

            <div className="dayF">
              <p className="date">Sun Jul 03 2022</p>
              <p>31 °C / 31 °C</p>
              <p className="desc">Overcast Clouds</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
