# Weather App

A modern, responsive weather application built with vanilla JavaScript that fetches real-time weather data and a 3-day forecast from a public API. Built as part of an internship task focused on asynchronous JavaScript, API integration, and modular code architecture.

## Live Features

- **Search** current weather by city name
- **Display** current temperature, condition, humidity, and wind speed
- **3-day forecast** with daily weather icons
- **Graceful error handling** for invalid city names
- **Recently searched city tracking** (persisted via `localStorage`)
- **Recent city cards** showing quick weather snapshots of your last 5 searches
- **Dark / light mode toggle** with smooth transitions
- **Glassmorphism UI** with animated gradient backgrounds and hover effects

## Tech Stack

- **HTML5** — semantic page structure
- **CSS3** — responsive layout, glassmorphism design, CSS custom properties, flexbox
- **JavaScript (ES6+)** — application logic, using native ES Modules
- **[WeatherAPI.com](https://www.weatherapi.com/)** — weather data provider

No frameworks or build tools are used. This project intentionally sticks to vanilla JS to reinforce core browser APIs and language fundamentals.

## Project Structure

```
Weather-App/
├── index.html              # entry point with glassmorphism card layout
├── style.css               # full design system: themes, animations, responsive
├── scripts/
│   ├── main.js             # entry point: DOM references, event listeners, render orchestration
│   ├── api.js              # fetch logic, error handling, API communication
│   ├── render.js           # forecast card rendering (pure rendering function)
│   ├── recentSearch.js     # last-searched city tracking + shared date utility
│   ├── toogle.js           # dark/light mode toggle logic
│   └── deletehistory.js    # clear all search history
└── README.md
```

### Why it's split this way

Each file has a single, focused responsibility — a pattern known as **separation of concerns**:

| File               | Responsibility                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| `main.js`          | Wires up the DOM, owns application state (`city`, `lastSearched`), delegates work to the other modules |
| `api.js`           | Talks to the network. Knows nothing about the DOM.                                                     |
| `render.js`        | Turns forecast data into HTML. A pure function — same input always produces the same output.           |
| `recentSearch.js`  | Small shared utilities (date formatting) and recent-search display logic                               |
| `toogle.js`        | Isolated UI behavior for theme switching                                                               |
| `deletehistory.js` | Clears localStorage and resets recent search state                                                     |

Splitting logic this way makes each piece independently readable, testable, and easier to debug — a change to how dates are formatted, for example, only requires touching one file.

## UI / Design Highlights

- **Glassmorphism card** — frosted glass effect with `backdrop-filter: blur()` and semi-transparent borders
- **Animated gradient background** — deep teal-to-cyan gradient that shifts smoothly on theme change
- **Light / Dark theme** — toggles via a CSS custom property system on `body.light-theme`
- **Temperature gradient text** — the current temperature uses a `linear-gradient` text fill for a vibrant look
- **Hover animations** — weather icon rotates and scales, cards lift with shadow, theme toggle spins
- **Custom scrollbar** — thin accent-colored scrollbar for forecast and recent cards rows
- **Fully responsive** — adapts from desktop down to small mobile screens

## Core Concepts Applied

### Fetch API + Async/Await

All network requests use the native `fetch()` API wrapped in `async` functions, allowing asynchronous network calls to be written in a readable, top-to-bottom style rather than nested callbacks.

```js
async function getApi(apiKey, city, lastSearched) {
  const response = await fetch(url);
  const data = await response.json();
  ...
}
```

### Error Handling

`fetch()` only rejects on network-level failures — it does **not** reject on HTTP error responses like a 404 for an invalid city. This is handled explicitly:

```js
if (!response.ok) {
  throw new Error("Invalid City Name :(");
}
```

All request logic is wrapped in `try...catch` to surface errors to the user through the UI rather than failing silently.

### ES Modules

The project uses native browser `import` / `export` syntax rather than a bundler. Each file explicitly declares what it exposes (`export`) and what it depends on (`import`), making dependencies between files explicit and traceable.

```js
// scripts/api.js
export async function getApi(...) { ... }

// scripts/main.js
import { getApi } from "./api.js";
```

### State Passed Explicitly

Rather than relying on shared global variables across modules, state (such as `lastSearched`) is passed into functions as parameters and returned back to the caller, keeping data flow explicit and predictable:

```js
lastSearched = (await getApi(apiKey, city, lastSearched)) ?? lastSearched;
```

### Persisted State with `localStorage`

The list of recently searched cities is saved as JSON and rehydrated on page load, so search history survives a page refresh:

```js
localStorage.setItem("lastSearched", JSON.stringify(lastSearched));
JSON.parse(localStorage.getItem("lastSearched")) ?? [];
```

## Getting Started

### Prerequisites

- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)
- A local development server (native ES Modules do not run over `file://` URLs)

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Add your API key in `scripts/api.js`

   ```js
   const apiKey = "YOUR_API_KEY_HERE";
   ```

   Make sure `index.html` loads the entry point from the `scripts/` folder:

   ```html
   <script type="module" src="scripts/main.js"></script>
   ```

3. Serve the project locally (e.g. VS Code "Live Server" extension, or):

   ```bash
   npx serve .
   ```

4. Open the served URL in your browser.

## Known Limitations / Future Improvements

- API key is currently stored client-side in plain text — acceptable for a learning project, but not production-safe. A production version would proxy requests through a backend to keep the key private.
- Forecast length is limited by the free API tier (currently 3 days).
- No automated tests yet.

## Author

Built as part of an internship async JavaScript & APIs challenge.
