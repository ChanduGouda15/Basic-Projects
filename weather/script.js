document.addEventListener('DOMContentLoaded',()=>{
  const cityInput = document.getElementById("city-input")
  const getWeatherbtn = document.getElementById("get-weather-btn")
  const cityName = document.getElementById("city-name")
  const temp = document.getElementById("temperature")
  const des = document.getElementById("description")
  const error = document.getElementById("errorMessage")


  const  API_KEY = "fd50c75ea86316d160a4b091f540dd81";

  getWeatherbtn.addEventListener('click',async ()=>{
    const city = cityInput.value.trim();
    if(!city) return;

    try {
      const weatherData = await fetchData(city);
      displayData(weatherData);
    } catch (error) {
      showError();
    }

  })

  async function fetchData(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);

     if(!response.ok){
      throw new Error("city not found");
     }

    const data =  await response.json()
    return data;
  }

  function displayData(data){
    const {name,main,weather} = data
    cityName.textContent=name;

    temp.textContent=`Temperature:${main.temp}`;
    des.textContent=`Description:${weather[0].description}`

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');

    
  }

  function showError(){
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
  
})