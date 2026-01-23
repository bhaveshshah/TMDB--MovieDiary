import { getAllMovies, getPopularOrLatestMovies, searchMovies } from "./src/script/api.js";
import { toggleFavoriteMovie, isFavourite } from "./src/script/localstorage.js";


document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("search-textbox")
        .addEventListener("input", (event) => {
            const query = event.target.value;
            searchMovies(query).then((result) => {
                console.log(result);
            });
        });

    getPopularOrLatestMovies('popular').then((movies) => {
        if (!movies) return;

        movies.results.forEach(movie => {
            createMovieCard(movie, 'popular-movies-card-container');
        });
    })

    getPopularOrLatestMovies('now_playing').then((movies) => {
        if (!movies) return;

        movies.results.forEach(movie => {
            createMovieCard(movie, 'latest-release-card-container');
        });
    });

    getAllMovies(2026).then((movies) => {
        if (!movies) return;

        movies.results.forEach(movie => {
            createMovieCard(movie, 'all-movies-card-container');
        });
    })

});

function updateFavButtons(movieId) {
    const fav = isFavourite(movieId);

    document.querySelectorAll(`.fav-btn[data-movie-id="${movieId}"]`)
        .forEach(btn => {
            if (fav) {
                btn.classList.add('text-red-500');
                btn.innerHTML = '❤️';
            } else {
                btn.classList.remove('text-red-500');
                btn.innerHTML = '♡';
            }
        });
}


/**
 * function to create the movie card
 */
function createMovieCard(movie, containerId) {
    const movieCard = document.createElement("div");
    movieCard.classList.add(
        'bg-white',
        'rounded-lg',
        'shadow-md',
        'p-4',
        'min-w-[200px]',
        'hover:scale-105',
        'transition-transform',
        'duration-300',
        'relative'
    );

    const favButton = document.createElement('button');
    favButton.innerHTML = '♡';
    favButton.classList.add(
        'absolute',
        'top-2',
        'right-2',
        'bg-black/60',
        'hover:bg-black/80',
        'text-white',
        'text-xl',
        'w-9',
        'h-9',
        'rounded-full',
        'flex',
        'items-center',
        'justify-center',
        'transition'
    );

    favButton.dataset.movieId = movie.id;
    favButton.classList.add('fav-btn');

    updateFavButtons(movie.id);

    // Add click event to toggle favorite
    favButton.addEventListener('click', () => {
        toggleFavoriteMovie(movie.id);
        updateFavButtons(movie.id);
    });

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = movie.title;
    movieImage.classList.add("mb-2");

    const movieName = document.createElement("h3");
    movieName.textContent = movie.title || movie.name || 'undefined';
    movieName.classList.add('text-xl', 'font-bold')

    const movieInfo = document.createElement("p");
    movieInfo.textContent = `Popularity rate: ${movie.popularity}, Synopsis: ${movie.overview}` // info(movie);
    movieInfo.classList.add('text-gray-500', 'text-sm', 'line-clamp-3');

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieName);
    movieCard.appendChild(movieInfo);
    movieCard.appendChild(favButton);
    document.getElementById(containerId).appendChild(movieCard);
}




/// Function for the slider arrows

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
