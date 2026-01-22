import { getAllMovies, searchMovies } from "./src/script/api.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("search-textbox")
    .addEventListener("input", (event) => {
      const query = event.target.value;
      searchMovies(query).then((result) => {
        console.log(result);
      });
    });
});

console.log("Main JS file loaded successfully.");
