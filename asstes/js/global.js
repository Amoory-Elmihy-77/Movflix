function showTrail(eid, api_key) {
    fetch(`https://api.themoviedb.org/3/movie/${eid}/videos?api_key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            const trailers = data.results;
            const trailersContainer = document.getElementById('trailers');
            const trailerDiv = document.createElement('div');
            trailerDiv.className = 'trail-container';
            const closeTrail = document.querySelector('#trailers .close i');
            trailersContainer.style.display = 'flex';
            // trailerDiv.innerHTML = '';
            trailers.forEach(trailer => {
                if (trailer.type === "Trailer" && trailer.site === "YouTube") {
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;

                    trailerDiv.appendChild(iframe);
                    trailersContainer.appendChild(trailerDiv);
                }
            });
            closeTrail.addEventListener("click", () => {
                trailersContainer.style.display = 'none';
                trailersContainer.removeChild(trailerDiv);
            })
        })
        .catch(error => console.error('Error fetching the trailers:', error));
}

function handleSearch() {
    const searchIcon = document.querySelector('#search .open');
    const searchInput = document.querySelector('#search input');
    const searchClose = document.querySelector('#search .close');
    const res = document.querySelector('#search #res');
    searchIcon.addEventListener("click", () => {
        searchIcon.style.display = 'none';
        searchClose.style.display = 'block';
        searchInput.style.display = 'block';
        searchInput.style.opacity = '1';
        res.style.display = 'block';
        searchInput.focus();
    });
    searchClose.addEventListener("click", () => {
        searchIcon.style.display = 'block';
        searchClose.style.display = 'none';
        searchInput.style.opacity = '0';
        searchInput.style.display = 'none';
        res.style.display = 'none';
    });
    const apiKey = "5002bf39d9190c90e9ee56559ae00842";
    searchInput.addEventListener("input", ()=>{
        const name = searchInput.value;
        if (name) {
            res.style.padding = '10px';
        } else {
            res.style.padding = '0';
        }
        fetchSearchResults(name);
    });
    function fetchSearchResults(name) {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(name)}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.results.length = 6;
                displaySearchResults(data.results);
            })
            .catch((error) =>
                console.error("Error fetching search results:", error)
        );
        function displaySearchResults(results) {
            // console.log(results);
            res.innerHTML = ''
            results.forEach((ele) => {
                let title = ele.title || ele.name;
                const posterPath = ele.poster_path || ele.profile_path;
                if (!posterPath) {
                    return;
                }
                const releaseDate = ele.release_date || ele.first_air_date || "N/A";
                res.innerHTML += `
                    <a href="/Movflix/details.html?id=${ele.id}">
                      <img src="https://image.tmdb.org/t/p/w500${posterPath}" />
                      <div class="info">
                        <div class="name">${title}</div>
                        <div class="date">${releaseDate}</div>
                      </div>
                    </a>
                `;
            });
        }
    }
}

export { showTrail, handleSearch };
