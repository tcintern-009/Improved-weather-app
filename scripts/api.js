import { render } from "./render.js";
import { getLastFive, getRecentSearched } from "./recentSearch.js";


export async function getApi(apiKey, city) {
    let getitems = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
    let lastSearched = Array.isArray(getitems) ? getitems : [];
    let err = document.querySelector(".error");
    let mainWeather = document.querySelector(".weather-main");
    let cards = document.querySelector("#UpcomingDays");
    if (mainWeather) mainWeather.classList.add("loading");
    if (cards) cards.classList.add("loading");

    err.textContent = "";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Invalid City Name:(`)
        }
        let data = await response.json();
        lastSearched = [...lastSearched, data.location.name];
        localStorage.setItem("lastSearched", JSON.stringify(lastSearched))
        getLastFive();
        getRecentSearched(lastSearched);
        render(data);
    } catch (error) {
        console.log(error.message)
        err.textContent = error.message;


    } finally {
        if (mainWeather) mainWeather.classList.remove("loading");
        if (cards) cards.classList.remove("loading");
    }

}