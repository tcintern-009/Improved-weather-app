/**
 * Search suggestions dropdown – shows city matches from search history
 * as the user types, with keyboard navigation support.
 */

const SUGGESTIONS_EL = document.querySelector("#suggestions");
const INPUT_EL = document.querySelector("#searchBar");

let activeIndex = -1;
let currentSuggestions = [];

/**
 * Show suggestions based on the query (matches against localStorage history).
 */
export function showSuggestions(query) {
    if (!query || query.length < 1) {
        hideSuggestions();
        return;
    }

    const history = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
    const unique = [...new Set(history)];
    const q = query.toLowerCase();

    currentSuggestions = unique.filter((city) =>
        city.toLowerCase().includes(q)
    );

    // Limit to top 5
    currentSuggestions = currentSuggestions.slice(0, 5);

    if (currentSuggestions.length === 0) {
        hideSuggestions();
        return;
    }

    renderSuggestions(currentSuggestions, q);
    SUGGESTIONS_EL.classList.add("visible");
    activeIndex = -1;
}

/**
 * Render suggestion items with highlighted matching text.
 */
function renderSuggestions(cities, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    SUGGESTIONS_EL.innerHTML = cities
        .map(
            (city) =>
                `<div class="suggestion-item" data-city="${city}">${city.replace(
                    regex,
                    '<span class="highlight">$1</span>'
                )}</div>`
        )
        .join("");
}

/**
 * Hide the suggestions dropdown.
 */
export function hideSuggestions() {
    SUGGESTIONS_EL.classList.remove("visible");
    SUGGESTIONS_EL.innerHTML = "";
    currentSuggestions = [];
    activeIndex = -1;
}

/**
 * Navigate suggestions with arrow keys and select with Enter.
 * Returns the selected city if Enter was pressed, otherwise null.
 */
export function handleKeyboardNavigation(e) {
    const items = SUGGESTIONS_EL.querySelectorAll(".suggestion-item");

    if (!SUGGESTIONS_EL.classList.contains("visible") || items.length === 0) {
        return null;
    }

    switch (e.key) {
        case "ArrowDown":
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
            updateActive(items);
            break;

        case "ArrowUp":
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, -1);
            updateActive(items);
            break;

        case "Enter":
            e.preventDefault();
            if (activeIndex >= 0 && items[activeIndex]) {
                const city = items[activeIndex].dataset.city;
                hideSuggestions();
                return city;
            }
            break;

        case "Escape":
            hideSuggestions();
            break;
    }

    return null;
}

function updateActive(items) {
    items.forEach((el, i) => {
        el.classList.toggle("active", i === activeIndex);
    });

    // Scroll into view if needed
    if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].scrollIntoView({ block: "nearest" });
    }
}

/**
 * Attach click listener to suggestions (delegation).
 */
export function initSuggestionClicks(onSelect) {
    SUGGESTIONS_EL.addEventListener("click", (e) => {
        const item = e.target.closest(".suggestion-item");
        if (item) {
            const city = item.dataset.city;
            hideSuggestions();
            onSelect(city);
        }
    });

    // Hide on click outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#suggestions") && !e.target.closest("#searchBar")) {
            hideSuggestions();
        }
    });
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}