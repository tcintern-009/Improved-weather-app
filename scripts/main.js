import { getApi } from "./api.js";
import { clearAll } from "./deletehistory.js";
import { gettoogle } from "./toogle.js";
import { debounce } from "./debounce.js";
import {
    showSuggestions,
    hideSuggestions,
    handleKeyboardNavigation,
    initSuggestionClicks,
} from "./suggestions.js";

const input = document.querySelector("header input");
const errorEl = document.querySelector(".error");
let getitems = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
let lastSearched = Array.isArray(getitems) ? getitems : [];

// Load default city on startup
let city = getitems[getitems.length - 1] ?? "Naushera";
getApi(city, lastSearched);

// ── Search on Enter ──────────────────────────────────────────
input.addEventListener("keydown", async (e) => {
    // Let suggestions.js handle navigation keys first
    const selectedCity = handleKeyboardNavigation(e);
    if (selectedCity) {
        input.value = "";
        lastSearched = (await getApi(selectedCity, lastSearched)) ?? lastSearched;
        hideSuggestions();
        return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
        const value = e.target.value.trim();
        if (!value) return;
        lastSearched = (await getApi(value, lastSearched)) ?? lastSearched;
        input.value = "";
        hideSuggestions();
    }
});

// ── Search-as-you-type with debounce ─────────────────────────
const debouncedSearch = debounce(async (query) => {
    if (!query || query.length < 2) {
        errorEl.textContent = "";
        return;
    }
    lastSearched = (await getApi(query, lastSearched)) ?? lastSearched;
}, 500);

const debouncedSuggestions = debounce((query) => {
    showSuggestions(query);
}, 200);

input.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (value.length >= 2) {
        debouncedSuggestions(value);
        debouncedSearch(value);
    } else {
        errorEl.textContent = "";
        hideSuggestions();
    }
});

// ── Click on suggestion item ─────────────────────────────────
initSuggestionClicks(async (city) => {
    input.value = "";
    lastSearched = (await getApi(city, lastSearched)) ?? lastSearched;
});

// ── Click on recent search item ──────────────────────────────
const lastSearchedContainer = document.querySelector("#lastSearchedList");
lastSearchedContainer.addEventListener("click", (e) => {
    const item = e.target.closest(".lastSearchedItem");
    if (item) {
        const value = item.textContent.trim();
        getApi(value, lastSearched);
    }
});

// ── Clear all history ────────────────────────────────────────
const clear = document.querySelector(".clear-all");
clear.addEventListener("click", () => {
    clearAll();
});

// ── Theme toggle ─────────────────────────────────────────────
const toogleBtn = document.querySelector("#toogle-btn");
toogleBtn.addEventListener("click", () => {
    gettoogle();
});