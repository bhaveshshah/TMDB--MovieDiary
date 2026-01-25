import {
  getAllMovies,
  getPopularOrLatestMovies,
  searchMovies,
} from "./src/script/api.js";
import { createMovieCard } from "./src/script/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("search-textbox")
    .addEventListener("input", (event) => {
      const query = event.target.value;
      searchMovies(query).then((result) => {
        console.log(result);
      });
    });

  getPopularOrLatestMovies("popular").then((movies) => {
    if (!movies) return;

    movies.results.forEach((movie) => {
      createMovieCard(movie, "popular-movies-card-container");
    });
  });

  getPopularOrLatestMovies("now_playing").then((movies) => {
    if (!movies) return;

    movies.results.forEach((movie) => {
      createMovieCard(movie, "latest-release-card-container");
    });
  });

  getAllMovies(2026).then((movies) => {
    if (!movies) return;

    movies.results.forEach((movie) => {
      createMovieCard(movie, "all-movies-card-container");
    });
  });
});

/// Function for the slider arrows

document.querySelectorAll("section").forEach((section) => {
  const container = section.querySelector(".overflow-x-auto");
  const prevBtn = section.querySelector(".prev-btn");
  const nextBtn = section.querySelector(".next-btn");

  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = container.clientWidth * 0.8;

  nextBtn.addEventListener("click", () => {
    container.scrollLeft += scrollAmount;
  });

  prevBtn.addEventListener("click", () => {
    container.scrollLeft -= scrollAmount;
  });
});
