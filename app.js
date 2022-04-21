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

//Project's Functions

//GetMovies() - Function to initial movies according to the URL received
async function getMovies(url) {
	const res = await fetch(url),
		data = await res.json();
	showMovies(data.results);
}
getMovies(API_URL);

//showMovies() - Function to show the movies on the screen
function showMovies(movies) {
	main.innerHTML = '';
	movies.forEach(movie => {
		const { title, poster_path, vote_average, overview } = movie;
		// Create for each movie a division with her info
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');
		movieElement.innerHTML = ` 
        <img src="${IMG_PATH + poster_path}"
            alt="${title}">
        <div class="movie-info">
            <h2>${title}</h2>
            <span class="${getColorByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h4>Movie Overview</h4>
            ${overview}
        </div>
    `;
		// Append the movie element to the main
		main.appendChild(movieElement);
	});
}

// getColorByRate() - Function to get color by the movie's rate
function getColorByRate(rate) {
	if (rate >= 8) return 'recommended';
	else if (rate >= 5) return 'nice';
	else return 'likley';
}

//Project's Event Listeners
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
