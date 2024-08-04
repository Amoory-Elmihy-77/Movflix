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

export { showTrail };