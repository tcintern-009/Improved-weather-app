import { getApi } from "./api.js";
import { clearAll } from "./deletehistory.js";
import { getdayName } from "./recentSearch.js";
import { render, getRender, getrenderRecent } from "./render.js";
import { gettoogle } from "./toogle.js";

const apiKey = "c54d4c198f53450cb2062733262307";
const input = document.querySelector("header input");
let getitems = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
let lastSearched = Array.isArray(getitems) ? getitems : [];

let city = getitems[getitems.length - 1] ?? "Naushera";
getApi(apiKey, city, lastSearched);

// GET USER INPUT
input.addEventListener("keydown", async (e) => {
    if (e.key == "Enter") {
        city = e.target.value;
        lastSearched = (await getApi(apiKey, city, lastSearched)) ?? lastSearched;
    }
});

// GET LAST SEARCHED
async function get() {
    lastSearched = await getApi(apiKey, city, lastSearched);
}
get();

// RENDER CODE — render function moved to render.js to break circular dependency

// TOGGLE CODE
let toogleBtn = document.querySelector("#toogle-btn");
toogleBtn.addEventListener("click", () => {
    gettoogle();
});

let lastSearchedContainer = document.querySelector("#lastSearchedList");

lastSearchedContainer.addEventListener("click", (e) => {
    let item = e.target.closest(".lastSearchedItem");
    if (item) {
        let value = item.textContent;
        getApi(apiKey, value, lastSearched);
    }
});

let clear = document.querySelector(".clear-all");

clear.addEventListener("click", () => {
    clearAll();
});