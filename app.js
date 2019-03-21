const container=document.querySelector('.container');
const movieForm=document.getElementById('movie-form');




movieForm.addEventListener('submit', addMovie);
// Movie class for handling input values
class Movie{
    constructor(name, category, year, director){
        this.name = name;
        this.category = category;
        this.year = year;
        this.director = director;
    }
}

// UI class for manipulating the DOM
class UI{
    addMovieUI(movieData){
        const movieTable=document.getElementById('movie-table-body');

        const tableRow=document.createElement('tr');
        tableRow.id = 'table-row';
        tableRow.innerHTML = `
            <td>${movieData.name}</td>
            <td>${movieData.category}</td>
            <td>${movieData.year}</td>
            <td>${movieData.director}</td>
            <td><a id="delete-btn" href="#">Delete</a>
        `;
        movieTable.appendChild(tableRow);
    }

    clearInput(){
        document.getElementById('movie-name').value='';
        document.getElementById('movie-category').value='';
        document.getElementById('movie-year').value='';
        document.getElementById('movie-director').value='';
    }
}

// Function for adding movies to the list
function addMovie(e){
    

    const name=document.getElementById('movie-name').value;
    const category=document.getElementById('movie-category').value;
    const year=document.getElementById('movie-year').value;
    const director=document.getElementById('movie-director').value;
    
    const movieData = new Movie(name, category, year, director);
    
    // Validation of the input
    

    const ui = new UI();
    ui.addMovieUI(movieData);
    ui.clearInput();
    e.preventDefault();
}