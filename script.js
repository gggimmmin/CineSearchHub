//TMDB

const API_KEY = '32c6e1d64313d065f73b92b9b538bbc5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;

// 페이지가 로드될 때 API를 호출하고 데이터를 표시
document.addEventListener('DOMContentLoaded', () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error fetching data:', error));
});

// 영화 목록을 받아와서 HTML에 표시하는 함수
function displayMovies(movies) {
    const movieListContainer = document.getElementById('movieList');

    movies.forEach(movie => {
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        moviePoster.alt = movie.title;

        const movieVoteAverage = document.createElement('p');
        movieVoteAverage.textContent = `Vote Average: ${movie.vote_average}`;

        const movieItem = document.createElement('div');
        movieItem.appendChild(movieTitle);
        movieItem.appendChild(movieOverview);
        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieVoteAverage);
        movieListContainer.appendChild(movieItem);
    });
}
