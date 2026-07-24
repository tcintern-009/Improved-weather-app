import { render } from "./render.js";
import { getLastFive, getRecentSearched } from "./recentSearch.js";

const API_KEY = "c54d4c198f53450cb2062733262307";

/**
 * Fetch weather data for a given city and render it.
 * @param {string} city - City name to search for
 * @param {string[]} [lastSearched] - Optional array of previously searched cities
 * @returns {Promise<string[]>} Updated lastSearched array
 */
export async function getApi(city, lastSearched = []) {
    const err = document.querySelector(".error");
    const mainWeather = document.querySelector(".weather-main");
    const cards = document.querySelector("#UpcomingDays");

    // Show loading state
    if (mainWeather) mainWeather.classList.add("loading");
    if (cards) cards.classList.add("loading");
    if (err) err.textContent = "";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status === 400 ? "City not found" : "Something went wrong");
        }

        const data = await response.json();
        const cityName = data.location.name;

        // Avoid duplicates: only add if not already the last searched city
        if (lastSearched[lastSearched.length - 1] !== cityName) {
            lastSearched = [...lastSearched, cityName];
        }

        localStorage.setItem("lastSearched", JSON.stringify(lastSearched));
        getLastFive();
        getRecentSearched(lastSearched);
        render(data);

        return lastSearched;
    } catch (error) {
        console.error(error.message);
        if (err) err.textContent = error.message;
        return lastSearched;
    } finally {
        if (mainWeather) mainWeather.classList.remove("loading");
        if (cards) cards.classList.remove("loading");
    }
}