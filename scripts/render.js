import { getdayName } from "./recentSearch.js";

// Current weather + forecast rendering
export const render = (data) => {
  const { name, localtime } = data.location;
  const { temp_c, humidity, wind_kph } = data.current;
  const { icon } = data.current.condition;

  let heading = document.querySelector("#temp");
  let loc = document.querySelector("#location");
  let date = document.querySelector("#date");
  let mainIcon = document.querySelector(".iconDiv img");
  let humid = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  let day = getdayName(localtime);

  heading.textContent = `${temp_c}°C`;
  loc.textContent = name;
  date.textContent = day;
  mainIcon.src = icon;
  humid.textContent = humidity;
  wind.textContent = wind_kph;

  let arr = data.forecast.forecastday;
  let nextdays = document.querySelector("#UpcomingDays");
  nextdays.innerHTML = getRender(arr);
};

export const getRender = (arr) => {
  return arr
    .map((e) => {
      let day2 = getdayName(e.date);
      return `
                <div class="daysCard">
                    <h3>${day2}</h3>
                    <img src="${e.day.condition.icon}" alt="weather image">
                    <h2>${e.day.avgtemp_c}°C</h2>
                </div>
            `;
    })
    .join("");
};

export const getrenderRecent = (arr) => {
  let container = document.querySelector("#Last5Searches");

  if (Array.isArray(arr) && arr.length > 0) {
    container.innerHTML = arr
      .map((e) => {
        return `
                    <div class="lastSearchCards">
                        <h3>${e.location.name}</h3>
                        <img src="${e.current.condition.icon}" alt="weather image">
                        <h2>${e.current.temp_c}°C</h2>
                    </div>
                `;
      })
      .join("");
  } else {
    container.innerHTML = "";
  }
};