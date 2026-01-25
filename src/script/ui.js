import { isFavourite, toggleFavoriteMovie } from "./localstorage.js";

function renderFavState(button, movieId) {
    if (isFavourite(movieId)) {
        button.classList.add('text-red-500');
        button.innerHTML = '❤️';
    } else {
        button.classList.remove('text-red-500');
        button.innerHTML = '♡';
    }
}

/**
 * function to create the movie card
 */
export function createMovieCard(movie, containerId) {
    const movieCard = document.createElement("div");
    movieCard.classList.add(
        'bg-white',
        'rounded-lg',
        'shadow-md',
        'p-4',
        'min-w-[200px]',
        'w-[200px]',
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

    renderFavState(favButton, movie.id);

    // Add click event to toggle favorite
    favButton.addEventListener('click', () => {
        toggleFavoriteMovie(movie);

        document
            .querySelectorAll(`.fav-btn[data-movie-id="${movie.id}"]`)
            .forEach(btn => renderFavState(btn, movie.id));
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