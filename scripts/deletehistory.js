import { getLastFive, getRecentSearched } from "./recentSearch.js";



export const clearAll = () => {
    localStorage.clear();
    let updatedList = [];
    getRecentSearched(updatedList);
    getLastFive();
   

}