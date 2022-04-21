// Project's Variables

// API Variables
const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f214b16171fc56615485b80f1d188763&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?api_key=f214b16171fc56615485b80f1d188763&query="';

// DOM variables
const main = document.getElementsByTagName('main')[0];
const form = document.getElementsByTagName('form')[0];
const search = document.getElementById('search');

//Function to get initial movies
async function getMovies(url) {
	const res = await fetch(url),
		data = await res.json();
	showMovies(data.results);
}
//
getMovies(API_URL);

function showMovies(movies) {
	main.innerHTML = '';
	movies.forEach(movie => {
		const { title, poster_path, vote_average, overview } = movie;
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');
		movieElement.innerHTML = ` 
        <img src="${IMG_PATH + poster_path}"
            alt="${title}">
        <!-- Movie Info Division -->
        <div class="movie-info">
            <h2>${title}</h2>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <!-- Movie Overview Division -->
        <div class="overview">
            <h4>Movie Overview</h4>
            ${overview}
        </div>
    `;
		main.appendChild(movieElement);
	});
}

function getClassByRate(vote) {
	if (vote >= 8) return 'recommended';
	else if (vote >= 5) return 'nice';
	else return 'likley';
}

form.addEventListener('submit', e => {
	e.preventDefault();
	const searchTerm = search.value;
	if (searchTerm && searchTerm != '') {
		getMovies(SEARCH_API + searchTerm);
		search.value = '';
	} else {
		window.location.reload();
	}
});
