const show = document.querySelector(".show");
const container2 = document.querySelector(".container2");
const clothes = document.querySelector("#clothes");
const btn = document.querySelector(".btn");
btn.addEventListener("click", enter);
const localContainer = document.querySelector(".localContainer");
const containerComplect = document.querySelector(".containerComplect");
const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", addToFav);
const deleteAll= document.querySelector(".deleteAll")


//API endpoint,key

const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "07b1bdf389ef89f12fc630ed0a493641",
};

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);




//When window first time onload what to show and localStorage

if (localStorage.getItem("input") !== null) {
  getInfoCopie(localStorage.getItem("input"));
} else {
  getInfoCopie("Bali");
}


//Get API for display info from LocalStorage by upload
async function getInfoCopie(data) {
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  );
  const result = await res.json();
  displayResult(result);
  input.value = "";
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
  input.value = "";
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


//let arrFromSavedToFav =  localStorage.getItem("saved") || [];
let arrFromSavedToFav =  [];

//display info from LocalStorage by upload
if(localStorage.getItem("saved") !== null) {
  let array=localStorage.getItem("saved") // ['Bali 25°', 'Berlin 18°']
  let arrayFromSaved=array.split(",")

  arrayFromSaved.forEach(e=>{
    const item = document.createElement("li");
    item.textContent=e;
    item.classList.add("savedEl");
    localContainer.appendChild(item);
    containerComplect.classList.add("localContainerAfter")
  })
 localStorage.setItem("newSaved", array)
}

//Delete all
deleteAll.addEventListener("click", deleteAllFunc)
function deleteAllFunc(){
  localStorage.removeItem("saved");
  localStorage.removeItem("newSaved");
    localContainer.innerHTML="";
    window.location.reload()
}

// by click "add" save some cities to localStorage

async function addToFav() {
  let storage = localStorage.getItem("input");
  const res = await fetch(
    `${api.endpoint}weather?q=${storage}&units=metric&appID=${api.key}`);
  const result = await res.json();
  const item = document.createElement("li");
  let text = `${result.name} ${Math.round(result.main.temp)}°`;
  item.innerText = text;
  localContainer.appendChild(item);
  item.classList.add("savedEl");

  arrFromSavedToFav.push(text) 

 
 // Only uniq element append to fav
// let test=localStorage.getItem("saved")
// let ArrTest=test.split(",")
// let uniqArr = [...new Set(ArrTest)]

//  upgrade localStorage
  if(localStorage.getItem("saved")===null){
    localStorage.setItem("saved", arrFromSavedToFav); 
  }
  else{
    let array=localStorage.getItem("saved")
   let newArr= array+"," +arrFromSavedToFav
//console.log(array)//Bali 25°,Bali 25°,Bali 25°,Bali 25°
//console.log(newArr)//Bali 25°,Bali 25°,Bali 25°,Bali 25°,Bali 25°,Bali 25°
 let a =newArr.split(",")
 let b=[...new Set(a)]
 let c= b.toString()
 console.log()
localStorage.setItem("saved", c); 
  }
 
//    //remove item
//    item.addEventListener('dblclick', function(){
//     localContainer.removeChild(item);
// })
window.location.reload()
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
show.addEventListener("click", function () {
  container2.classList.toggle("visible");
  gsap.fromTo(
    ".feel",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.6,
      delay: 0.5,
    }
  );
  gsap.fromTo(
    ".conditions",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.6,
      delay: 1,
    }
  );
  gsap.fromTo(
    ".variation",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.6,
      delay: 1.5,
    }
  );
  gsap.fromTo(
    ".wind",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.6,
      delay: 2,
    }
  );
});
