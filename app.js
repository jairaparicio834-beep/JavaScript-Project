const API = '13fe0c11'
const input = document.querySelector('.nav__input');
function openSearch(){
    input.classList.toggle('show');
}

const movieInput = document.querySelector('.movie__input')
const movieIcon = document.querySelector('.movie__icon')
const movieTitleDisplay = document.querySelector('.movie__serch');
const movieList = document.querySelector('.movies__list')

function handleEnter(input, callback){
input.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
          callback(input.value)
    }
})
}

handleEnter(movieInput, displayData)
handleEnter(input, displayData)
async function fetchData(url){
const response = await fetch(url);
if (!response.ok){
    throw new Error(`Whoops something went wrong ${response.status}`)
}
const data = await response.json();
return data;
}

async function displayData(movie){
    movieList.innerHTML = ' <i class="fa-solid fa-spinner"></i>'
    try{
const data = await fetchData(`https://www.omdbapi.com/?s=${movie}&apikey=${API}`);
const firstSixMovies = data.Search.slice(0, 6);
const movies = firstSixMovies.map(movie => `
     <div class="movie">
 <figure class="movie__img__wrapper">
 <img src="${movie.Poster}"
        class="movie__img" alt="">
         <h3 class="movie__info__title">
         ${movie.Title}
         </h3>
         <div class="movie__info__list">
         <div class="movie__info">
        <i class="fa-solid fa-clock movie__info--icon"></i>
        <p class="info__para">136m</p>
        </div>
        <div class="movie__info">
         <i class="fa-solid fa-star movie__info--icon"></i>
        <p class="info__para">4.5</p>
         </div>
         <div class="movie__info">
         <i class="fa-solid fa-earth-americas movie__info--icon"></i>
         <p class="info__para">English</p>
         </div>
         </div>
         </figure>
         <h4 class="movie__title">
         ${movie.Title}
           </h4>
          </div>`).join('');
        movieList.innerHTML = movies;
         movieTitleDisplay.textContent = `"${movie}"`;
          movieTitleDisplay.style.display = 'block';
         movieInput.value = ''
    }
    catch{
    movieList.innerHTML = `Sorry no movies found for: ${movie}`;
    }
}

