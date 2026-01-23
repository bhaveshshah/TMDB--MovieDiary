const FAVOURITE_KEY = 'favourite';

function getData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(`Error getting the data from localStorage: ${error}`);
        return [];
    }
}

function setData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log(`Error storing the data in localStorage: ${error}`);
    }
}

export function toggleFavoriteMovie(id) {
    const favouriteMovies = new Set(getData(FAVOURITE_KEY)); // convert array -> set

    if (favouriteMovies.has(id)) {
        favouriteMovies.delete(id);
    } else {
        favouriteMovies.add(id);
    }

    setData(FAVOURITE_KEY, Array.from(favouriteMovies)); // convert set -> array
}

export function isFavourite(id) {
    const favouriteMovies = new Set(getData(FAVOURITE_KEY));
    return favouriteMovies.has(id);
}

export function getFavouriteMovies() {
    return getData(FAVOURITE_KEY); // returns array of favourite IDs
}