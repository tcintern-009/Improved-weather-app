import { getrenderRecent } from "./render.js";

const API_KEY = "c54d4c198f53450cb2062733262307";

export const getRecentSearched = (lastSearched) => {
  const container = document.querySelector("#lastSearchedList");
  if (!container) return;

  const unique = [...new Set(lastSearched)];
  const recent = unique.slice(-5);

  container.innerHTML = recent
    .map(
      (city) => `
      <h1 class="lastSearchedItem">${city}</h1>
    `
    )
    .join("");
};

// Fetch latest weather data for the last 5 searched cities and render cards
export const getLastFive = async () => {
  const array = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
  const unique = [...new Set(array)];
  const lastFive = unique.slice(-5);

  const results = [];

  for (const city of lastFive) {
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      results.push(data);
    } catch (error) {
      console.error(`Failed to fetch "${city}":`, error.message);
    }
  }

  getrenderRecent(results);
};