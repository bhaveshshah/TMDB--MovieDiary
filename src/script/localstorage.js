const FAVOURITE_KEY = 'favourite';


function isFavourite(key) {
    const favouriteMovies = new Set(getData(FAVOURITE_KEY));

    return favouriteMovies.has(key);
}

export function toggleFavoriteMovie(id) {
    const favouriteMovies = new Set(getData(FAVOURITE_KEY));

    if(favouriteMovies.has(id)) {
        favouriteMovies.delete(id);
    } else {
        favouriteMovies.add(id);
    }

    setData(FAVOURITE_KEY, favouriteMovies);
}

function getFavouriteMovies(key) {
    return getData(FAVOURITE_KEY);
}


function setData(data) {
    try {
        localStorage.setItem(FAVOURITE_KEY, JSON.stringify(data));
    } catch (error) {
        console.log(`Error storing the data in the localstorage: ${error}`);
    }
}

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.log(`Error getting the data from the localstorage: ${error}`);
    }
}
