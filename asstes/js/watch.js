import {get} from './auth.js';
import { showTrail, handleSearch } from './global.js';
handleSearch();

// get id from url page
function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
const queryParams = getQueryParams();
const movieId = queryParams.id;

// global api vars
const api_key = "5002bf39d9190c90e9ee56559ae00842";
const base_url = 'http://image.tmdb.org/t/p/';
let poster_size = 'w342', backdrop_size = 'w780';
let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}`;


// dom elements
const watch = document.getElementById("watch");

// fetch api
get(url, (data) => {
    let allTr = data.results.filter(x => x.type == "Trailer");
    let key = allTr[0].key;
    let video = `https://www.youtube.com/embed/${key}`;
    let trialerVideo = document.createElement("iframe");
    trialerVideo.src = video;
    watch.appendChild(trialerVideo);
});