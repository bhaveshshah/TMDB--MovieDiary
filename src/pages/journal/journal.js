/// Function for the slider arrows
import { getData } from "../../script/localstorage.js";
import { getMovieById } from "../../script/api.js";
import { createMovieCard } from "../../script/ui.js";

document.addEventListener("DOMContentLoaded", async () => {
    const favoriteMoviesIds = getData('favourite');
    const favoriteMovies = await Promise.all(favoriteMoviesIds.map(movieId => getMovieById(movieId)));

    favoriteMovies.forEach(movie => {
        createMovieCard(movie, 'favorite-movies-card-container');
    });
});

document.querySelectorAll('section').forEach(section => {
    const container = section.querySelector('.overflow-x-auto');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    if (!container || !prevBtn || !nextBtn) return;

    const scrollAmount = container.clientWidth * 0.8;

    nextBtn.addEventListener('click', () => {
        container.scrollLeft += scrollAmount;
    });

    prevBtn.addEventListener('click', () => {
        container.scrollLeft -= scrollAmount;
    });
});