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

//Code for the movie blocks will go here

const popularMovieContainer = document.getElementById('popular-movies-card-container');
const latestMovieContainer = document.getElementById('latest-release-card-container');
const allMovieContainer = document.getElementById('all-movies-card-container');


////Function to fetch the movies

async function fetchMovies(url) {
    try {
        const res = await fetch (url);
        const movie = await res.json();
        return movie.results;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

////function to create the movie card

function createMovieCard (movie, container, info){
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

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = movie.title;
    movieImage.classList.add("mb-2");
    
    const movieName = document.createElement("h3");
    movieName.textContent = movie.title || movie.name || 'undefined';
    movieName.classList.add('text-xl', 'font-bold')

    const movieInfo = document.createElement("p");
    movieInfo.textContent = info(movie);
    movieInfo.classList.add('text-gray-600', 'text-sm', 'line-clamp-3');

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieName);
    movieCard.appendChild(movieInfo);
    movieCard.appendChild(favButton);
    container.appendChild(movieCard);
    };

////function to display the movies

async function displayMovies({url, container, infoText}) {
    const movies = await fetchMovies(url);
    if (!movies) return;

    movies.forEach(movie => {
        createMovieCard(movie, container, infoText);
    });
};

// Display the movies blocks

displayMovies({
    url: `https://api.themoviedb.org/3/movie/popular?api_key=cc509547e8cb8d5e318b618432577237`,
    container: document.getElementById('popular-movies-card-container'),
    infoText: movie =>
        `Popularity rate: ${movie.popularity}, Synopsis: ${movie.overview}`
});

displayMovies({
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=cc509547e8cb8d5e318b618432577237&include_video=false&primary_release_date.gte=2025-10-01&primary_release_date.lte=2026-01-20',
    container: document.getElementById('latest-release-card-container'),
    infoText: movie =>
        `Release date: ${movie.release_date}, Synopsis: ${movie.overview}`
});

displayMovies({
    url: 'https://api.themoviedb.org/3/trending/all/week?api_key=cc509547e8cb8d5e318b618432577237',
    container: document.getElementById('all-movies-card-container'),
    infoText: movie =>
        `Release date: ${movie.release_date}, Synopsis: ${movie.overview}`
});

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