import {get} from './auth.js';
const api_key = "5002bf39d9190c90e9ee56559ae00842";
const base_url = 'http://image.tmdb.org/t/p/';
let poster_size = 'w342', backdrop_size = 'w780';
const trend_endpoint = `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&language=en`;
const popular_movies = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en`;
const popular_series = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en`;
const top_related = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en`;
const top_tvShow = `https://api.themoviedb.org/3/tv/12345/recommendations?api_key=${api_key}&language=en`;
const upcoming_movies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en`;
const indexImgs = document.querySelectorAll('.index .imgs img');
const searchIcon = document.querySelector('#search .open');
const searchInput = document.querySelector('#search input');
const searchClose = document.querySelector('#search .close');
const header = document.querySelector('header');
const trending = document.querySelector('.trending .imgs');
const popMov = document.querySelector('.pop-movies .imgs');
const popSer = document.querySelector('.pop-series .imgs');
const topMov = document.querySelector('.top-movies .imgs');
const topShow = document.querySelector('.top-show .imgs');
const upcoming = document.querySelector('.upcoming .imgs');


get(popular_movies, (data) => {
    let data_poster = data.results[3].backdrop_path;
    let title = data.results[3].title;
    let overview = data.results[3].overview;
    document.querySelector('header .title').innerHTML = title;
    document.querySelector('header .overview').innerHTML = overview;
    let img = `${base_url}${backdrop_size}${data_poster}`;
    header.style.backgroundImage = `url(${img})`;
});



searchIcon.addEventListener("click", () => {
    searchIcon.style.display = 'none';
    searchClose.style.display = 'block';
    searchInput.style.display = 'block';
    searchInput.style.opacity = '1';
});
searchClose.addEventListener("click", () => {
    searchIcon.style.display = 'block';
    searchClose.style.display = 'none';
    searchInput.style.opacity = '0';
    searchInput.style.display = 'none';
});


get(trend_endpoint, (data) => {
    trending.innerHTML = '';
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        trending.innerHTML += `
        <a href="#details.com">
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
        </a>
        `;
    });
});
get(popular_movies, (data) => {
    popMov.innerHTML = '';
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        popMov.innerHTML += `
        <a href="#details.com">
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
        </a>
        `;
    });
});
get(popular_series, (data) => {
    popSer.innerHTML = '';
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        popSer.innerHTML += `
        <a href="#details.com">
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
        </a>
        `;
    });
});
get(top_related, (data) => {
    topMov.innerHTML = '';
    data.results.length = 5;
    let i = 1;
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        topMov.innerHTML += `
        <a href="#details.com">
            <span class="number">${i}</span>
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
            <p>${element.name}</p>
        </a>
        `;
        i++;
    });
});
get(top_tvShow, (data) => {
    topShow.innerHTML = '';
    data.results.length = 5;
    let i = 1;
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        topShow.innerHTML += `
        <a href="#details.com">
            <span class="number">${i}</span>
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
            <p>${element.name}</p>
        </a>
        `;
        i++;
    });
});

get(upcoming_movies, (data) => {
    upcoming.innerHTML = '';
    data.results.length = 4;
    data.results.forEach(element => {
        let data_poster = element.poster_path;
        let img = `${base_url}${backdrop_size}${data_poster}`;
        upcoming.innerHTML += `
        <a>
            <i class="fa-solid fa-play"></i>
            <img src="${img}" alt="" />
        </a>
        `;
    });
});