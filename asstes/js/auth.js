const options = {
method: 'GET',
headers: {
accept: 'application/json',
Authorization: 'BearereyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmMzMzA1NTkwNWViYWI1OTI4ZTZlOWJhN2JlZjU4MSIsIm5iZiI6MTcyMTg0NjY3OS41MjI5MzUsInN1YiI6IjY2YTE0YWM5NDA4NmU3OGU1MGNkZmIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8U8fUGWH4GK3mxZpT_m-CKIQ5r2f2fPb4-an8ZDa_sY'
}
}
async function get(endpoint,callback,optional = ""){
let res = await fetch(endpoint,options);
let data = await res.json();
callback(data,optional);
}
export {get};