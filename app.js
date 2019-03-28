// Main DOM elements
const container = document.querySelector('.container');
const movieForm = document.getElementById('movie-form');
const movieTableBody = document.getElementById('movie-table-body');
const movieTableClearBtn = document.getElementById('movie-table-clear');

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
    // Method for displaying the movie on the list
    addMovieUI(movieData){

        const tableRow=document.createElement('tr');
        tableRow.id = 'table-row';
        tableRow.innerHTML = `
            <td>${movieData.name}</td>
            <td>${movieData.category}</td>
            <td>${movieData.year}</td>
            <td>${movieData.director}</td>
            <td><a class="delete-btn" href="#">Delete</a></td>
        `;
        movieTableBody.appendChild(tableRow);
    }

    // Method for clearing the input after submitting a form
    clearInput(){
        document.getElementById('movie-name').value='';
        document.getElementById('movie-category').value='';
        document.getElementById('movie-year').value='';
        document.getElementById('movie-director').value='';
    }

    // Method for displaying validation messages for each type of data-rule
    validationFail(e){
        let element, validity;
        
        element = e.target;
        validity = element.validity;
        
        let ruleNames = [];
        let forEach = Array.prototype.forEach;
        // Storing the rule names inside an array
        const ruleElements = document.querySelectorAll('span[data-rule]');
        
        forEach.call(ruleElements, function(element){
            let ruleName = element.getAttribute('data-rule');
            
            if(ruleNames.indexOf(ruleName) < 0){
                ruleNames.push(ruleName);
            }
            });

        if(!validity.valid){
            ruleNames.forEach(function(ruleName){
                if(validity[ruleName]){
                    let rule = element.parentNode.querySelector('[data-rule="' + ruleName + '"]');
                    rule.classList.remove('hide');
                }
            })
        }
        
        e.preventDefault();
    }

    // Method for validating the input and hiding the validation messages
    validate(){
        let validationMessages = document.querySelectorAll('form div span');

        validationMessages.forEach(function(validationMessage){
            validationMessage.classList.add('hide');
        });
        movieForm.checkValidity();
    }

    // Method for deleting the movie from the list at UI level
    deleteMovie(e){

        const element = e.target;
        if(element.classList.contains('delete-btn')){
            element.parentNode.parentNode.classList.add('hide');
        }
        e.preventDefault();
    }

    // Method for clearing the movie list at UI level
    clearList(){
        while(movieTableBody.firstChild){
            movieTableBody.removeChild(movieTableBody.firstChild);
        }
    }
}

class Store{
    // Static method for fetching the movies from localStorage
    static getMovies(){
        let movies;

        if(localStorage.getItem('movies') === null){
            movies = [];
        } else{
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    // Static method for displaying the movie list based on the movies fetched from localStorage
    static displayMovies(){
        const movies = Store.getMovies();

        const ui = new UI();

        movies.forEach(function(movie){
            ui.addMovieUI(movie);
        });
    }

    // Static method for adding a movie to the localStorage key 'movies'
    static addMoviesLS(movie){
        const movies = Store.getMovies();

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));
    }

    // Static method for deleting a movie from the localStorage
    static deleteMovieLS(name){
        const movies = Store.getMovies();

        movies.forEach(function(movie, index){
            if(movie.name === name){
                movies.splice(index, 1);
            }
        })

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

// Assigning the UI class to a constant
const ui = new UI();

// Event Listeners
document.addEventListener('DOMContentLoaded', validation);
document.addEventListener('DOMContentLoaded', Store.displayMovies);
movieForm.addEventListener('submit', addMovie);
movieTableBody.addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteMovie(e);

    Store.deleteMovieLS(e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    e.preventDefault();
});
movieTableClearBtn.addEventListener('click', function(){
    ui.clearList();
    localStorage.clear();
})

// Function for adding movies to the list
function addMovie(e){
    
    // Assigning the values of the input fields to a constant
    const name = document.getElementById('movie-name').value;
    const category = document.getElementById('movie-category').value;
    const year = document.getElementById('movie-year').value;
    const director = document.getElementById('movie-director').value;
    
    // Assigning the Movie class to a constant
    const movieData = new Movie(name, category, year, director);
    
    // Adding the movie to the list
    ui.addMovieUI(movieData);

    // Storing the information about the movie(name, category, year, director)
    // to the localStorage
    Store.addMoviesLS(movieData);

    // Clearing the input fields
    ui.clearInput();

    e.preventDefault();
}

//Function for displaying custom validation messages
function validation(){

    let inputElements = document.querySelectorAll('input:not(button)');
    inputElements.forEach(function(input){
        input.oninvalid = ui.validationFail;
        input.onblur = ui.validate;
    })
    
}