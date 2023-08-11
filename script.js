const show = document.querySelector(".show");
const container2 = document.querySelector(".container2");
const clothes = document.querySelector("#clothes");
const btn = document.querySelector(".btn");
btn.addEventListener("click", enter);



//API endpoint,key

const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "07b1bdf389ef89f12fc630ed0a493641",
};

//When window first time onload what to show and localStorage

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

// let state = "Bali";
// input.value = state;

window.onload = function () {
  if (localStorage.getItem("input") !== null) {
    getInfoCopie(localStorage.getItem("input"));
  } else {
    getInfoCopie("Bali");
  }
};
async function getInfoCopie(data) {
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  );
  const result = await res.json();
  displayResult(result);
}


//data from input and click enter
function enter(e) {
  if (e.keyCode === 13) {
    localStorage.setItem("input", input.value);
    getInfo(input.value);
    
  }
}

//by click button
document.querySelector(".btn").addEventListener("click", function () {
  getInfo(input.value);
});

//get API

async function getInfo(data) {
  
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  );
  console.log(data);
  const result = await res.json();
  displayResult(result);

  //animation for city and temperature
  gsap.from("#temperature", {
    x: -100,
    scale: "0",
    duration: 3,
    delay: 2,
  });

  gsap.from("#city", {
    x: 100,
    scale: "0",
    duration: 3,
  });
  input.value=""
}

//display city 

function displayResult(result) {
  if (input.value === "") {
    Swal.fire({
      icon: "error",
      title: "You must enter a city",
      text: "Please, try again!",
    });
  }
  let city = document.querySelector("#city");
  city.textContent = `${result.name}, ${result.sys.country}`;

  getOurDate();


  //change pic depend of weather

  
  if (result.main.temp <= -15) {
    clothes.setAttribute("src", "snowing.png");
  } else if (result.weather[0].main === "Rain") {
    clothes.setAttribute("src", "rain.png");
  } else if (result.wind.speed >= 8) {
    clothes.setAttribute("src", "windy1.png");
  } else if (result.wind.speed >= 10) {
    clothes.setAttribute("src", "windy.png");
  } else if (result.main.temp > -14 && result.main.temp <= 7) {
    clothes.setAttribute("src", "snowing1.png");
  } else if (result.main.temp > 6 && result.main.temp <= 16) {
    clothes.setAttribute("src", "autumn.png");
  } else if (result.main.temp > 17 && result.main.temp <= 21) {
    clothes.setAttribute("src", "hot1.png");
  } else if (result.main.temp > 22) {
    clothes.setAttribute("src", "hot.png");
  }


  //display information
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

  let icon = document.querySelector("#icon");
  let iconId = `${result.weather[0].icon}`;
  icon.src = "http://openweathermap.org/img/wn/" + iconId + ".png";

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;

  let conditions = document.querySelector(".conditions1");
  conditions.textContent = `${result.weather[0].main}`;

  let wind = document.querySelector(".wind1");
  wind.innerHTML = `${Math.round(result.wind.speed)} <span>km/h</span>`;

  let variation = document.querySelector(".variationMin");
  variation.innerHTML =
    "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>`;
  let variation2 = document.querySelector(".variationMax");
  variation2.innerHTML =
    "Max " + `${Math.round(result.main.temp_max)}<span>°</span>`;


//change background depend of name of city

  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + result.name + "')";
}



//correctly display of date

function getOurDate() {
  const myDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[myDate.getDay()];
  let todayDate = myDate.getDate();
  let month = months[myDate.getMonth()];
  let year = myDate.getFullYear();
  let showDate = document.querySelector("#date");
  showDate.textContent =
    `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
}



gsap.from("#temperature", {
  x: 100,
  scale: "0",
  duration: 3,
  delay: 2,
});

gsap.from("#city", {
  x: -100,
  scale: "0",
  duration: 3,
});


//container "details" and animation
show.addEventListener("click", function() {
  container2.classList.toggle("visible")
    gsap.fromTo(".feel",  {opacity: 0},{
      opacity: 1,
      duration: 1.6,
      delay: 0.5,
    });
    gsap.fromTo(".conditions", {opacity: 0},{
      opacity: 1,
      duration: 1.6,
      delay: 1,
    });
    gsap.fromTo(".variation", {opacity: 0},{
      opacity: 1,
      duration: 1.6,
      delay: 1.5,
    });
    gsap.fromTo(".wind", {opacity: 0},{
      opacity: 1,
      duration: 1.6,
      delay: 2,
    });
  }
  );