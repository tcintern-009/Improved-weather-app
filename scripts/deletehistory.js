import { getLastFive, getRecentSearched } from "./recentSearch.js";

export const clearAll = () => {
    localStorage.removeItem("lastSearched");
    getRecentSearched([]);
    getLastFive();
};