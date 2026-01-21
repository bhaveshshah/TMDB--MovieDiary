console.log("Main JS file loaded successfully.");

//Code for the movie blocks will go here
///First block: popular movies

const popularMovieContainer = document.getElementById('popular-movies-card-container');

////Function to fetch the popular movies popularity rate

async function fetchPopularMovies() {
    try {
        const res = await fetch (`https://api.themoviedb.org/3/movie/popular?api_key=cc509547e8cb8d5e318b618432577237`);
        const movie = await res.json();
        return movie.results;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}
////function to create the movie card

function createPopularMovieCard (movie){
    const popularMovieCard = document.createElement("div");
    popularMovieCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4');
    
    const popularMovieImage = document.createElement('img');
    popularMovieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    popularMovieImage.alt = movie.title;
    popularMovieImage.classList.add("mb-2");
    
    const popularMovieName = document.createElement("h3");
    popularMovieName.textContent = movie.title;
    popularMovieName.classList.add('text-xl', 'font-bold')

    const popularMovieInfo = document.createElement("p");
    popularMovieInfo.textContent = `Popularity rate: ${movie.popularity}, Synopsis: ${movie.overview}`;
    popularMovieInfo.classList.add('text-gray-600');

    popularMovieCard.appendChild(popularMovieImage);
    popularMovieCard.appendChild(popularMovieName);
    popularMovieCard.appendChild(popularMovieInfo);
    popularMovieContainer.appendChild(popularMovieCard);
    };

////function to display the movies

async function displayPopularMovies() {
    const popularMovies = await fetchPopularMovies();
    if (!popularMovies) return;
    popularMovies.forEach(popularMovie => {
        createPopularMovieCard(popularMovie);
    });
};

displayPopularMovies();    

///Second block: latest movies

const latestMovieContainer = document.getElementById('latest-release-card-container');

////Function to fetch the latest movies

async function fetchLatestMovies() {
    try {
        const res = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=cc509547e8cb8d5e318b618432577237&include_video=false&primary_release_date.gte=2025-10-01&primary_release_date.lte=2026-01-20`);
        const latestMovie = await res.json();
        return latestMovie.results;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}
////function to create the movie card

function createLatestMovieCard (movie){
    const latestMovieCard = document.createElement("div");
    latestMovieCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4');
    
    const latestMovieImage = document.createElement('img');
    latestMovieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    latestMovieImage.alt = movie.title;
    latestMovieImage.classList.add("mb-2");
    
    const latestMovieName = document.createElement("h3");
    latestMovieName.textContent = movie.title;
    latestMovieName.classList.add('text-xl', 'font-bold')

    const latestMovieInfo = document.createElement("p");
    latestMovieInfo.textContent = `Release date: ${movie.release_date}, Synopsis: ${movie.overview}`;
    latestMovieInfo.classList.add('text-gray-600');

    latestMovieCard.appendChild(latestMovieImage);
    latestMovieCard.appendChild(latestMovieName);
    latestMovieCard.appendChild(latestMovieInfo);
    latestMovieContainer.appendChild(latestMovieCard);
    };

////function to display the movies

async function displayLatestMovies() {
    const latestMovies = await fetchLatestMovies();
    if (!latestMovies) return;
    latestMovies.forEach(latestMovie => {
        createLatestMovieCard(latestMovie);
    });
};

displayLatestMovies();    

///Third block: all movies

const allMovieContainer = document.getElementById('browse-all-card-container');

////Function to fetch all movies

async function fetchAllMovies() {
    try {
        const res = await fetch (`https://api.themoviedb.org/3/trending/all/day?api_key=cc509547e8cb8d5e318b618432577237`);
        const allMovies = await res.json();
        return allMovies.results;
        
    } catch (error) {
        console.error('Error fetching movie data: ', error)
    }
};
////Function to create the cards

function createAllMovieCard (movie){
    const allMovieCard = document.createElement("div");
    allMovieCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4');
    
    const allMovieImage = document.createElement('img');
    allMovieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    latestMovieImage.alt = movie.title;
    allMovieImage.classList.add("mb-2");
    
    const allMovieCardMovieName = document.createElement("h3");
    allMovieCardMovieName.textContent = movie.title;
    allMovieCardMovieName.classList.add('text-xl', 'font-bold')

    const allMovieCardMovieInfo = document.createElement("p");
    allMovieCardMovieInfo.textContent = `Release date: ${movie.release_date}, Synopsis: ${movie.overview}`;
    allMovieCardMovieInfo.classList.add('text-gray-600');

    allMovieCard.appendChild(allMovieImage);
    allMovieCard.appendChild(allMovieCardMovieName);
    allMovieCard.appendChild(allMovieCardMovieInfo);
    allMovieContainer.appendChild(allMovieCard);
    };

////Function to display the cards


