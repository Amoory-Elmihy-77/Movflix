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

// dom elements
const header = document.querySelector('header');
const related = document.querySelector('.related .imgs');


// fetch api
fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`).then(response => response.json()).then(data => {
    // console.log(data);
    let data_poster = data.backdrop_path;
    let title = data.title;
    let overview = data.overview;
    let type1 = data.genres[0].name;
    let type2 = data.genres[1].name;
    document.querySelector('.details header .title').innerHTML = title;
    document.querySelector('.details header .type1').innerHTML = type1;
    document.querySelector('.details header .type2').innerHTML = type2;
    document.querySelector('.details header .overview').innerHTML = overview;
    document.getElementById('trail').addEventListener("click", () => {
        showTrail(movieId, api_key)
    });
    document.getElementById('play').href = `../../watch.html?id=${movieId}`;
    let img = `${base_url}${backdrop_size}${data_poster}`;
    header.style.backgroundImage = `url(${img})`;
    }).catch(error => console.error('Error fetching the movie details:', error));

// fetch related results
const relatedRes = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}`;

get(relatedRes, (data) => {
    data.results.length = 8;
    related.innerHTML = '';
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        if (data_poster == null)
            return;
        related.innerHTML += `
        <a href="../../details.html?id=${element.id}">
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
        </a>
        `;
    });
});




