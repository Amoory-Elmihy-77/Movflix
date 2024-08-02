import {get} from './auth.js';
const api_key = "5002bf39d9190c90e9ee56559ae00842";
const base_url = 'http://image.tmdb.org/t/p/';
let poster_size = 'w342', backdrop_size = 'w780';
const discover_endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en`;
const indexImgs = document.querySelectorAll('.index .imgs img');


get(discover_endpoint, (data) => {
    console.log(data.results);
    let d = data.results;
    for (let i = 0; i < indexImgs.length; i++){
        let posterPath = d[i].poster_path;
        indexImgs[i].src = `${base_url}${poster_size}${posterPath}`;
    }
})



// get(discover_endpoint, (data) => {
    //     console.log(data.results[3]);
    // });
