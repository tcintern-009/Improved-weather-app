# Weather App

A modern, responsive weather app built with vanilla JavaScript. Search any city and get current weather, humidity, wind speed, and a 3-day forecast — all with a sleek glassmorphism UI.

## Features

- **Search-as-you-type** — start typing and weather updates appear automatically (debounced to avoid too many API calls)
- **Smart suggestions dropdown** — see matching city names from your search history as you type, with keyboard navigation (Arrow keys + Enter)
- **Current weather** — temperature, condition icon, humidity, wind speed
- **3-day forecast** — daily weather cards for the next 3 days
- **Recent searches** — clickable city tags and weather snapshot cards for your last 5 searches (saved in localStorage)
- **Dark / Light mode toggle** — smooth theme switching
- **Loading & error states** — visual feedback while fetching, clear error messages for invalid cities

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — glassmorphism design, CSS custom properties, responsive layout, animations
- **JavaScript (ES6+)** — ES Modules, Fetch API, async/await
- **[WeatherAPI.com](https://www.weatherapi.com/)** — weather data provider

No frameworks or build tools — pure vanilla JS.

## Project Structure

```
Weather-App/
├── index.html                # Main HTML page
├── style.css                 # All styles, themes, animations, responsive breakpoints
├── scripts/
│   ├── main.js               # Entry point — event listeners, debounced search, orchestrates modules
│   ├── api.js                # Fetch logic, error handling, loading states
│   ├── render.js             # DOM rendering functions (current weather + forecast cards)
│   ├── recentSearch.js       # Recent search history & weather snapshot cards
│   ├── suggestions.js        # Search suggestions dropdown with keyboard navigation
│   ├── debounce.js           # Debounce utility to limit rapid function calls
│   ├── deletehistory.js      # Clear search history
│   └── toogle.js             # Dark/light theme toggle
└── README.md
```

## Getting Started

1. Clone the repo
2. Open **index.html** with a local server (ES Modules require a server — use VS Code Live Server, `npx serve .`, or similar)
3. Search for a city and see the weather!

> **Note:** The API key is already included in `scripts/api.js` for demo purposes. In production, you'd proxy requests through a backend to keep the key private.

## Key Concepts

- **Debouncing** — searches are delayed by 500ms after you stop typing, preventing an API call on every keystroke
- **Search-as-you-type** — suggestions appear after 200ms of inactivity, weather updates after 500ms
- **ES Modules** — clean import/export pattern with no circular dependencies
- **localStorage** — search history persists across page refreshes
