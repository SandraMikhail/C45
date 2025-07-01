//b9c7831c16b74b4c9d290652252706
//http://api.weatherapi.com/v1/current.json?key=b9c7831c16b74b4c9d290652252706&q=${q}

//http://api.weatherapi.com/v1/forecast.json?key=b9c7831c16b74b4c9d290652252706&q=07112&days=3
//http://api.weatherapi.com/v1/forecast.json?key=b9c7831c16b74b4c9d290652252706&q=rome&days=3&aqi=no&alerts=no

var weather = [{}];
var card = document.getElementById("firstcard");
var weatherX;
var currentTemp;
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");

async function getWeather(q = "cairo") {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=b9c7831c16b74b4c9d290652252706&q=${q}&days=3&aqi=no&alerts=no`
    );
    let data = await response.json();
    console.log("el dataaaa", data);
    DisDat(data);
  } catch (error) {
    console.log("error api", error);
  }
}

function DisDat(arr) {
  var today = arr.current.last_updated;
  var todayObject = new Date(today)

  var tomorrow = arr.forecast.forecastday[1].date;
  var tomObject = new Date(tomorrow).toLocaleDateString('en-Us',{weekday:'long'})
  console.log("toooooooooooom", tomObject)

  var afterTom =arr.forecast.forecastday[2].date;
   var afterTomObject = new Date(afterTom).toLocaleDateString('en-Us',{weekday:'long'})



  //Today  

 // var tomObject = new Date(tomorrow)
  //console.log("tomorrow as object worked" ,tomObject.toLocaleDateString('en-Us',{ day:'2-digit', month:'long'}))

/*

  var months = ['jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec']
  var currentmont = tomorrow.split("-")[1]  
  var x = currentmont.split("")[1]

  console.log("tomorrow ", tomorrow.split("-")[2] +' '+ months[x-1])
 */
  var box = `
    tomorrow =  ${arr.forecast.forecastday[1].date}
  <div class="row gx-0" >
    <div class="col-md-4 mb-3 ">
    <div class="card border-dark card-last">
                        <div class="card-header bg-transparent border-dark d-flex justify-content-between">
                            <p> ${arr.location.name}</p>
                            <p>${todayObject.toLocaleDateString('en-Us',{ day:'2-digit', month:'long'})}</p>
                        </div>
                        <div class="card-body text-success">
                            <h2 class="card-title text-white">${arr.current.temp_c}°C</h2>
                            <img src="https://${arr.current.condition.icon}" alt="test">
                            <p class="text-info">${arr.current.condition.text}</p>
                        
                            <div class="together d-flex">
                                <div class="d-flex mx-2 justify-content-center align-center ">
                                    <i class="fa-solid fa-umbrella mx-1"></i>
                                    <p>20%</p>
                                </div>

                                <div class="d-flex mx-2">
                                    <i class="fa-solid fa-wind mx-1"></i>
                                    <p> ${arr.current.wind_kph}km/h</p>
                                </div>
                                <div class="d-flex mx-2">
                                    <i class="fa-regular fa-compass mx-1"></i>
                                    <p>20%</p>
                                </div>
                            </div>
                        </div>
      </div>
                       </div>
                <div class="col-md-4 mb-3">
                    <div class="card border-dark mb-3 ">
                        <div class="card-header bg-transparent border-dark d-flex justify-content-center">
                             <p>${tomObject}</p>
                        </div>
                        <div class="card-body text-success text-center">
                          <img src="https://${arr.forecast.forecastday[1].day.condition.icon}" alt="test">
                          
                            <p class="max">${arr.forecast.forecastday[1].day.maxtemp_c}°</p>
                            <p>${arr.forecast.forecastday[1].day.mintemp_c}°</p>
                            <p class="text-info">${arr.forecast.forecastday[1].day.condition.text}</p>
                        </div>
                    </div>
                </div>
                            <div class="col-md-4 mb-3">
                    <div class="card border-dark mb-3 card-last">
                        <div class="card-header bg-transparent border-dark d-flex justify-content-center">
                             <p>${afterTomObject}</p>
                        </div>
                        <div class="card-body text-success text-center">
                          <img src="https://${arr.forecast.forecastday[2].day.condition.icon}" alt="test">
                          
                            <p class="max">${arr.forecast.forecastday[2].day.maxtemp_c}°</p>
                            <p>${arr.forecast.forecastday[2].day.mintemp_c}°</p>
                            <p class="text-info">${arr.forecast.forecastday[2].day.condition.text}</p>
                        </div>
                    </div>
                </div>
    </div>
         
    `;
  card.innerHTML = box;
}

getWeather("london");


searchInput.addEventListener("input", function () {
  console.log(searchInput.value);
  getWeather(searchInput.value);
});
