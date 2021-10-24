let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    searchBar = document.getElementById("search-bar"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    // currentCity = "Cairo",
    apiResponse,
    responseData,
    monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
     days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let nextDay = document.getElementsByClassName("nextDay"),
      nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description");


      async function getWeatherData(currentCity="cairo"){
        apiResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
        responseData =await apiResponse.json();
        console.log(responseData);
        dispalyTodayWeather();
        displayDysWeather()
     }
     getWeatherData()
     
     
     
     // current date
     function dispalyTodayWeather(){
     
       let date = new Date();
       today.innerHTML=days[date.getDay()];
       todayDate.innerText=`${date.getDate()}${monthName[date.getMonth()]}`;
       cityLocation.innerHTML=  responseData.location.name;
       todayDegree.innerHTML= responseData.current.temp_c;
       todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`)
       description.innerHTML= responseData.current.condition.text;
       humidty.innerHTML= responseData.current.humidity;
       wind.innerHTML =responseData.current.wind_kph;
       compass.innerHTML=responseData.current.wind_dir;
       
     }


     function displayDysWeather(){

      for(let i=0;i<nextDay.length;i++){
    
     nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
     nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML =responseData.forecast.forecastday[i+1].day.maxtemp_c;
    nextDayDescription[i].innerHTML =responseData.forecast.forecastday[i+1].day.condition.text;
    
      }
    }

      searchBar.addEventListener("keyup",function(){
        currentCity=searchBar.value;
        getWeatherData(currentCity)
      })