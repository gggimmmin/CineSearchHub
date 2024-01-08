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

// 영화 카드 구조 
function displayMovies(movies) {
    const movieListContainer = document.getElementById('movieList');

    movieListContainer.innerHTML = '';

    movies.forEach(movie => {
        // 카드 구조 생성
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-4', 'mb-3');

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card', 'h-100');

        const imgElement = document.createElement('img');
        imgElement.classList.add('card-img-top');
        imgElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        imgElement.alt = movie.title;

        const cardBodyContentDiv = document.createElement('div');
        cardBodyContentDiv.classList.add('card-body');

        const cardTitleElement = document.createElement('h5');
        cardTitleElement.classList.add('card-title');
        cardTitleElement.textContent = movie.title;

        const movieOverview = document.createElement('p');
        movieOverview.classList.add('card-text');
        movieOverview.textContent = movie.overview;

        const movieVoteAverage = document.createElement('p');
        movieVoteAverage.classList.add('card-text');
        // 반올림된 소수점 한 자리까지 표시
        const roundedVoteAverage = parseFloat(movie.vote_average).toFixed(1);
        movieVoteAverage.textContent = `Vote Average: ${roundedVoteAverage}`;
        // 숫자가 8보다 크면 텍스트 색상을 초록색으로 변경
        if (parseFloat(movie.vote_average) > 8) {
            movieVoteAverage.style.color = 'green';
        }


        // 구조에 요소 추가
        cardBodyContentDiv.appendChild(cardTitleElement);
        cardBodyContentDiv.appendChild(movieOverview);
        cardBodyContentDiv.appendChild(movieVoteAverage);

        cardBodyDiv.appendChild(imgElement);
        cardBodyDiv.appendChild(cardBodyContentDiv);

        cardDiv.appendChild(cardBodyDiv);

        // 카드를 컨테이너에 추가
        movieListContainer.appendChild(cardDiv);

        // 클릭 이벤트 리스너 추가
        cardDiv.addEventListener('click', function () {
            // 클릭한 영화의 ID를 얻어온 후 alert 창에 표시
            alert(`Clicked Movie ID: ${movie.id}`);
        });
    });
}


// 검색 기능을 위한 함수
function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();  // 검색어 공백 제거 및 소문자로 변환

    // 검색어가 비어 있는 경우
    if (searchTerm === '') {
        alert('영화 제목을 입력해주세요.');
        return;  // 검색어가 비어 있으면 더 이상 진행하지 않고 함수를 종료
    }

    // 검색어와 일치하는 영화만 필터링
    const filteredMovies = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
    );

    // 영화 목록 컨테이너를 비우고, 검색 결과만 표시
    const movieListContainer = document.getElementById('movieList');
    movieListContainer.innerHTML = '';

    if (filteredMovies.length > 0) {
        // 필터링된 영화 목록을 표시
        displayMovies(filteredMovies);
    } else {
        // 검색 결과가 없는 경우에 메시지를 표시
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = '검색 결과가 없습니다.';
        movieListContainer.appendChild(noResultsMessage);
    }
}


// 함수 호출 전에 비어 있는 배열을 전달하여 초기 상태로 설정
displayMovies([]);

// 테스트용 데이터
const moviesData = [
    {
        title: 'Movie 1',
        overview: 'Overview for Movie 1',
        poster_path: '/path-to-poster-1.jpg',
        vote_average: 7.5
    },
    {
        title: 'Movie 2',
        overview: 'Overview for Movie 2',
        poster_path: '/path-to-poster-2.jpg',
        vote_average: 8.2
    },
    // Add more movies as needed
];

// 함수 호출
displayMovies(moviesData);