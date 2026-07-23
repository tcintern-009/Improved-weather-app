import { getrenderRecent } from "./render.js";

const apiKey = "527dd915fabe40979c2141828262107";

export const getRecentSearched = (lastSearched) => {
  let container = document.querySelector("#lastSearchedList");
  let unique = [...new Set(lastSearched)];
  unique = unique.slice(-5);
  container.innerHTML = unique.map((e) => {
    return `
      <h1 class="lastSearchedItem">${e}</h1>
    `;
  }).join("");
}


// get day 


export function getdayName(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long"
  });
}

async function getFiveWeathers(apikey, city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${encodeURIComponent(city)}&days=3`;
  const respo = await fetch(url);
  if (!respo.ok) {
    throw new Error("NOT FOUND");
  }
  return respo.json();
}

export const getLastFive = async () => {
  let array = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
  let unique = [...new Set(array)];
  let lastFive = unique.slice(-5);

  console.log(lastFive)
  let arrayOfObjects = [];

  for (const city of lastFive) {
    try {
      const data = await getFiveWeathers(apiKey, city);
      arrayOfObjects.push(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  getrenderRecent(arrayOfObjects)
}