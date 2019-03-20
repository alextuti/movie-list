const container=document.querySelector('.container');
const movieForm=document.getElementById('movie-form');
const movieName=document.getElementById('movie-name');
const movieCategory=document.getElementById('movie-category');
const movieYear=document.getElementById('movie-year');
const movieDirector=document.getElementById('movie-director');


movieForm.addEventListener('submit', addMovie);

class Movie{
    constructor(movieName, movieCategory, movieYear, movieDirector){
        this.movieName = movieName.value;
        this.movieCategory = movieCategory.value;
        this.movieYear = movieYear.value;
        this.movieDirector = movieDirector.value;
    }
}

function addMovie(e){
    
    const movieNameOutput=document.createElement('p');
    movieNameOutput.textContent = movieData.movieName;
    const movieCategoryOutput=document.createElement('p');
    movieCategoryOutput.textContent = movieData.movieCategory;
    const movieYearOutput=document.createElement('p');
    movieYearOutput.textContent = movieData.movieYear;
    const movieDirectorOutput = document.createElement('p');
    movieDirectorOutput.textContent = movieData.movieDirector;

    container.appendChild(movieNameOutput);

    e.preventDefault();
}